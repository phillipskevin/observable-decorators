/*observable-decorators@0.0.0#observable-decorators*/
define([
    'exports',
    'rxjs/Observable',
    'rxjs/add/observable/from',
    'rxjs/add/operator/startWith'
], function (exports, _Observable) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.observableFromConfig = observableFromConfig;
    var defaultConfig = {
        toObservable: function toObservable(stream) {
            return stream;
        },
        fromObservable: _Observable.Observable.from
    };
    function observableFromConfig() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultConfig, toObservable = _ref.toObservable, fromObservable = _ref.fromObservable;
        return function observableDecorator(target, key, descriptor) {
            var startWith = [];
            var observer = null;
            var observable = _Observable.Observable.create(function (obs) {
                return observer = obs;
            });
            if (typeof descriptor.initializer === 'function') {
                startWith.push(descriptor.initializer());
            }
            if (!target._observables) {
                Object.defineProperty(target, '_observables', {
                    enumerable: false,
                    value: {}
                });
            }
            return {
                get: function get() {
                    var cache = target._observables;
                    if (!cache[key]) {
                        if (typeof descriptor.value === 'function') {
                            cache[key] = fromObservable(descriptor.value.call(target, observable));
                        } else {
                            cache[key] = fromObservable(observable.startWith.apply(observable, startWith));
                        }
                    }
                    return cache[key];
                },
                set: function set(val) {
                    if (observer) {
                        observer.next(val);
                    } else {
                        startWith.push(val);
                    }
                }
            };
        };
    }
    var observableDecorator = observableFromConfig();
    exports.default = observableDecorator;
});