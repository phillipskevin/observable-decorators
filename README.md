# maurauder

[![Build Status](https://travis-ci.org/phillipskevin/maurauder.svg?branch=master)](https://travis-ci.org/phillipskevin/maurauder)

(Experimental) Observable Maps

## Usage

```js
import Maurauder from 'maurauder';
import Rx from 'rxjs/Rx';

const ObservableMap = Maurauder(Rx.Observable);

const vm = new ObservableMap({
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
