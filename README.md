# maurauder

[![Build Status](https://travis-ci.org/phillipskevin/maurauder.svg?branch=master)](https://travis-ci.org/phillipskevin/maurauder)

(Experimental) Reactive Maps

## Usage

```js
import ReactiveMap from 'maurauder';

const vm = new ReactiveMap({
  first: 'Kevin',
  last: 'Phillips',
  fullName(setStream, { zip }) {
    return zip(this.first, this.last, (first, last) => `${first} ${last}`);
  }
});

vm.fullName.subscribe((fullName) => {
  console.log(fullName); // Kevin Phillips
});
```
