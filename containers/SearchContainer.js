import React, { Component } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import Constants from '../Constants';
import API from '../api';
import { 
  foundStops, 
  startLocationInputChanged,
  destinationLocationInputChanged,
  showLoading,
  swapSearchValues,
} from '../Actions';

import Search from '../components/Search';

class SearchContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Search 
        {...this.props}
        searchStops = {
          () => {
            this.props.showLoading(true, 'Hľadám zastávky');

            API.searchStops({
                start: {
                  name: this.props.startLocation,
                  latitude: this.props.geolocatedLocationGeo.latitude, 
                  longitude: this.props.geolocatedLocationGeo.longitude
                }, 
                destination: {
                  name: this.props.destinationLocation,
                  latitude: null,
                  longitude: null
                },
                city: this.props.selectedCity.name
              }
            ) 
            .then( data => {
              if(data.nearbyStops.length < 1 || data.destinationStops.length < 1)
                Alert.alert('Ops!', 'Nenašli sa žiadne zastávky.');
              else
                this.props.foundStops(data);
            })
            .catch( err => Alert.alert('Ops!', err))
            .then(() => this.props.showLoading(false));
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
    startLocationGeo: state.startLocationGeo,

    selectedCity: state.selectedCity,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    foundStops:  (stops)             => dispatch(foundStops(stops)),
    showLoading: (show, text, type)  => dispatch(showLoading(show, text, type)),

    //value change listeners
    startLocationChanged:       (text) => dispatch(startLocationInputChanged(text)),
    destinationLocationChanged: (text) => dispatch(destinationLocationInputChanged(text)),

    swapSearchValues: () => dispatch(swapSearchValues()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);