# maurauder

[![Build Status](https://travis-ci.org/phillipskevin/maurauder.svg?branch=master)](https://travis-ci.org/phillipskevin/maurauder)

(Experimental) Reactive Maps

## Usage

```js
import ReactiveMap from 'maurauder';

const Person = ReactiveMap({
  first: 'Tracy',
  last: 'Phillips',
  fullName(setStream, { combineLatest }) {
    return combineLatest(this.first, this.last, (first, last) => {
      return first + ' ' + last;
    })
    .merge(setStream);
  }
});

const person = new Person({
  first: 'Kevin'
});

person.fullName.subscribe((fullName) => {
  // 'Kevin Phillips',
  // 'Clancy Wiggum',
  // 'Kevin McCallister'
});

person.fullName = 'Clancy Wiggum';
person.last = 'McCallister';
```
