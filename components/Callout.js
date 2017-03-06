import React from 'react';
import {
  View,
  Image,
  Text
} from 'react-native';
import { Callout } from 'react-native-maps';
import bus from '../assets/bus.png';
import tram from '../assets/tram.png';
import finish from '../assets/finish.png';
import start from '../assets/start.png';
import geo from '../assets/geo.png';

export default (props) => {

  let icon = null;

  switch (props.type) {
    case 'TRAM':
      icon = tram;
      break;
    case 'BUS':
      icon = bus;
      break;
    case 'GEO':
      icon = geo;
      break;
    case 'START':
      icon = start;
      break;
    case 'FINISH':
      icon = finish;
      break;
  }

  return (
    <Callout style={{flex: 1, position: 'relative'}}>
      <View
        style={{flexDirection: 'row', flex: 1}}>
          <View style={{justifyContent: 'center'}}>
            <Image source={icon} />
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text style={{fontWeight: 'bold', paddingLeft: 7}} numberOfLines={1}>{props.name}</Text>
            <Text style={{fontSize: 12, paddingLeft: 7}}>{props.descriptionText}</Text>
          </View>
      </View>
    </Callout>
  );
};