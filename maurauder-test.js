import QUnit from 'steal-qunit';
import Maurauder from './maurauder';

import Rx from 'rxjs/Rx';

QUnit.module('maurauder - rxjs');

QUnit.test('basics', function() {
  var ObservableMap = Maurauder(Rx.Observable);

  var VM = ObservableMap({
    first: 'Kevin',
    last: 'Phillips',
    fullName(setStream, { zip }) {
      return zip(this.first, this.last, function(first, last) {
        return first + ' ' + last;
      });
    }
  });

  var vm = new VM();

  QUnit.stop();
  vm.fullName.subscribe(function(fullName) {
    QUnit.equal(fullName, 'Kevin Phillips', 'fullName works');
    QUnit.start();
  });
});
