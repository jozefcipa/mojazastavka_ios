import React, { Component } from 'react';
import { connect } from 'react-redux';

import Map from '../components/Map';

class MapContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Map {...this.props} />
    );
  }
}

const mapStateToProps = state => {
  return {
    showLoading: state.show_loading,
    currentLocation: state.current_location_geo,
    currentName: state.current_location || state.geolocated_address,
    destinationLocation: state.destination_location_geo,
    destinationName: state.destination_location,
    points: {
        nearby: state.nearby_stops,
        destination: state.destination_stops
      }
  };
};

export default connect(mapStateToProps)(MapContainer);