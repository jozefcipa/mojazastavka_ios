import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, AsyncStorage } from 'react-native';
import CitiesModal from './CitiesModal';
import city from '../assets/city.png';

export default (props) => {

  return (
    <View
      style={{flex: 1, alignSelf: 'stretch', minHeight: 55, backgroundColor: '#f64747'}}>
        <View style={{marginTop: 20, backgroundColor: 'transparent', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 7, paddingRight: 7, paddingBottom: 4}}>
          <View>
            <Text style={{color: '#ECECEC', textAlign: 'center', fontSize: 22, fontWeight: 'bold'}}>Moja Zastávka</Text>
          </View>
          <TouchableOpacity 
            activeOpacity={0.6}
            onPress={() => props.showCitiesModal(true)} 
            style={{flexDirection: 'row', alignItems: 'flex-end'}}>
              <Text style={{color: '#ECECEC', fontSize: 14, fontWeight: 'bold', paddingRight: 5}}>
                {props.selectedCity.name || 'Vyberte mesto'}
              </Text>
              <Image source={city} />
          </TouchableOpacity>
        </View>
        
        <Modal
          transparent={true}
          animationType={'fade'}
          visible={props.citiesModalVisible}>
            <CitiesModal {...props}/>
        </Modal>
    </View>
  );
}