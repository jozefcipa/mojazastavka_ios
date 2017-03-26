import React from 'react';
import {
  View,
  Image,
  Text,
  Dimensions
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
    <Callout style={{width: Dimensions.get('window').width}}>
      <View
        style={{flexDirection: 'row', flex: 1}}>
          <View style={{justifyContent: 'center'}}>
            <Image source={icon} />
          </View>
          <View style={{justifyContent: 'center', marginLeft: 5, flex: 1, marginRight: 30}}>
            <Text style={{fontWeight: 'bold'}} numberOfLines={1}>{props.name}</Text>
            {
              props.link_numbers != undefined && props.link_numbers != null ?
                <View style={{flexDirection: 'row', marginTop: 3}}>
                  <Text style={{fontWeight: 'bold', fontSize: 10, color: 'gray', paddingRight: 5}}>Čísla liniek:</Text>
                  <Text style={{fontSize: 10, color: 'gray', flexWrap: 'wrap', flex: 1,}}>
                    {props.link_numbers}
                  </Text>
                </View>
                  :
                null
            }
            <Text style={{fontSize: 12, marginTop: 5}}>{props.descriptionText}</Text>
          </View>
      </View>
    </Callout>
  );
};