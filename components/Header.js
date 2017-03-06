import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import city from '../assets/city.png';

export default () => {
  
  return (
    <LinearGradient 
      colors={['#f64747', '#f42727', '#dd0b0b']} 
      style={{flex: 1, alignSelf: 'stretch'}}>
        <View style={{marginTop: 20, backgroundColor: 'transparent', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 7, paddingRight: 7, paddingBottom: 4}}>
          <View>
            <Text style={{color: '#ECECEC', textAlign: 'center', fontSize: 22, fontWeight: 'bold'}}>Moja Zastávka</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <Text style={{color: '#ECECEC', fontSize: 14, fontWeight: 'bold', paddingRight: 5}}>Vyberte mesto</Text>
            <Image source={city} />
          </View>
        </View>
    </LinearGradient>
  );
}