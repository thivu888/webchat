import './App.css';
import RouterFile from './routers/index'
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers/index'
import rootSaga from './sagas';
import {theme} from './configTheme'
import { ThemeProvider } from '@mui/system';
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
      <ThemeProvider theme={theme}>
          <RouterFile/>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
