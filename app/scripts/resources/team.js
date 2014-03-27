'use strict';

angular.module('fantasyGolfApp')
  .factory('Team', function ($resource) {
    return $resource('/api/team/:id', {
      id: '@_id'
    }, { //parameters default
      update: {
        method: 'PUT',
        params: {}
      }
    });
  });