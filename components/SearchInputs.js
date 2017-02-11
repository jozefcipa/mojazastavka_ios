import React, {Component} from 'react';
import {StyleSheet, Alert, View} from 'react-native';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import { Kohana } from 'react-native-textinput-effects';

const styles = StyleSheet.create({
  view: {
    flex: 2, 
    backgroundColor: '#f75757', 
    alignSelf: 'stretch'
  },

  input: {
    backgroundColor: '#fff',
    margin: 5,
    marginTop: 0
  }
});

const validateInputs = (currentLocation, geolocatedAddress, destinationLocation) => {

  if(!currentLocation && !geolocatedAddress){
    Alert.alert('Zadajte Vašu polohu.');
    return false;
  }

  if(!destinationLocation){
    Alert.alert('Zadajte cieľovú polohu.');
    return false;
  }

  return true;
};

export default (props) => {

  const placeholder = props.geolocatedAddress || 'Vaša poloha';

   return (
      <View style={styles.view}>
        <Kohana
            style={styles.input}
            label={placeholder}
            autoCorrect={false}
            iconClass={MaterialsIcon}
            iconName={'near-me'}
            iconColor={'#bdc3c7'}
            labelStyle={{ color: '#bdc3c7' }}
            inputStyle={{ color: '#000'}}
            value={props.currentLocation}
            onChangeText={ (text) => props.currentLocationChanged(text.trim()) }
            onSubmitEditing={ evt => {
              if(validateInputs(props.currentLocation, props.geolocatedAddress, props.destinationLocation)){
                props.searchStops();
              }
            }}
          />
        <Kohana
            style={styles.input}
            label={'Cieľ'}
            autoCorrect={false}
            iconClass={MaterialsIcon}
            iconName={'place'}
            iconColor={'#bdc3c7'}
            labelStyle={{ color: '#bdc3c7' }}
            inputStyle={{ color: '#000' }}
            value={props.destinationLocation}
            onChangeText={ (text) => props.destinationLocationChanged(text.trim()) }
            onSubmitEditing={ evt => {
              if(validateInputs(props.currentLocation, props.geolocatedAddress, props.destinationLocation)){
                props.searchStops();
              }
            }}
          />
    </View>
  );
}