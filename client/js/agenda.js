angular.module('nibs.agenda', ['openfb', 'nibs.status', 'nibs.activity', 'nibs.wishlist'])

    .config(function ($stateProvider) {

        $stateProvider

            .state('app.agenda', {
                url: "/agenda",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/agenda-list.html",
                        controller: "AgendaDetailCtrl"
                    }
                }
            })

    })

    // REST resource for access to Agenda data
    .factory('Agenda', function ($http, $rootScope) {
        return {
            all: function() {
                return $http.get($rootScope.server.url + '/agenda');
            },
            get: function(agendaId) {
                return $http.get($rootScope.server.url + '/agenda/' + agendaId);
            }
        };
    })

    .controller('AgendaListCtrl', function ($scope, Agenda, OpenFB) {

        Agenda.all().success(function(agenda) {
            $scope.agenda = agenda;
        });

        $scope.doRefresh = function() {
            Agenda.all().success(function(agenda) {
                $scope.agenda = agenda;
                $scope.$broadcast('scroll.refreshComplete');
            });
        }

    })

    .controller('AgendaDetailCtrl', function ($scope, $rootScope, $stateParams, $ionicPopup, Agenda) {

        Agenda.get($stateParams.agendaId).success(function(agenda) {
            $scope.agenda = agenda;
        });

    });
