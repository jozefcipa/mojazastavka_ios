import React, { Component } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import Constants from '../Constants';
import API from '../api';
import { 
  userPositionLoaded, 
  userGeolocated, 
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

        const location = {lat: position.coords.latitude, lng: position.coords.longitude};

        //save coords
        this.props.userPositionLoaded(location);

        //retrieve address by coords from Google API
        API.geolocateUser(location)
          .then( res => {

              const geolocated = res.results[0]; //parse first result

              this.props.userPositionLoaded({
                address: geolocated.formatted_address,
                lat: geolocated.geometry.location.lat,
                lng: geolocated.geometry.location.lng
              });
          })
          .catch(err => Alert.alert('Oops!', err));
      }, 
      err => console.log(err),
      Constants.GEOLOCATION_PROPERTIES
    );
  }

  render() {
    return (
      <SearchInputs 
        {...this.props}
        searchStops = {
          () => {
            // this.props.showLoading(true);

            API.searchStops(
              {
                user_location: {
                  name: this.props.currentLocation,
                  lat: this.props.currentLocationGeo.lat, 
                  lng: this.props.currentLocationGeo.lng
                }, 
                destination: {
                  name: this.props.destinationLocation,
                  lat: this.props.destinationLocationGeo.lat, 
                  lng: this.props.destinationLocationGeo.lng
                }
              }
            ) 
            .then( data => {
              this.props.foundStops(data);
              this.props.showLoading(false);
              console.log(data);
            })
            .catch( err =>  Alert.alert('Oops!', JSON.stringify(err)));
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
    userLocationLoaded: (location) => dispatch(userLocationLoaded(location)),
    userPositionLoaded: (position) => dispatch(userPositionLoaded(position)),
    foundStops:         (stops)    => dispatch(foundStops(stops)),
    showLoading:        (show)     => dispatch(showLoading(show)),

    //value change listeners
    currentLocationChanged:     (text) => dispatch(currentLocationInputChanged(text)),
    destinationLocationChanged: (text) => dispatch(destinationLocationInputChanged(text)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);