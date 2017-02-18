import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default () => {
  
  return (
    <View style={
      {
        flex: 1, 
        backgroundColor: '#f64747', 
        alignSelf: 'stretch'
      }
    }>
        <Text style={{color: '#ECECEC', fontSize: 22, textAlign: 'center', marginTop: 20, fontWeight: 'bold'}}>
          Moja Zastávka
        </Text>
    </View>
  );
}