import { Observable } from 'rxjs/Rx';

export default function extend(props) {
  return function ReactiveMap(newProps) {
    var reactiveMap = this;

    var getterSetter = function(val) {
      var get = function() {
        if (typeof val === 'function') {
          var setStream = null;

          return val.call(reactiveMap, setStream, Observable);
        } else {
          return Observable.of(val);
        }
      };

      return {
        get: get
      };
    };

    for (var newProp in newProps) {
      props[newProp] = newProps[newProp];
    }

    for (var prop in props) {
      var _getSet = getterSetter(props[prop]);

      Object.defineProperty(this, prop, {
        get: _getSet.get
      });
    }
  };
}
