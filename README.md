# maurauder

[![Build Status](https://travis-ci.org/phillipskevin/maurauder.svg?branch=master)](https://travis-ci.org/phillipskevin/maurauder)

Observable Maps using decorators

## Usage

```js
import observable from 'maurauder';

class Person {
  constructor(override) {
    Object.assign(this, override);
  }

  @observable
  first = 'Kevin';

  @observable
  last = 'Phillips';

  @observable
  fullName() {
    return this.first.combineLatest(this.last, (first, last) => {
      return first + ' ' + last;
    });
  }
}

const person = new Person({
  first: 'Kevin'
});

person.fullName.subscribe((fullName) => {
  // 'Kevin Phillips',
  // 'Kevin McCallister'
});

person.last = 'McCallister';
```
