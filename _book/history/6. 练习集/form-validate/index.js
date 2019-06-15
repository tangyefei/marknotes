var app = angular.module('form-validate', []);
app.controller('SignupController', ['$scope', function($scope) {
    $scope.signupForm = function() {
        alert('提交ing');
    }
}]);
