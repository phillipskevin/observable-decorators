import { Observable } from 'rxjs/Rx';

function makeStreamDescriptor(context, val) {
  let observer = null;

  let setStream = Observable.create((obs) => observer = obs);

  const set = (val) => {
    observer.next(val);
  };

  const get = () => {
    if (typeof val === 'function') {
      return val.call(context, setStream, Observable);
    } else {
      return Observable.merge(
          Observable.of(val),
          setStream
      );
    }
  };

  return { get, set };
}

export default function extend(props) {
  return function ReactiveMap(newProps) {
    for (let newProp in newProps) {
      props[newProp] = newProps[newProp];
    }

    for (let prop in props) {
      Object.defineProperty(this, prop, makeStreamDescriptor(this, props[prop]));
    }
  };
}
