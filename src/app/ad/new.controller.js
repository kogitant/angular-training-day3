'use strict';

angular.module('funmarket')
    .directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function(){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }])
    .controller('NewAdCtrl', function ($scope, $routeParams, $resource) {

        var currentId = $routeParams.id;
        var AdResource = $resource('http://funmarket-api.herokuapp.com/marketads/:id', {id: '@id'});


        // This is the template ad to edit
        $scope.ad={"title": "", "description": "Desc", "priceCents":"", "imageUrl":"", "thumbnailUrl":""};
        if(currentId){
            // This is the template ad to edit
            AdResource.get({"id": currentId}).$promise.then(function (data) {
                $scope.ad = data;
            });
        }

        $scope.clearAd = function(){
            $log.log("Clearing ad from " + angular.toJson( $scope.ad));
            $scope.ad = {"title": "", "description": ""};
            $log.log("to " + angular.toJson( $scope.ad));
        }
    })
    .controller('AdFormController', ['$scope', '$http', '$log', '$resource', '$location', function($scope, $http, $log, $resource, $location) {

        $scope.cancel= function() {
            $scope.$parent.clearAd();
        };

        var AdResource = $resource('http://funmarket-api.herokuapp.com/marketads/:id', {id: '@id'});
        $scope.submit = function() {
            $log.log("About to post data");
            $log.log("About to post " + angular.toJson($scope.ad));

            if($scope.ad.id){
                $log.log("About to update");
                AdResource.save($scope.ad).$promise.then(function(data){
                    $log.log("Saved " + angular.toJson(data));
                })

            }else{
                $log.log("About to insert");
                AdResource.save($scope.ad).$promise.then(function(data){
                    $log.log("Saved " + angular.toJson(data));
                })

            }

            $location.path('/ads/');


        };




    }])
    .controller('ImageFormController', ['$scope', '$http', '$log', '$resource', function($scope, $http, $log, $resource) {

        var ImageResource = $resource('http://funmarket-api.herokuapp.com/images/:id', {id: '@id'});

        $scope.submitImage = function() {
            $log.log("About to post image: " + angular.toJson($scope.myFile));

            var fd = new FormData();
            fd.append('file', $scope.myFile);


            var uploadUrl = "http://funmarket-api.herokuapp.com/images";
            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })

                .success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    $log.log("Successfully uploaded: " + angular.toJson(data));

                    // Successfully uploaded: {"success":true,"imageUrl":"http://funmarket-api.herokuapp.com/images/55080f32e4b066d380e3deb8","thumbnailUrl":"http://funmarket-api.herokuapp.com/images/55080f32e4b066d380e3deba","error":null}

                    $log.log("Ad before: " + angular.toJson($scope.$parent.ad));

                    $scope.$parent.ad.imageUrl = data.imageUrl;
                    $scope.$parent.ad.thumbnailUrl = data.thumbnailUrl;
                    $scope.$parent.ad.imageUploaded = true;

                    $log.log("Ad after: " + angular.toJson($scope.$parent.ad));
                }).
                error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    $log.log("Failed upload: " + data + " config: " + config);
                });


        };


    }])
;

