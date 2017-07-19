function MakeObservableMap(Observable) {
  return function ObservableMap(props) {
    var observableMap = this;

    var makeGetter = function(val) {
      return function() {
        if (typeof val === 'function') {
          var setStream = null;

          return val.call(observableMap, setStream, Observable);
        } else {
          return Observable.of(val);
        }
      };
    };

    for (var prop in props) {
      var get = makeGetter(props[prop]);

      Object.defineProperty(this, prop, {
        get: get
      });
    }
  };
}

module.exports = MakeObservableMap;
