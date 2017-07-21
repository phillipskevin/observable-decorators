import QUnit from 'steal-qunit';
import ReactiveMap from './maurauder';

function assertStreamValues(stream, values, key) {
  values.forEach(() => {
    QUnit.stop();
  });

  let count = 0;

  stream.subscribe((val) => {
    QUnit.equal(val, values[count], `${key}[${count}] should be ${values[count]}`);
    count++;
    QUnit.start();
  });
}

QUnit.module('maurauder');

QUnit.test('can create settable streams of primitive values', () => {
  const VM = ReactiveMap({
    first: 'Kevin'
  });

  const vm = new VM({});
  assertStreamValues(vm.first, [ 'Kevin', 'Tracy' ], 'vm.first');

  // cannot set until after subscribing
  vm.first = 'Tracy';
});

QUnit.test('can create settable streams derived from other streams', () => {
  const VM = ReactiveMap({
    first: 'Tracy',
    last: 'Phillips',
    fullName(setStream, { combineLatest }) {
      return combineLatest(this.first, this.last, (first, last) => {
        return first + ' ' + last;
      })
      .merge(setStream);
    }
  });

  const vm = new VM({
    first: 'Kevin'
  });

  assertStreamValues(vm.fullName, [
    'Kevin Phillips',
    'Clancy Wiggum',
    'Kevin Quinn',
    'Laura Quinn'
  ], 'vm.fullName');

  // cannot set until after subscribing
  vm.fullName = 'Clancy Wiggum';
  vm.last = 'Quinn';
  vm.first = 'Laura';
});
