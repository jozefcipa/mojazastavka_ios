import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, AsyncStorage } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CitiesModal from './CitiesModal';
import city from '../assets/city.png';

export default (props) => {

  return (
    <LinearGradient 
      colors={['#f64747', '#f42727', '#dd0b0b']} 
      style={{flex: 1, alignSelf: 'stretch'}}>
        <View style={{marginTop: 20, backgroundColor: 'transparent', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 7, paddingRight: 7, paddingBottom: 4}}>
          <View>
            <Text style={{color: '#ECECEC', textAlign: 'center', fontSize: 22, fontWeight: 'bold', fontFamily: 'Varela Round'}}>Moja Zastávka</Text>
          </View>
          <TouchableOpacity 
            activeOpacity={0.6}
            onPress={() => props.showCitiesModal(true)} 
            style={{flexDirection: 'row', alignItems: 'flex-end'}}>
              <Text style={{color: '#ECECEC', fontSize: 14, fontWeight: 'bold', paddingRight: 5, fontFamily: 'Varela Round'}}>
                {props.selectedCity.name || 'Vyberte mesto'}
              </Text>
              <Image source={city} />
          </TouchableOpacity>
        </View>
        
        <Modal
          transparent={true}
          animationType={'fade'}
          visible={props.citiesModalVisible}>
            <CitiesModal {...props} changeCity={ (city) => {

              //save city
              props.selectCity(city);
              AsyncStorage.setItem('SELECTED_CITY', JSON.stringify(city));

              //hide modal
              props.showCitiesModal(false);
            }}/>
        </Modal>
    </LinearGradient>
  );
}