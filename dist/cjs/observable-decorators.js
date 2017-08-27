/*observable-decorators@0.0.1#observable-decorators*/
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.observableFromConfig = observableFromConfig;
var _Observable = require('rxjs/Observable');
require('rxjs/add/observable/from');
require('rxjs/add/operator/startWith');
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
                    if (typeof descriptor.get === 'function') {
                        cache[key] = fromObservable(descriptor.get.call(target));
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