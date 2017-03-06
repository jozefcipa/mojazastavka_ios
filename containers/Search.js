import React, { Component } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import Constants from '../Constants';
import API from '../api';
import { 
  userLocationLoaded,
  userPositionLoaded, 
  foundStops, 
  startLocationInputChanged,
  destinationLocationInputChanged,
  showLoading
} from '../Actions';

import SearchInputs from '../components/SearchInputs';

class Search extends Component {
  constructor(props) {
    super(props);

    this.geolocate();

    // load user position every 20 seconds
    setInterval(() => this.geolocate(false), 20000);
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
    return (
      <SearchInputs 
        {...this.props}
        searchStops = {
          () => {
            this.props.showLoading(true, 'Hľadám zastávky');

            API.searchStops(
              {
                start: {
                  name: this.props.startLocation,
                  latitude: this.props.geolocatedLocationGeo.latitude, 
                  longitude: this.props.geolocatedLocationGeo.longitude
                }, 
                destination: {
                  name: this.props.destinationLocation,
                  latitude: null,
                  longitude: null
                }
              }
            ) 
            .then( data => {
              if(data.nearbyStops.length < 1 || data.destinationStops.length < 1){
                Alert.alert('Ops!', 'Nenašli sa žiadne zastávky.');
              }else{
                this.props.foundStops(data);
              }
              this.props.showLoading(false);
            })
            .catch( err => {
              Alert.alert('Ops!', err);
              this.props.showLoading(false);
            });
          }
        }
      />
    );
  }
}

const mapStateToProps = state => {

  return {
    startLocation: state.startLocation,
    destinationLocation: state.destinationLocation,

    geolocatedAddress: state.geolocatedAddress,

    geolocatedLocationGeo: state.geolocatedLocationGeo,
    startLocationGeo: state.startLocationGeo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userPositionLoaded: (position)          => dispatch(userPositionLoaded(position)),
    userLocationLoaded: (location)          => dispatch(userLocationLoaded(location)),
    foundStops:         (stops)             => dispatch(foundStops(stops)),
    showLoading:        (show, text, type)  => dispatch(showLoading(show, text, type)),

    //value change listeners
    startLocationChanged:       (text) => dispatch(startLocationInputChanged(text)),
    destinationLocationChanged: (text) => dispatch(destinationLocationInputChanged(text)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);