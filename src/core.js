export default function MakeMaurauder(Observable) {
  return function observableDecorator(target, key, descriptor) {
    const startWith = [];
    let observer = null;
    const observable = Observable.create((obs) => observer = obs);

    // props like `first = 'Kevin'` provide an initializer function
    // to return the value;
    if (typeof descriptor.initializer === 'function') {
      startWith.push( descriptor.initializer() );
    }

    return {
      get() {
        if (typeof descriptor.value === 'function') {
          // create stream property derived from a function
          // this is used when you pass `prop: function() { ... }`
          return descriptor.value.call(target, observable);
        } else {
          // create "simple" stream property
          // this is used when you pass `prop: true`
          return observable
            .startWith(...startWith);
        }
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
