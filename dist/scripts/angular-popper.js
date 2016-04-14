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
            ['$log', '$element', '$document', '$timeout', function ($log, $element, $document, $timeout) {
                var popup;
                var popperTrigger = $element[0];
                var popper = this.popperTrigger;
                var popperOptions = this.popperOptions;

                function open(e) {
                    e.stopPropagation();
                    $log.debug('open');
                    $element.off('click', open);
                    $element.on('click', close);

                    $document.on('click', close);
                    $document.on('keydown', escapeKey);
                    popup = new Popper(popperTrigger, popper, popperOptions);
                }


                function close(e) {
                    e.stopPropagation();
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


                function initalize() {
                    $element.on('click', open);
                }

                initalize();
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