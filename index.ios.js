import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AppRegistry, View } from 'react-native';

import store  from './store';
import Header from './components/Header';
import Search from './containers/Search';
import Map    from './containers/Map';

const App = () => {
  return (
    <Provider store={store}>
      <View style={
        {
          flexDirection: 'column', 
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1
        }
      }>
        <Header/> 
        <Search/>
        <Map/>
      </View>
    </Provider>
  );
};

export default App;

AppRegistry.registerComponent('mojazastavka_ios', () => App);