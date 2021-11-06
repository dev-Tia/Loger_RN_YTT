import React from 'react';
import {StatusBar, LogBox } from 'react-native';

import TabColorProvider from './SRC/CONTEXT/TabColorProvider';
import TempProvider from './SRC/CONTEXT/TempProvider';

import Splash from './SRC/Splash/Splash';

// YellowBox.ignoreWarnings(['Require cycle:']);
LogBox.ignoreLogs(['Require cycle:']);

const App = () => {
  return (
    <TabColorProvider>
      <TempProvider>
        <StatusBar barStyle="dark-content" />
        <Splash />
      </TempProvider>
    </TabColorProvider>
  );
};

export default App;
