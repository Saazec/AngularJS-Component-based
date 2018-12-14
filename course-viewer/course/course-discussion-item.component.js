(function() {
    'use strict';
    angular.module('courseViewer')
        .component('courseDiscussionItem', {
            bindings: {
                commentSubmited: '&',
                commentCancelled: '&'
            },
            controllerAs: 'vm',
            controller: function() {
                var vm = this;
                vm.submit = function() {
                    if(vm.commentText != null) {
                        if(vm.commentSubmited != null) {
                            vm.commentSubmited()(vm.commentText); // It means that the first function vm.commentSubmited returns another function and then that returned function is called immediately
                            vm.commentText = '';
                        }
                    } else {
                        vm.cancel();
                    }
                };
                vm.cancel = function() {
                    if(vm.commentCancelled != null) {
                        vm.commentCancelled()();
                        vm.commentText = '';
                    }
                }
            },
            templateUrl: 'course-viewer/course/course-discussion-item.component.html'
        })
})();