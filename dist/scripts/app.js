'use strict';
angular.module('myApp', ['angular-popper'])
    .controller('MyController', ['$scope',
        function ($scope) {
            $scope.toggleButton = 'Open';

            $scope.popperOptions={
                placement:'left'
            };
            
            $scope.popperContent={
                content:"triggered by click"
            };
            
            $scope.onOpen=function(){
                console.log('open callback');
            };

            $scope.onClose=function(){
                console.log('close callback');
            };
            
            
            //var a = new Popper(popperTrigger,popper,popperOptions);

        }]
    );
