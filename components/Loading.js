import React from 'react';
import {View, Text, Image} from 'react-native';

export default (props) => {
  
    if (! props.show){
      return <View/>; // return empty view
    }

    return (
      <View style={
        {
          position: 'absolute', 
          top: 0,
          left: 0,
          bottom: 0,
          right:0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)', 
          alignItems: 'center',
          justifyContent: 'center'
        }}>

      <View style={
        {
          backgroundColor: 'white',
          borderRadius: 5,
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 30,
          paddingRight: 30,
          alignItems: 'center'
        }
      }>
          <Image source={require('../assets/loader.gif')} style={{marginBottom: 10}}/>
          <Text>{props.text || 'Načítava sa...' }</Text>
      </View>
    </View>
  );
}