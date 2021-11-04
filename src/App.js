import './App.css';
import RouterFile from './routers/index'
import Home from './components/Home/Container'
import { composeWithDevTools } from 'redux-devtools-extension';
import { lazy } from 'react';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers/index'
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

window.store = store;
sagaMiddleware.run(rootSaga);
function App() {
  return (
    <Provider store={store}>
        <RouterFile/>
    </Provider>
  );
}

export default App;
