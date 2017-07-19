function MakeObservableMap(Observable) {

  // creates a constructor function
  return function(props) {
    return function ObservableMap() {
      var observableMap = this;

      var getterSetter = function(val) {
        var get = function() {
          if (typeof val === 'function') {
            var setStream = null;

            return val.call(observableMap, setStream, Observable);
          } else {
            return Observable.of(val);
          }
        };

        return {
          get: get
        };
      };

      for (var prop in props) {
        var _getSet = getterSetter(props[prop]);

        Object.defineProperty(this, prop, {
          get: _getSet.get
        });
      }
    };
  };
}

module.exports = MakeObservableMap;
