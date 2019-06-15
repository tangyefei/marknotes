angular.module('form-validate')
    .directive('ensureUnique', function() {
        return {
            require: 'ngModel',
            link: function(scope, ele, attrs, c) {
                scope.$watch(attrs.ngModel, function(n) {
                    if(!n) return;
                    var names = ['admin', 'root'];
                    var index = names.indexOf(n);
                    c.$setValidity('unique', index === -1);
                })
            }
        };
    })

    .directive('ngFocus', function() {
        var FOCUS_CLASS = 'ng-focused';

        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, ele, attrs, ctrl) {
                ctrl.$focused = false;

                ele.bind('focus', function(ev) {
                    scope.$apply(function(){
                        ele.addClass(FOCUS_CLASS);
                        ctrl.$focused = true;
                    });
                }).bind('blur', function(ev) {
                    scope.$apply(function(){
                        ele.removeClass(FOCUS_CLASS);
                        ctrl.$focused = false;
                    });
                })
            }
        };
    });
