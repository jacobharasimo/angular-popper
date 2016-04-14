(function () {
    'use strict';
    /**
     * @ngdoc module
     * @name popperService
     * @description
     *
     * Provides a service wrapper for popper.js
     *
     */

    angular.module('angular-popper', [])
        .controller('popperCtrl',
            ['$scope','$log', '$element', '$document', '$timeout', function ($scope,$log, $element, $document, $timeout) {
                var popup;
                var popperTrigger = $element[0];
                var popper = this.popperTrigger;
                var popperOptions = this.popperOptions;
                if(!popper.attributes){
                    popper.attributes=[];
                }
                popper.attributes.push('id:popper_'+$scope.$id);
                popper.attributes.push('aria-role:tooltip');

                function open(e) {
                    e.stopPropagation();
                    $log.debug('open');
                    $element.off('click', open);
                    $element.on('click', close);
                    $document.on('click', close);
                    $document.on('keydown', escapeKey);
                    if(!popup){
                        popup = new Popper(popperTrigger, popper, popperOptions);
                    }else{
                        popup = new Popper(popperTrigger, popup._popper, popperOptions);

                    }
                }

                function getPopupBubble(){
                    return popup._popper;
                }

                function close(e) {
                    e.stopPropagation();

                    var toggleElement = getPopupBubble();
                    if (e && toggleElement && toggleElement.contains(e.target)) {
                        return;
                    }
                    $log.debug('close');
                    $document.off('click', close);
                    $document.off('keydown', escapeKey);
                    $element.off('click', close);
                    $element.on('click', open);
                    if (popup) {
                        popup.destroy()
                    }
                }

                function escapeKey(e) {
                    if (e.which === 27) {
                        $timeout(function () {
                            close(e)
                        });
                    }
                }

                function initialize() {
                    $element.on('click', open);
                }


                initialize();
            }])
        .directive('popperTrigger', [function () {
            return {
                restrict: 'A',
                replace: false,
                bindToController: {
                    popperTrigger: '=',
                    popperOptions: '='
                },
                scope: true,
                controller: 'popperCtrl',
                controllerAs: 'Popper'
            }
        }]);
})();