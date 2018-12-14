( function(){
    'use strict';
    angular.module('app')
    .component('exampleComponent', {
        controllerAs: 'vm',
        controller: function () {
            var vm = this;

            vm.name = {
                first: '',
                last: ''
            };
            vm.fullName = '';

            vm.submit = function() {
                vm.fullName = vm.name.first + ' ' + vm.name.last;
            }
        },
        templateUrl: 'app/example-component.html'
    })
})();