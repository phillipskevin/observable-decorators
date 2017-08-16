export default function makeDecorator(Observable) {
  return function observableDecorator(target, key, descriptor) {
    const startWith = [];
    let observer = null;
    const observable = Observable.create((obs) => observer = obs);

    // props like `first = 'Kevin'` provide an initializer function
    // to return the value;
    if (typeof descriptor.initializer === 'function') {
      startWith.push( descriptor.initializer() );
    }

    // create cache for storing observables
    // so that getter / initializer functions only need to run once
    if (!target._observables) {
      Object.defineProperty(target, '_observables', {
        enumerable: false,
        value: {}
      });
    }

    return {
      get() {
        const cache = target._observables;

        // cache observable if not already present
        if (!cache[key]) {
          if (typeof descriptor.value === 'function') {
            // create derived stream property using function
            //
            // @observable
            // myProp() { ... }
            cache[key] = descriptor.value.call(target, observable);
          } else {
            // create "simple" stream property
            //
            // @obserable
            // first = 'Kevin';
            cache[key] = observable
              .startWith(...startWith);
          }
        }

        // return value from cache
        return cache[key];
      },

      set(val) {
        if (observer) {
          observer.next(val);
        } else {
          startWith.push(val);
        }
      }
    };
  };
}
