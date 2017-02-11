import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AppRegistry, View, Alert, NetInfo } from 'react-native';

import store  from './store';
import Header from './components/Header';
import Search from './containers/Search';
import MapContainer from './containers/MapContainer';

export default class App extends Component{

  constructor(props) {
    super(props);
    
    //check for internet connection
    NetInfo.addEventListener('change', this.handleConnectivityChange);
  }

  handleConnectivityChange(reach){
    if(reach == 'none' || reach == 'unknown')
      Alert.alert('Chyba siete', 'Nie ste pripojení na internet\nSkontrolujte Vaše sieťové nastavenia.');
    
    //remove listener after first change
    NetInfo.removeEventListener('change', this.handleConnectivityChange);
  }

  render(){
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
          <MapContainer/>
        </View>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('mojazastavka_ios', () => App);