(function () {
    'use strict';
    angular.module('courseViewer')
        .factory('courseService', function (apiBase, $http, authenticationService) {
            var self = this;
            self.getAllCourses = function () {
                return $http.get(apiBase + 'courses')
                    .then(function (result) {
                        return result.data;
                    })
            }

            self.getCourse = function (courseId) {
                return $http.get(apiBase + 'course/' + courseId + '/full')
                    .then(function (result) {
                        return result.data;
                    })
            }

            self.timeFormat = function (hours, minutes, seconds) {
                while (seconds > 59) {
                    minutes++;
                    seconds -= 60;
                }
                while (minutes > 59) {
                    hours++;
                    minutes -= 60;
                }
                var timeString = '';
                if (hours > 0) {
                    timeString += hours.toString() + 'h ';
                    timeString += minutes.toString() + 'm ';
                    timeString += seconds.toString() + 's '
                }

                return timeString;
            }

            self.getCourseDiscussion = function (courseId) {
                var accessToken = authenticationService.getAccessToken();
                return $http({
                    url: apiBase + 'course/' + courseId + '/discussion',
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
                })
                    .then(function (result) {
                        return result.data;
                    })
            }

            self.addCourseDiscussionItem = function (UserName, CourseId, Comment) {
                var accessToken = authenticationService.getAccessToken();
                if (accessToken != '') {
                    var discussionItemModel = {
                        UserName,
                        CourseId,
                        Comment
                    };
                    return $http({
                        url: apiBase + 'course/' + CourseId + '/discussion',
                        method: 'POST',
                        headers: {
                            'Authorization': 'Bearer ' + accessToken
                        },
                        data: discussionItemModel
                    })
                        .then(function (result) {
                            return result.data;
                        })
                }
            }


            self.updateRecentlyViewedCourse = function (UserName, CourseId) {
                var accessToken = authenticationService.getAccessToken();
                if (accessToken) {
                    var recentModel = {
                        UserName,
                        CourseId
                    }
                    return $http({
                        url: apiBase + 'courses/recent',
                        method: 'POST',
                        headers: {
                            'Authorization': 'Bearer ' + accessToken
                        },
                        data: recentModel
                    })
                        .then(function (result) {
                            return result.data;
                        })
                }
            }

            self.getRecentlyViewedCourses = function (UserName) {
                var accessToken = authenticationService.getAccessToken();
                if (accessToken) {
                    return $http({
                        url: apiBase + 'courses/recent/' + UserName + '/get',
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + accessToken
                        }
                    })
                        .then(function (result) {
                            return result.data;
                        })
                }
            }

            self.clearRecentlyViewedList = function(UserName) {
                var accessToken = authenticationService.getAccessToken();
                if(accessToken) {
                    return $http({
                        url: apiBase + 'courses/recent/' + UserName + '/clear',
                        method: 'POST',
                        headers: {
                            'Authorization': 'Bearer ' + accessToken
                        }
                    })
                        .then(function(result) {
                            
                        })
                }
            }
            return this;
        })
})();