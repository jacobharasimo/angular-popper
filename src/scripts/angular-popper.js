var Popper = require('popper.js');
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
        .service('popper', ['$log', '$document', '$timeout',
            function ($log, $document, $timeout) {
                var popup;
                var ESCAPE_KEY = 27;

                function getPopupBubble() {
                    return popup._popper;
                }

                function getPopup() {
                    return popup;
                }

                function closeAllOpen() {
                    if (popup) {
                        popup.destroy();
                    }

                }

                function close(e) {
                    var popperAfterClose = service.afterClose;
                    popup._popper.setAttribute('aria-hidden', 'true');
                    var toggleElement = getPopupBubble();
                    if (e && toggleElement && $(toggleElement).find(e.target.tagName.toLowerCase()).length &&
                        e.which !== ESCAPE_KEY) {
                        return;
                    }
                    $log.debug('close');
                    $document.off('click', close);
                    $document.off('keydown', escapeKey);

                    if (popup) {
                        popup.destroy();
                    }
                    if (popperAfterClose && typeof popperAfterClose === 'function') {
                        popperAfterClose(e);
                    }
                    if (e) {
                        e.stopPropagation();
                    }
                }

                function escapeKey(e) {
                    if (e.which === ESCAPE_KEY) {
                        $timeout(function () {
                            close(e);
                        });
                    }
                }

                function create(trigger, popper, options) {
                    closeAllOpen();
                    popup = new Popper(trigger, popper, options);
                    popup._popper.setAttribute('aria-role', 'tooltip');
                    popup._popper.setAttribute('aria-hidden', 'false');
                    popup.update();
                    if (!options.doNotCloseOnClick) {
                        $document.on('click', close);
                    }
                    $document.on('keydown', escapeKey);


                    popup.onUpdate(function () {
                        // console.log('update');
                    });
                    popup.onCreate(function () {
                        // console.log('create');
                    });
                    return popup;
                }

                var service = {
                    create: create,
                    escapeKey: escapeKey,
                    close: close,
                    getPopupBubble: getPopupBubble,
                    getPopup: getPopup
                };

                return service;
            }])
        .controller('popperCtrl',
            ['$scope', '$element', 'popperService',
                function ($scope, $element, popperService) {
                    var popup;
                    var popperTrigger = $element[0];
                    var popper = this.popperTrigger;
                    var popperOptions = this.popperOptions;
                    var popperBeforeOpen = this.popperBeforeOpen;
                    var popperAfterCreate = this.popperAfterCreate;
                    popperService.afterClose = this.popperAfterClose;
                    if (this.popperOptions.outside) {
                        angular.element(popper).detach().appendTo('body');
                    }
                    function open(e) {
                        if (popperBeforeOpen && typeof popperBeforeOpen === 'function') {
                            popperBeforeOpen(e);
                        }
                        if (!popup) {
                            popup = popperService.create(popperTrigger, popper, popperOptions);
                        } else {
                            popup = popperService.create(popperTrigger, popup._popper, popperOptions);
                        }

                        if (popperAfterCreate && typeof popperAfterCreate === 'function') {
                            popperAfterCreate(e);
                        }

                        e.stopPropagation();
                    }


                    function close(e) {
                        popperService.close(e);
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
                    popperAfterClose: '&',
                    popperAfterCreate: '&'
                },
                scope: true,
                controller: 'popperCtrl',
                controllerAs: 'Popper'
            }
        }]);
})();
