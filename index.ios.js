import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AppRegistry, View, Alert, NetInfo, AsyncStorage } from 'react-native';
import Constants from './Constants';
import store  from './store';
import HeaderContainer from './containers/HeaderContainer';
import SearchContainer from './containers/SearchContainer';
import MapContainer from './containers/MapContainer';
import DeparturesContainer from './containers/DeparturesContainer';
import {
  setCustomTextInput,
  setCustomText,
} from 'react-native-global-props';

const textFontFamily = {
  style: {
    fontFamily: 'Varela Round',
  }
};

setCustomText(textFontFamily);
setCustomTextInput(textFontFamily);

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
        <View style={{
            flexDirection: 'column', 
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1
          }}>     
            <HeaderContainer/> 
            <SearchContainer/>
            <MapContainer/>
            <DeparturesContainer/>
        </View>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('mojazastavka_ios', () => App);