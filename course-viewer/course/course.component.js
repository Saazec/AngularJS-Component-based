( function() {
    'use strict';
    angular.module('courseViewer')
        .component('course', {
            bindings: {
                courseId: '<'
            },
            controllerAs: 'vm',
            controller: function(courseService, authenticationService) {
                var vm = this;
                vm.authenticationService = authenticationService;
                vm.$onInit = function() {
                    if(vm.courseId) {
                        courseService.getCourse(vm.courseId)
                            .then(function(result) {
                                vm.course= result;
                                if(authenticationService.loggedIn) {
                                    courseService.updateRecentlyViewedCourse(authenticationService.userName, vm.course.CourseId)
                                        .then(function(courses) {
                                            vm.course  = courses;
                                        })
                                }
                            })
                    }
                }
            },
            templateUrl: 'course-viewer/course/course.component.html'
        })
})();