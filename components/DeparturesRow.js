import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native';
import busIcon from '../assets/bus.png';
import tramIcon from '../assets/tram.png';

export default ({data}) => {

  return (
    <TouchableOpacity style={styles.container}>
        {
            data.lines.map((line, i) => {

              return (

                <View key={i} style={styles.wrap}>

                  <View style={styles.left}>
                    <View style={styles.row}>
                      <Text style={styles.title}>Z: </Text>
                      <Text numberOfRows={2} style={styles.lineText}>{line.from}</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.title}>Na: </Text>
                      <Text numberOfRows={2} style={styles.lineText}>{line.to}</Text>
                    </View>
                  </View>

                  <View style={styles.right}>
                    <View style={styles.time}>
                      <Text style={styles.time}>{line.departure}</Text>
                      <Text style={styles.time}>{line.arrival}</Text>
                    </View>

                    <View style={styles.lineText}>
                      <Image style={{width: 20, height: 20}} source={line.vehicle === 'TRAM' ? tramIcon : busIcon} />
                      <Text style={{paddingLeft: 3}}>{line.linkNumber}</Text>
                    </View>
                  </View>

                </View>
              )
            })
        }
      <Text style={styles.totalTime}>Celkový čas: {data.duration}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  container: {
    padding: 5,
    marginVertical: 5,
    borderRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f7f7f7'
  },

  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  title: {
    fontWeight: 'bold'
  },

  left: {
    width: Dimensions.get('window').width * 0.5,
  },

  right: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  time: {
    padding: 3
  },

  lineText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3
  },

  totalTime: {
    fontSize: 12,
    color: 'gray',
    margin: 5
  }

});