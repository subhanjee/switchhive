import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './src/navigation/stackNavigation';
import {enableScreens} from 'react-native-screens';
import {Provider} from 'react-redux';
import Store from './src/redux/store';
enableScreens();

const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
