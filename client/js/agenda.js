angular.module('nibs.agenda', [])

    .config(function ($stateProvider) {

        $stateProvider

            .state('app.agenda', {
                url: "/agenda",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/agenda-list.html",
                        controller: "AgendaListCtrl"
                    }
                }
            })

    })

    // REST resource for access to Agenda data
    .factory('Agenda', function ($http, $rootScope) {
        return {
            all: function() {
                return $http.get($rootScope.server.url + '/agenda');
            }
        };
    })

    .controller('AgendaListCtrl', function ($scope, Agenda) {

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
