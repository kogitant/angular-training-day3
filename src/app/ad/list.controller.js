'use strict';

angular.module('funmarket')
  .controller('ListAdsCtrl', function ($scope, $resource, $log,  $location) {

        var AdResource = $resource('http://funmarket-api.herokuapp.com/marketads/:id', {id: '@id'});
        $scope.ads =  AdResource.query();


        $scope.edit = function(ad){
            $log.log("Would edit " + angular.toJson(ad));
            $location.path('/new-ad/' + ad.id);
        }

  });

