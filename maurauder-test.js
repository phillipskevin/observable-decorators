import QUnit from 'steal-qunit';
import ReactiveMap from './maurauder';

QUnit.module('maurauder');

QUnit.test('can create settable streams of primitive values', function() {
  var VM = ReactiveMap({
    first: 'Kevin'
  });

  var vm = new VM({});

  QUnit.stop();
  vm.first.subscribe(function(first) {
    QUnit.equal(first, 'Tracy', 'first works');
    QUnit.start();
  });

  vm.first = 'Tracy';
});

QUnit.test('can create streams derived from other streams', function() {
  var VM = ReactiveMap({
    first: 'Kevin',
    last: 'Phillips',
    fullName(setStream, { zip }) {
      return zip(this.first, this.last, function(first, last) {
        return first + ' ' + last;
      });
    }
  });

  var vm = new VM({
    first: 'Tracy'
  });

  QUnit.stop();
  vm.fullName.subscribe(function(fullName) {
    QUnit.equal(fullName, 'Tracy Phillips', 'fullName works');
    QUnit.start();
  });
});
