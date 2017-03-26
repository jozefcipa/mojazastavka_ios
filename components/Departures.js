import React, { Component } from 'react';
import Constants from '../Constants';
import { 
  ScrollView, 
  View, 
  Text, 
  StyleSheet, 
  TouchableWithoutFeedback, 
  TouchableOpacity,
  DatePickerIOS,
  Image,
  Dimensions,
  TextInput,
  StatusBar
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import dot from '../assets/dot.png';
import loading from '../assets/loader.gif';
import DeparturesRow from './DeparturesRow';
import {formatTime} from '../helpers';

export default (props) => {  

  if(props.showMenu === Constants.DEPARTURES_MENU.HIDDEN)
    return <View/>;

  const isSelectedStartStop = props.departuresSelectedStopInput == Constants.DEPARTURES.SELECTED_START_STOP_INPUT;

  return (
    <TouchableWithoutFeedback>
      <View style={[styles.wrap, {height: props.showMenu}]}>
        <Text 
          style={styles.title}
          onPress={() => {

            if(props.showMenu === Constants.DEPARTURES_MENU.ENABLED){
              props.showDeparturesMenu(Constants.DEPARTURES_MENU.SEARCH);
            }
            else if(props.showMenu === Constants.DEPARTURES_MENU.SEARCH){
              props.showDeparturesMenu(Constants.DEPARTURES_MENU.ENABLED);
            }
            else if(props.showMenu === Constants.DEPARTURES_MENU.RESULTS){
              props.showDeparturesMenu(Constants.DEPARTURES_MENU.SEARCH);
            }
          }}>
          Najbližšie odchody
        </Text>
            { 
              props.showMenu !== Constants.DEPARTURES_MENU.HIDDEN && props.showMenu !== Constants.DEPARTURES_MENU.ENABLED? 
                <View style={{width: Dimensions.get('window').width - 30}}>
                  <Text style={styles.description}>Zvoľte typ zastávky a vyberte zastávku z mapy.</Text>
                  <View style={styles.searchContainer}>
                    <TouchableWithoutFeedback onPress={() => props.changeDeparturesSelectedStop(Constants.DEPARTURES.SELECTED_START_STOP_INPUT)}>
                      <View style={styles.row}>
                        <View style={styles.flexRow}>
                          <Image source={isSelectedStartStop ? dot : null} style={styles.img}/>
                          <Text style={styles.subtitle}>Zo zastávky</Text>
                        </View>
                        <TextInput
                          style={styles.input}
                          editable={false}
                          value={props.departuresStartStop}
                        />
                      </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => props.changeDeparturesSelectedStop(Constants.DEPARTURES.SELECTED_DESTINATION_STOP_INPUT)}>
                      <View style={styles.row}>
                        <View style={styles.flexRow}>
                          <Image source={!isSelectedStartStop ? dot : null} style={styles.img}/>
                          <Text style={styles.subtitle}>Na zastávku</Text>
                        </View>
                        <TextInput
                          style={styles.input}
                          editable={false}
                          value={props.departuresDestinationStop}
                        />
                      </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => props.showDeparturesTimeModal(true)}>
                      <View style={styles.row}>
                        <TextInput
                          style={[styles.input, styles.timeInput]}
                          editable={false}
                          value={formatTime(props.departuresTime)}
                        />
                      </View>
                    </TouchableWithoutFeedback>
                    <DateTimePicker
                      isVisible={props.isTimeModalShowed}
                      onConfirm={(time) => {
                        props.setDeparturesTime(time);
                        props.showDeparturesTimeModal(false);
                      }}
                      onCancel={() => props.showDeparturesTimeModal(false)}
                      titleIOS={'Zvoľte čas odchodu'}
                      confirmTextIOS={'Vybrať'}
                      cancelTextIOS={'Zrušiť'}
                      mode={'datetime'}
                    />
                    <TouchableOpacity 
                      style={styles.search} 
                      onPress={props.searchDepartures}
                      activeOpacity={0.6}>
                        <Text style={{textAlign: 'center', fontSize: 18, color: '#fff'}}>Zobraziť odchody</Text>
                    </TouchableOpacity>
                  </View>

                  {

                    props.showMenu === Constants.DEPARTURES_MENU.RESULTS ?
                      <View style={styles.departuresContainer}>

                        { 
                          props.departures.length > 0 ? 
                            <ScrollView>
                              {
                                props.departures.map((departureRow, i) => <DeparturesRow key={i} data={departureRow}/>)
                              }
                            </ScrollView>

                          :
                            <View style={styles.loading}>
                              <Image source={loading} />
                              <StatusBar networkActivityIndicatorVisible={true} />
                              <Text style={{marginTop: 10}}>Hľadám odchody...</Text>
                            </View>
                        }
                      </View>
                    :
                      null
                  }
                </View>
              :
                null
            }
        </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    padding: 3,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderColor: '#eee',
    borderWidth: 1,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 10,
  },

  row: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 3
  },

  flexRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  title: {
    fontSize: 20,
    color: '#141414',
    textAlign: 'center',
    padding: 3,
    position: 'relative',
  },

  description: {
    fontSize: 11,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 10
  },

  img: {
    width: 7,
    height: 7,
    marginRight: 5
  },

  subtitle: {
    fontSize: 14
  },

  searchContainer: {
    padding: 3,
  },

  departuresContainer: {
    marginTop: 10,
    padding: 3,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center'
  },

  search: {
    backgroundColor: '#f64747',
    padding: 10,
    borderRadius: 5,
  },

  input: {
    fontSize: 14,
    borderColor: '#ccc',
    borderRadius: 5,
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    color: 'gray',
    marginVertical: 2,
    width: Dimensions.get('window').width * 0.5
  },

  timeInput:{
    textAlign: 'center',
    flex: 1
  },

  loading: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  }
});