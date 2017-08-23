import Kefir from 'kefir';

const config = {
	toObservable: stream => stream.toESObservable(),
	fromObservable: Kefir.fromESObservable,
};

export default config;
