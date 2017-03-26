import React, { Component } from 'react';
import {Alert} from 'react-native';
import { connect } from 'react-redux';
import {
  showDeparturesMenu,
  setDeparturesStartStop,
  setDeparturesDestinationStop,
  setDeparturesTime,
  showDeparturesTimeModal,
  setDepartures,
  changeDeparturesSelectedStop
} from '../Actions';
import Constants from '../Constants';
import {
  validateDeparturesInputs,
  formatTime
} from '../helpers';
import { searchDepartures } from '../api';
import Departures from '../components/Departures';

class DeparturesContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Departures 
        {...this.props}
        searchDepartures={() => {

          if(! validateDeparturesInputs(this.props.departuresStartStop, this.props.departuresDestinationStop)){
            return false;
          }

          //reset array
          this.props.setDepartures([]);

          //show results menu window
          this.props.showDeparturesMenu(Constants.DEPARTURES_MENU.RESULTS);

          searchDepartures({
            start: this.props.departuresStartStop,
            destination: this.props.departuresDestinationStop,
            city: this.props.city,
            time: formatTime(this.props.departuresTime)
          })
            .then((departures) => this.props.setDepartures(departures.departures))
            .catch(err => {
              Alert.alert('Ops!', err); 
              this.props.showDeparturesMenu(Constants.DEPARTURES_MENU.SEARCH);
            });
        }}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    showMenu: state.showDeparturesMenu,
    departuresStartStop: state.departuresStartStop,
    departuresDestinationStop: state.departuresDestinationStop,
    city: state.selectedCity.name_escaped,
    departuresTime: state.departuresTime,
    departuresSelectedStopInput: state.departuresSelectedStopInput,
    departures: state.departures,
    isTimeModalShowed: state.showDeparturesTimeModal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showDeparturesMenu: (showType) => dispatch(showDeparturesMenu(showType)),
    showDeparturesTimeModal: (show) => dispatch(showDeparturesTimeModal(show)),
    setDeparturesStartStop: (selectedStop) => dispatch(setDeparturesStartStop(selectedStop)),
    setDeparturesDestinationStop: (selectedStop) => dispatch(setDeparturesDestinationStop(selectedStop)),
    setDeparturesTime: (time) => dispatch(setDeparturesTime(time)),
    setDepartures: (departures) => dispatch(setDepartures(departures)),
    changeDeparturesSelectedStop: (selectedStop) => dispatch(changeDeparturesSelectedStop(selectedStop)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeparturesContainer);