( function() {
    'use strict';

    angular.module('courseViewer')
        .component('home', {
            bindings: {

            },
            controllerAs: 'vm',
            controller: function(authenticationService){
                var vm = this;
                vm.authenticationService = authenticationService;
            },
            templateUrl: 'course-viewer/home.component.html'
        })
})();