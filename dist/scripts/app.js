'use strict';
angular.module('myApp', ['angular-popper'])
    .controller('MyController', ['$scope',
        function ($scope, popperService) {
            $scope.toggleButton = 'Open';
            $scope.test = function (e) {
                var ref = e.target;
                popperService.open(ref);
            };

            var popperTrigger=document.getElementById('example10reference1');
            var popper={content:'My Awesome Popper'};
            var popperOptions={
                placement:'top'
            };

            
            $scope.options={
                placement:'left'
            };
            
            $scope.popperContent={
                content:"triggered by click"
            };
            
            
            var a = new Popper(popperTrigger,popper,popperOptions);

        }]
    );
