'use strict';

angular.module('fantasyGolfApp')
  .controller('TeamCtrl', function ($rootScope, $scope, $location, Auth, tournamentModel, teamModel) {

    //get tournament info data
    tournamentModel.tournamentInfo().then(function(data){
      $scope.tournament = data;
    });

    //get team data
    teamModel.team($scope.currentUser.teamId).then(function(data){
      $scope.team = data;
    });

    $scope.updateTeam = function(team){

      //add user id
      team.userId = $scope.currentUser.userId;

      if(!team._id){

        //create
        var newTeam = new Team(team);

        //save
        newTeam.$save(function(response){
          $scope.team = response.team;
          $rootScope.currentUser = response.user;
          $scope.TeamForm.$setPristine();
          $scope.updated = true;
        });
      }

      else {

        //update
        Team.update({id: team._id}, team, function(team){
          $scope.team = team;
          $scope.TeamForm.$setPristine();
          $scope.updated = true;
        })
      }

    };


    //Account Settings
    $scope.errors = {};
    $scope.changePassword = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )

          .then( function() {
            $scope.message = 'Password successfully changed.';
          })

          .catch( function() {
            form.password.$setValidity('mongoose', false);
            $scope.errors.other = 'Incorrect password';
          });
      }
    };
  });
