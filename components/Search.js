import React, {Component} from 'react';
import {StyleSheet, Alert, View, Image, TouchableOpacity} from 'react-native';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import { Kohana } from 'react-native-textinput-effects';
import { validateInputs } from '../helpers';
import swapIcon from '../assets/swap.png';

const styles = StyleSheet.create({
  view: {
    // flex: 2, TODO: edit text inputs to show placeholder vertically centered, then uncomment this line
    height: 115,
    backgroundColor: '#dd0b0b', 
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputsWrap: {
    flex: 8
  },

  swapIconWrap: {
    flex: 1
  },

  input: {
    backgroundColor: '#fff',
    margin: 5,
    marginTop: 0,
    borderRadius: 2,
  }
});

export default (props) => {

  const placeholder = props.geolocatedAddress || 'Vaša poloha';

   return (
      <View style={styles.view}>
        <View style={styles.inputsWrap}>
          <Kohana
              style={styles.input}
              label={placeholder}
              autoCorrect={false}
              iconClass={MaterialsIcon}
              iconName={'near-me'}
              iconColor={'#bdc3c7'}
              labelStyle={{ color: '#bdc3c7' }}
              inputStyle={{ color: '#000'}}
              value={props.startLocation}
              onChangeText={ (text) => props.startLocationChanged(text.trim()) }
              onSubmitEditing={ evt => {
                if(validateInputs(props.startLocation, props.geolocatedAddress, props.destinationLocation)){
                  props.searchStops();
                }
              }}/>
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
                if(validateInputs(props.startLocation, props.geolocatedAddress, props.destinationLocation)){
                  props.searchStops();
                }
              }}/>
        </View>
        <TouchableOpacity 
          opacity={0.7} 
          style={styles.swapIconWrap} 
          onPress={props.swapSearchValues}>
            <Image source={swapIcon}/>
        </TouchableOpacity>
    </View>
  );
}