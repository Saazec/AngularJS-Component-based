( function() {

    'use strict';
    var app = angular.module('app', ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '/app/Example.html',
            controller: 'mainController',
            controllerAs: 'vm'
        })
    })
    .controller('mainController', function($scope) {
        var vm = this;
        vm.name = {
            first: '',
            last: ''
        };
        vm.fullName = '';
        vm.submit = function() {
            vm.fullName = vm.name.first + ' ' + vm.name.last;
        }
    })
})();