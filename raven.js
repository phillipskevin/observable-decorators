import makeDecorator from './src/core';
import { Observable } from 'rxjs/Rx';

const observableDecorator = makeDecorator(Observable);

export default observableDecorator;
