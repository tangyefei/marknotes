$(function() {
    var numberExp = /^[0-9.]+$/;
    var operationElements = '+-*/%';
    var $resInput = $('#resInput');
    
    function isNumber(c) {
        return numberExp.test(c);
    }
    
    function isOperation(c) {
        return operationElements.indexOf(c) != -1;
    }

    function isSameType(c1, c2) {
        return (isNumber(c1) && isNumber(c2)) || (isOperation(c1) && isOperation(c2));
    }

    function Stack() {this.list = [];}
    Stack.prototype.enStack = function(ele) { this.list.push(ele); }
    Stack.prototype.deStack = function() {return this.list.pop();}
    Stack.prototype.length = function() {return this.list.length;}
    Stack.prototype.empty = function() {this.list.length = 0;}
    Stack.prototype.cleanPreviousNumber = function() {
        if(this.list[this.list.length - 1].type == 'number') {
            this.deStack();
        }
    }
    Stack.prototype.getLast = function() {
        return this.list.length > 0 ? this.list[this.list.length - 1] : undefined;
    }
    Stack.prototype.calcSelf = function() { 
        if(this.list.length == 2) { 
            var expression = this.list[0].value + this.list[1].value + this.list[0].value;
               try { 
                result = eval(expression); 
            }
            catch(err) { 
                result = NaN;
                   } 
            this.empty();
                   this.enStack({type:'number', value: result, calculated: true}); 
        } 
    }
    Stack.prototype.calculate = function() {
               var expression = '';
               var result; 
        for(var i = 0; i < this.list.length; i++) {
            expression += this.list[i].value; 
        } 
        try
        { 
            result =  eval(expression); 
        }
        catch(err) { 
            result  = NaN; 
        } 
        return result; 
    }
    

    function updateResInput() {
               var res = ''; 
        for(var i = stack.list.length - 1; i >=0; i--) {
            if(stack.list[i].type == 'number') {
                res = stack.list[i].value;
                break;
            }
        }
        $resInput.val(res); 
    }
    
    var pre, _new;

    function calculateExp(ele) { 
        var pre = stack.getLast();

        if(stack.length() == 0) { 
            _new = {type: isNumber(ele) ? 'number' : 'operation', value: ele};
            if(isNumber(ele) || isOperation(ele)) { 
                stack.enStack(_new);
            }
                   else if(ele == '=') { 
                $.noop() 
            } 
        }
               else if(stack.length() == 1) { 
            if(isNumber(ele)) {
                if(pre.type == 'operation') {
                    if('+*/'.indexOf(pre.value) != -1) {
                            stack.deStack();
                                   _new = {type: 'number', value: ele};
                            stack.enStack(_new);
                    }
                    else if(pre.value == '-') {
                        pre.value = -1 * parseInt(pre.value);
                    } 
                } 
                else if(pre.type == 'number'){
                    if(pre.calculated != undefined && pre.calculated == true) {
                        stack.deStack();
                        _new = {type: 'number', value: ele};
                        stack.enStack(_new);
                    }
                    else {
                        pre.value += ele;
                    } 
                }
            }    
            else if(isOperation(ele)) { 
                _new = {type: 'operation', value: ele};
                stack.enStack(_new); 
            } 
        }
        else if(stack.length() == 2) {
            if(isOperation(ele)) {
                if(pre.type == 'operation') {
                    pre.value = ele;
                }
                else {
                    $.noop();
                }
            }
            else if(isNumber(ele)) {
                if(pre.type == 'number'){
                    pre.value += ele;
                }
                else {
                    _new = {type: 'number', value: ele};
                    stack.enStack(_new);
                }
            }
            else if(ele == '=') {
                stack.calcSelf();
            }
        }
        else if(stack.length() == 3) {
            if(isNumber(ele)) {
                    if(pre.calculated != undefined && pre.calculated) {
                        stack.empty();
                        _new = {type: 'number', value: ele};
                        stack.enStack(_new);
                    }
                    else {
                    
                        pre.value += ele;
                    }
                }
                else {
                    var result = stack.calculate();
                    stack.empty();
                    _new = {type: 'number', value: result, calculated: true};
                    stack.enStack(_new);    
                    if(ele != '=') {
                        _new = {type: 'operation', value: ele};
                        stack.enStack(_new);
                    } 
                }
            }
    }
    
    var g_exp = '', g_len = 0;
    var stack = new Stack();

    $(document).click('#calculator button', function() {
        if(event.target.nodeName == 'BUTTON') {

            var text = event.target.textContent;
            console.log(text);
            if(text == 'AC') {
                delete pre;
                delete _new;
                stack.empty();
                updateResInput();
            }
            else if(text == 'CE') {
                stack.cleanPreviousNumber();    
                pre = stack.list[stack.list.length - 1];
                updateResInput();
            }
            else {
                g_exp += text;
                g_len = g_exp.length;
                console.log('__raw input:' + g_exp);
                calculateExp(g_exp[g_len - 1]);
                updateResInput();
            }
        }
    });
});
