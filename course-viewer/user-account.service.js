(function () {
    'use strict';
    angular.module('courseViewer')
        .factory('userAccountService', function ($http, apiBase) {
            var self = this;

            self.getUser = function (username) {
                return $http.get(apiBase + 'user/' + encodeURIComponent(username) + '/get')
                    .then(function (result) {
                        return result.data;
                    })
            }

            self.addUser = function (userModel) {
                return $http.post(apiBase + 'user/add', userModel)
                    .then(function (result) {
                        return result.data;
                    })
            }
            return this;
        })
})();