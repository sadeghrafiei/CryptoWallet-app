import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import {enableScreens} from 'react-native-screens';
import {PersistGate} from 'redux-persist/lib/integration/react';

import {persistor} from 'store/index';

import Loading from 'view/components/Loading';
import App from './app/App';

import {name as appName} from './app.json';

enableScreens();

const Elegant = () => (
  <PersistGate loading={<Loading />} persistor={persistor}>
    <App />
  </PersistGate>
);

AppRegistry.registerComponent(appName, () => Elegant);
