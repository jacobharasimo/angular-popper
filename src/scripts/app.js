'use strict';
angular.module('myApp', ['angular-popper'])
    .controller('MyController', ['$scope','popperService',
        function ($scope,popperService) {
            //use as a service

            var reference = document.getElementById('example10reference1');
            var popper = document.getElementById('example10popper1');
            var anotherPopper = popperService.create(
                reference,
                popper,
                {
                    // popper options here
                }
            );




            $scope.toggleButton = 'Open';

            $scope.popperOptions={
                placement:'bottom'
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
