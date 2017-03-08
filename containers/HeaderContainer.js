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
} from '../Actions';
import Header from '../components/Header';

class HeaderContainer extends Component {
  constructor(props) {
    super(props);

    //geolocation
    this.geolocate();

    // refresh user position every 20 seconds
    // TODO turn on on commit
    // setInterval(() => this.geolocate(false), 20000);

    //loads available cities from server
    this.props.showLoading(true, 'Načítavam zoznam miest');

    API.loadCities()
      .then(data => this.props.citiesLoaded(data.cities))
      .catch(err => Alert.alert('Ops!', 'Nepodarilo sa načítať zoznam miest.'))
      .then(() => {
        this.props.showLoading(false);

        //show cities modal, if user hasn't chose his city yet
        AsyncStorage.getItem('SELECTED_CITY', (err, city) => {
          if(city != null)
            this.props.selectCity(JSON.parse(city));
          else
            this.props.showCitiesModal(true);
        });
      });
  }

  geolocate(showLoadingBar = true){
    navigator.geolocation.getCurrentPosition( position => {

        const location = {latitude: position.coords.latitude, longitude: position.coords.longitude};

        //if position hasn't changed, just return
        if(location.latitude.toFixed(3) === this.props.startLocationGeo.latitude.toFixed(3) &&
            location.longitude.toFixed(3) === this.props.startLocationGeo.longitude.toFixed(3)){
            return;
        }

        if(showLoadingBar)
          this.props.showLoading(true, 'Lokalizujem Vašu polohu');
        else
          this.props.showLoading(true, '', Constants.LOADING_INDICATOR);

        //save coords
        this.props.userLocationLoaded(location);

        //retrieve address by coords from Google API
        API.geolocateUser(location)
          .then( res => {

              const geolocated = res.results[0]; //parse first result

              this.props.userPositionLoaded(geolocated.formatted_address);

              this.props.showLoading(false);
          })
          .catch(err => this.props.showLoading(false));
      }, 
      err => this.props.showLoading(false),
      Constants.GEOLOCATION_PROPERTIES
     );
  }

  render() {
    return <Header {...this.props}/>;
  }
}

const mapStateToProps = state => {

  return {
    cities: state.cities,
    selectedCity: state.selectedCity,
    citiesModalVisible: state.citiesModalVisible,
    startLocationGeo: state.startLocationGeo,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);