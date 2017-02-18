import React, { Component } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import Constants from '../Constants';
import API from '../api';
import { 
  userLocationLoaded,
  userPositionLoaded, 
  foundStops, 
  currentLocationInputChanged,
  destinationLocationInputChanged,
  showLoading
} from '../Actions';

import SearchInputs from '../components/SearchInputs';

class Search extends Component {
  constructor(props) {
    super(props);

    // load user position
    navigator.geolocation.getCurrentPosition( position => {

        this.props.showLoading(true, 'Lokalizujem Vašu polohu');

        const location = {latitude: position.coords.latitude, longitude: position.coords.longitude};

        //save coords
        this.props.userLocationLoaded(location);

        //retrieve address by coords from Google API
        API.geolocateUser(location)
          .then( res => {

              const geolocated = res.results[0]; //parse first result

              this.props.userPositionLoaded({
                address: geolocated.formatted_address,
                latitude: geolocated.geometry.location.lat,
                longitude: geolocated.geometry.location.lng
              });

              this.props.showLoading(false);
          })
          .catch(err => {
            Alert.alert('Ops!', 'Nepodarilo sa získať Vašu polohu.');
            this.props.showLoading(false);
          });
      }, 
      err => {
        Alert.alert('Ops!', 'Nepodarilo sa získať Vašu polohu.');
        this.props.showLoading(false);
      },
      Constants.GEOLOCATION_PROPERTIES
    );
  }

  render() {
    return (
      <SearchInputs 
        {...this.props}
        searchStops = {
          () => {
            this.props.showLoading(true, 'Vyhľadávam zastávky');

            API.searchStops(
              {
                user_location: {
                  name: this.props.currentLocation,
                  latitude: this.props.currentLocationGeo.latitude, 
                  longitude: this.props.currentLocationGeo.longitude
                }, 
                destination: {
                  name: this.props.destinationLocation,
                  latitude: this.props.destinationLocationGeo.latitude, 
                  longitude: this.props.destinationLocationGeo.longitude
                }
              }
            ) 
            .then( data => {
              this.props.foundStops(data);
              this.props.showLoading(false);
            })
            .catch( err => {
              Alert.alert('Ops!', 'Nepodarilo sa nájsť zastávky.');
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
    currentLocation: state.current_location,
    destinationLocation: state.destination_location,
    geolocatedAddress: state.geolocated_address,
    currentLocationGeo: state.current_location_geo,
    destinationLocationGeo: state.destination_location_geo,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userPositionLoaded: (position)    => dispatch(userPositionLoaded(position)),
    userLocationLoaded: (location)    => dispatch(userLocationLoaded(location)),
    foundStops:         (stops)       => dispatch(foundStops(stops)),
    showLoading:        (show, text)  => dispatch(showLoading(show, text)),

    //value change listeners
    currentLocationChanged:     (text) => dispatch(currentLocationInputChanged(text)),
    destinationLocationChanged: (text) => dispatch(destinationLocationInputChanged(text)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);