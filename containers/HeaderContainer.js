import React, { Component } from 'react';
import { Alert, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Constants from '../Constants';
import API from '../api';
import { 
  selectCity, 
  citiesLoaded, 
  showLoading,
  showCitiesModal,
  userLocationLoaded,
  userPositionLoaded,
  firstGeolocationDone
} from '../Actions';
import Header from '../components/Header';

class HeaderContainer extends Component {
  constructor(props) {
    super(props);

    //geolocation
    navigator.geolocation.watchPosition(position => this.geolocate(position), 
      err => this.props.showLoading(false),
      Constants.GEOLOCATION_PROPERTIES);

    //loads available cities from server
    // this.props.showLoading(true, 'Načítavam zoznam miest');

    API.loadCities()
      .then(data => this.props.citiesLoaded(data.cities))
      .catch(err => Alert.alert('Ops!', err))
      .then(() => {
        this.props.showLoading(false);

        //show cities modal, if user hasn't chose his city yet
        AsyncStorage.getItem(Constants.SELECTED_CITY, (err, city) => {
          if(city != null){
            this.props.selectCity(JSON.parse(city));
          }
          else{
            this.props.showCitiesModal(true);
          }
        });
      });
  }

  geolocate(position){

    const location = {latitude: position.coords.latitude, longitude: position.coords.longitude};

    //if position hasn't changed, just return
    if(location.latitude === this.props.geolocatedLocationGeo.latitude){
        return;
    }

    let firstGeolocationDone = this.props.geolocatedAddress !== '';

    //show loading dialog only during first geolocation, when app launches
    if(firstGeolocationDone)
      this.props.showLoading(true, '', Constants.LOADING_INDICATOR);
    else
      this.props.showLoading(true, 'Lokalizujem Vašu polohu');

    //save coords
    this.props.userLocationLoaded(location);

    //retrieve address by coords from Google API
    API.geolocateUser(location)
      .then( res => {

          const geolocated = res.results[0]; //parse first result

          this.props.userPositionLoaded(geolocated.formatted_address);

          // if this was first time when user's position was loaded, notify reducer about it
          // after next geolocations map won't be centered(only after application start)
          if(! firstGeolocationDone){
            this.props.firstGeolocationDone();
          }

          this.props.showLoading(false);
      })
      .catch(err => this.props.showLoading(false));
  }

  render() {
    return <Header 
      {...this.props} 
      changeCity={(city) => {

        //save city
        this.props.selectCity(city);
        AsyncStorage.setItem(Constants.SELECTED_CITY, JSON.stringify(city));

        //hide modal
        this.props.showCitiesModal(false);
      }
    }/>;
  }
}

const mapStateToProps = state => {

  return {
    cities: state.cities,
    selectedCity: state.selectedCity,
    citiesModalVisible: state.citiesModalVisible,
    geolocatedLocationGeo: state.geolocatedLocationGeo,
    geolocatedAddress: state.geolocatedAddress
  };
};

const mapDispatchToProps = dispatch => {
  return {
    citiesLoaded: (cities)           => dispatch(citiesLoaded(cities)),
    selectCity:   (city)             => dispatch(selectCity(city)),
    showLoading:  (show, text, type) => dispatch(showLoading(show, text, type)),
    showCitiesModal: (show)          => dispatch(showCitiesModal(show)),

    userPositionLoaded: (position)   => dispatch(userPositionLoaded(position)),
    userLocationLoaded: (location)   => dispatch(userLocationLoaded(location)),
    firstGeolocationDone: ()         => dispatch(firstGeolocationDone()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);