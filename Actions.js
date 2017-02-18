import {actionTypes} from './ActionTypes';

export function userLocationLoaded(location) {
  return {
    type: actionTypes.USER_LOCATION_LOADED,
    data: location
  };
}

export function userPositionLoaded(position){
  return {
    type: actionTypes.USER_POSITION_LOADED,
    data: position
  };
}

export function foundStops(stops) {
  return {
    type: actionTypes.FOUND_STOPS,
    data: stops
  };
}

export function currentLocationInputChanged(value) {
  return {
    type: actionTypes.CURRENT_LOCATION_INPUT_CHANGED,
    data: value
  };
}

export function destinationLocationInputChanged(value) {
  return {
    type: actionTypes.DESTINATION_LOCATION_INPUT_CHANGED,
    data: value
  };
}

export function showLoading(show, text = '') {
  return {
    type: actionTypes.SHOW_LOADING,
    data: {show, text}
  };
}