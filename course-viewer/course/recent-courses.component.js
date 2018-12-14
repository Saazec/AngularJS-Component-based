(function(){
    'use strict';
    angular.module('courseViewer')
        .component('recentCourses', {
            bindings: {
                loggedIn: '<'
            },
            controllerAs: 'vm',
            controller: function(authenticationService, courseService) {
                var vm = this;
                vm.recentlyViewed = null;
                vm.authenticationService = authenticationService;
                vm.$onChanges = function() {
                    if(authenticationService.loggedIn) {
                        courseService.getRecentlyViewedCourses(authenticationService.userName)
                            .then(function(courses) {
                                vm.recentlyViewed = courses;
                            })
                    }
                }

                vm.clearList = function() {
                    courseService.clearRecentlyViewedList(authenticationService.userName);
                    vm.recentlyViewed = null;
                }
            },
            templateUrl: 'course-viewer/course/recent-course.component.html'
        })
})();