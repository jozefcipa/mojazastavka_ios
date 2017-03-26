import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import checked from '../assets/checked.png';

export default ({cities, selectedCity, changeCity}) => {

  return (
    <View style={styles.modalWrap}>
        <View style={styles.view}>
            <Text style={styles.title}>Vyberte mesto:</Text>
            <ScrollView style={{padding: 5}}>
              {
                cities.map( city => 
                  <TouchableOpacity opacity={0.7} style={styles.cityWrap} key={city.id} onPress={() => changeCity(city)}>
                    <Text style={styles.city}>
                      {city.name}
                    </Text>
                    <View style={styles.imgWrap}>
                      { city.id == selectedCity.id ? <Image source={checked}/> : null}
                    </View>
                  </TouchableOpacity>
                )
              }
            </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalWrap:{
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  view:{
    backgroundColor: 'white',
    height: 300,
    borderRadius: 5,
    padding: 20,
    width: Dimensions.get('window').width - 40 // 40 is margin
  },

  title:{
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: 10,
    textAlign: 'center',
  },

  cityWrap:{
    margin: 3,
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center'
  },

  imgWrap:{
    flex: 1
  },

  city:{
    fontSize: 15,
    margin: 2,
    flex: 4,
  }

});