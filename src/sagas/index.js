import { fork } from 'redux-saga/effects';
import {watchSocketAsync} from './socket';

export default function* root() {
    yield fork(watchSocketAsync);
}
