'use strict';

angular.module('fantasyGolfApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {

    $scope.menu = [
    {
      'title': 'My Leagues',
      'link': '/leagues'
    }, {
      'title': 'My Team',
      'link': '/team'
    }
    , {
      'title': 'Leaderboard',
      'link': '/leaderboard'
    }];
    
    $scope.logout = function() {
      Auth.logout()
      .then(function() {
        $location.path('/');
      });
    };
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
