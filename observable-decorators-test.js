import QUnit from 'steal-qunit';
import observable, { observableFromConfig } from './observable-decorators';
import 'rxjs/add/operator/combineLatest'
import 'rxjs/add/operator/scan'
import Kefir from 'kefir';
import kefirConfig from './config/kefir';

const assertStreamValues = (obj, key, values, subscribeFn = 'subscribe') => {
	values.forEach(() => {
		QUnit.stop();
	});

	let count = 0;
	const stream = obj[key];

	stream[subscribeFn]((val) => {
		QUnit.deepEqual(val, values[count], `${key}[${count}] should be ${values[count]}`);
		count++;
		QUnit.start();
	});
}

QUnit.module('observable-decorators - observable');

QUnit.test('can create settable streams of primitive values', () => {
	class Person {
		@observable
		first = 'Kevin';
	}

	const person = new Person();
	assertStreamValues(person, 'first', [ 'Kevin', 'Tracy' ]);

	person.first = 'Tracy';
});

QUnit.test('can create streams derived from other streams', () => {
	class Person {
		constructor(override) {
			Object.assign(this, override);
		}

		@observable
		first = 'Kevin';

		@observable
		last = 'Phillips';

		@observable
		get fullName() {
			return this.first.combineLatest(this.last, (first, last) => {
				return first + ' ' + last;
			});
		}
	}

	const person = new Person({
		first: 'Kevin'
	});

	person.last = 'McCallister';

	assertStreamValues(person, 'fullName', [
		'Kevin Phillips',
		'Kevin McCallister'
	]);
});

QUnit.test('should cache streams', () => {
	class Person {
		@observable
		first = 'Kevin';

		@observable
		last = 'Phillips';

		@observable
		get fullName() {
			return this.first.combineLatest(this.last, (first, last) => {
				return first + ' ' + last;
			});
		}
	}

	const person = new Person();

	person.first.foo = 'bar';
	QUnit.equal(person.first.foo, 'bar');

	person.fullName.foo = 'bar';
	QUnit.equal(person.fullName.foo, 'bar');
});

QUnit.module('observable-decorators - observableFromConfig');

QUnit.test('works with Kefir', () => {
	const kefirObservable = observableFromConfig(kefirConfig);
	class Person {
		constructor(override) {
			Object.assign(this, override);
		}

		@kefirObservable
		first = 'Kevin';

		@kefirObservable
		last = 'Phillips';

		@kefirObservable
		get fullName() {
			return Kefir.combine([ this.first, this.last ], (first, last) => {
				return first + ' ' + last;
			});
		}
	}

	const person = new Person();

	assertStreamValues(person, 'fullName', [
		'Kevin Phillips',
		'Kevin McCallister'
	], 'onValue');

	person.last = 'McCallister';
});
