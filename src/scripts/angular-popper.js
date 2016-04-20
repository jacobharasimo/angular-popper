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
        .service('popperService', ['$log', '$document', '$timeout',
            function ($log, $document, $timeout) {
                var popup;

                function getPopupBubble() {
                    return popup._popper;
                }

                function closeAllOpen() {
                    if(popup){
                        popup.destroy();
                    }

                }

                function close(e, popperAfterClose) {
                    popup._popper.setAttribute('aria-hidden', 'true');
                    var toggleElement = getPopupBubble();
                    if (e && toggleElement && toggleElement.contains(e.target)) {
                        return;
                    }
                    $log.debug('close');
                    $document.off('click', close);
                    $document.off('keydown', escapeKey);

                    if (popup) {
                        popup.destroy()
                    }
                    if (popperAfterClose && typeof popperAfterClose === 'function') {
                        popperAfterClose(e);
                    }
                    e.stopPropagation();
                }

                function escapeKey(e) {
                    if (e.which === 27) {
                        $timeout(function () {
                            close(e)
                        });
                    }
                }

                function create(trigger, popper, options) {
                    closeAllOpen();
                    popup = new Popper(trigger, popper, options);
                    popup._popper.setAttribute('aria-role', 'tooltip');
                    popup._popper.setAttribute('aria-hidden', 'false');
                    $document.on('click', close);
                    $document.on('keydown', escapeKey);


                    popup.onUpdate(function () {
                        console.log('a');
                    });
                    popup.onCreate(function () {
                        console.log('a');
                    });
                    return popup;
                }

                return {
                    create: create,
                    escapeKey: escapeKey,
                    close: close,
                    getPopupBubble: getPopupBubble
                };

            }])
        .controller('popperCtrl',
            ['$scope', '$element', 'popperService',
                function ($scope, $element, popperService) {
                    var popup;
                    var popperTrigger = $element[0];
                    var popper = this.popperTrigger;
                    var popperOptions = this.popperOptions;
                    var popperBeforeOpen = this.popperBeforeOpen;
                    var popperAfterClose = this.popperAfterClose;

                    function open(e) {
                        if (popperBeforeOpen && typeof popperBeforeOpen === 'function') {
                            popperBeforeOpen(e);
                        }
                        if (!popup) {

                            popup = popperService.create(popperTrigger, popper, popperOptions);
                        } else {
                            popup = popperService.create(popperTrigger, popup._popper, popperOptions);
                        }
                        /*$element.off('click', open);
                         $element.on('click', close);*/
                        e.stopPropagation();
                    }


                    function close(e) {
                        popperService.close(e, popperAfterClose);
                        $element.on('click', open);
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
                    popperOptions: '=',
                    popperBeforeOpen: '&',
                    popperAfterClose: '&'

                },
                scope: true,
                controller: 'popperCtrl',
                controllerAs: 'Popper'
            }
        }]);
})();