$(function(){
	var breakLength = 5;
	var sessionLength = 5;
	var minutes, seconds;
	var $breakLengthLbl = $('#breakLengthLbl');
	var $sessionLengthLbl = $('#sessionLengthLbl');
	var $statusLbl = $('#textWrapper h3:nth-child(1)');
	var $remainLbl = $('#textWrapper h3:nth-child(2)');
	var $ballMask = $('#ballMask');
	var $ballKernel = $('#ballKernel');

	/*
	 * Define State and Sub-States
	 */
	var State = function() {}
	State.prototype.execute = function() {
		throw new Error('Parent execute must been override by child');
	}

	function WorkInitState(timer){ this.timer = timer; };
	WorkInitState.prototype = new State();
	WorkInitState.prototype.execute = function() {
		console.log('work init state');
		$statusLbl.html('Session');
		$ballMask.height('0%');
	}

	function WorkRunningState(timer){ this.timer = timer; };
	WorkRunningState.prototype = new State();
	WorkRunningState.prototype.execute = function() {
		console.log('work running state');
		var that  = this;
		this.timer.startInterval(function(){
			$statusLbl.html('Session');
			$ballKernel.css('background', '#A3D200');
			$remainLbl.html(that.timer.minutes + ':' + that.timer.seconds);
			$ballMask.height(100 - (that.timer.minutes*60 + that.timer.seconds) / (sessionLength * 60) * 100 + '%');
		});
	}

	function WorkPausedState(timer){ this.timer = timer; };
	WorkPausedState.prototype = new State();
	WorkPausedState.prototype.execute = function() {
		console.log('work paused state');
		this.timer.stopInterval();
	}

	function RestInitState(timer){ this.timer = timer; };
	RestInitState.prototype = new State();
	RestInitState.prototype.execute = function() {
		console.log('rest init state');
		$statusLbl.html('Break!');
		$ballMask.height('0%');
	}

	function RestRunningState(timer){ this.timer = timer; };
	RestRunningState.prototype = new State();
	RestRunningState.prototype.execute = function() {
		console.log('rest running state');
		var that  = this;
		this.timer.startInterval(function(){
			$statusLbl.html('Break!');
			$ballKernel.css('background', '#FF4E4D');
			$remainLbl.html(that.timer.minutes + ':' + that.timer.seconds);
			$ballMask.height(100 - (that.timer.minutes*60+that.timer.seconds) / (breakLength * 60) * 100 + '%');
		});
	}

	function RestPausedState(timer){ this.timer = timer; };
	RestPausedState.prototype = new State();
	RestPausedState.prototype.execute = function() {
		console.log('rest paused state');
		this.timer.stopInterval();
	}

	var Timer = function() {
		this.interval = null;
		this.minutes = 0;
		this.seconds = 0;
		this.workInitState = new WorkInitState(this);
		this.workRunningState = new WorkRunningState(this);
		this.workPausedState = new WorkPausedState(this);
		this.restInitState = new RestInitState(this);
		this.restRunningState = new RestRunningState(this);
		this.restPausedState = new RestPausedState(this);

		this.currentState = this.workInitState;

		this.gotoState = function(state) {
			this.currentState = state;
			this.currentState.execute();
		}

		this.handleToggleTimer = function() {
			if(this.currentState == this.workInitState) {
				this.minutes = sessionLength - 1;
				this.seconds = 60;
				this.gotoState(this.workRunningState);
			}
			else if(this.currentState == this.workRunningState) {
				this.gotoState(this.workPausedState);
			}
			else if(this.currentState == this.workPausedState) {
				this.gotoState(this.workRunningState);
			}
			else if(this.currentState == this.restInitState) {
				this.minutes = breakLength - 1;
				this.seconds = 60;
				this.gotoState(this.restRunningState);
			}
			else if(this.currentState == this.restRunningState) {
				this.gotoState(this.restPausedState);
			}
			else if(this.currentState == this.restPausedState) {
				this.gotoState(this.restRunningState);
			}
		}

		this.handleClickSessionBtns = function() {
			var state = null;
			if(this.currentState != this.workRunningState && this.currentState != this.restRunningState) {
				$sessionLengthLbl.html(sessionLength);
			}
			if(this.currentState == this.workPausedState || this.currentState == this.workInitState) {
				$remainLbl.html(sessionLength);
				this.gotoState(this.workInitState);
			}
		}

		this.handleClickBreakBtns = function() {
			if(this.currentState != this.workRunningState && this.currentState != this.restRunningState) {
				$breakLengthLbl.html(breakLength);
			}
			if(this.currentState == this.restPausedState || this.currentState == this.restInitState) {
				$remainLbl.html(breakLength);
				this.gotoState(this.restInitState);
			}
		}

		this.handlerTimeOver = function() {
			if(this.currentState == this.workRunningState) {
				this.minutes = breakLength - 1;
				this.seconds = 60;
				this.stopInterval();
				this.gotoState(this.restRunningState);
			}
			else if(this.currentState == this.restRunningState) {
				this.minutes = sessionLength - 1;
				this.seconds = 60;
				this.stopInterval();
				this.gotoState(this.workRunningState);
			}
		}

		this.startInterval = function( callback ) {
			var that  = this;
			this.interval = setInterval(function() {
				if(that.seconds > 0) {
					that.seconds --;
				}
				else if(that.minutes > 0) {
					that.minutes --;
					that.seconds += 60;
				}
				else {
					that.handlerTimeOver();
				}
				callback.call(that);
			}, 100)
		};

		this.stopInterval = function(shouldReset) {
			clearInterval(this.interval);
			this.interval = null;
		}

	}


	var timer = new Timer();

	$(document).on('click', '#maskWrapper', function() {
		timer.handleToggleTimer();
	})
	.on('click', '.breakOpeBtn', function() {
		var id = $(event.target).attr('id');
		breakLength = (id === 'subtractBreakBtn' ? Math.max(1, breakLength - 1) : (breakLength + 1));
		timer.handleClickBreakBtns();
	})
	.on('click', '.sessionOpeBtn', function() {
		var id = $(event.target).attr('id');
		sessionLength = (id === 'subtractSessionBtn' ? Math.max(1, sessionLength - 1) : (sessionLength + 1));
		timer.handleClickSessionBtns();
	});

	timer.currentState.execute();
});
