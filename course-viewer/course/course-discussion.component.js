( function() {
    'use strict';
    angular.module('courseViewer')
        .component('courseDiscussion', {
            bindings: {
                course: '<',
                loggedIn: '<'
            },
            controllerAs: 'vm',
            controller: function(courseService, authenticationService) {
                var vm = this;
                vm.courseDiscussion = null;
                vm.authenticationService = authenticationService;
                vm.commentEntryVisible = false;
                vm.$onChanges = function(changes) {
                    if( changes.loggedIn.currentValue != null || changes.course.currentValue != null) {
                        if( authenticationService.loggedIn && vm.course) {
                            courseService.getCourseDiscussion(vm.course.CourseId)
                                .then(function(courseDiscussion){
                                    vm.courseDiscussion = courseDiscussion;
                                })
                        }
                    }
                }
                vm.showCommentEntry = function() {
                    vm.commentEntryVisible = true;
                }

                vm.commentSubmited = function(comment) {
                    if(authenticationService.loggedIn) {
                        courseService.addCourseDiscussionItem(authenticationService.userName, vm.course.CourseId, comment)
                            .then(function(discussionItem){
                                vm.courseDiscussion.push(discussionItem);
                                vm.commentEntryVisible = false;
                            })
                    }
                }

                vm.commentCancelled = function(){
                    vm.commentEntryVisible = false;
                }
            },
            templateUrl: 'course-viewer/course/course-discussion.component.html'
        })
})();