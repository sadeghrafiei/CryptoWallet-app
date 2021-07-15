import React, {useEffect} from 'react';
import Navigator from 'routes';
import {Provider as PaperProvider} from 'react-native-paper';
import themes from 'view/style/themes';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './store/tab/rootReducer';

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};

export default App;
