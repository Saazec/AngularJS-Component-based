( function() {
    'use strict';
    angular.module('courseViewer')
        .component('courseAuthorInfo', {
            bindings: {
                author: '<'
            },
            require: {
                courseVm: '^course' // course controller i.e. referring to courseController
            },
            controllerAs: 'vm',
            controller: function(courseService) {
                var vm = this;
                vm.courseLength = null;
                vm.courseReleased = null;
                vm.$onChanges = function(changes) {
                    if(vm.courseVm != null && vm.courseVm.course != null) {
                        var course = vm.courseVm.course;
                        var hours = 0, minutes = 0,secoonds = 0;
                        course.Modules.forEach(function(module) {
                            minutes += module.Minutes;
                            secoonds += module.Seconds;

                        });
                        vm.courseLength = courseService.timeFormat(hours, minutes, secoonds);
                        vm.courseReleased = new Date(course.Released).toLocaleDateString();
                    }
                }
            },
            templateUrl: 'course-viewer/course/course-author-info.component.html'
        })
})();