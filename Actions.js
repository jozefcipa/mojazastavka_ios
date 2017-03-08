import {actionTypes} from './ActionTypes';
import Constants from './Constants';

export function userLocationLoaded(location) {
  return {
    type: actionTypes.USER_LOCATION_LOADED,
    data: location
  };
}

export function userPositionLoaded(address){
  return {
    type: actionTypes.USER_POSITION_LOADED,
    data: address
  };
}

export function foundStops(stops) {
  return {
    type: actionTypes.FOUND_STOPS,
    data: stops
  };
}

export function startLocationInputChanged(value) {
  return {
    type: actionTypes.START_LOCATION_INPUT_CHANGED,
    data: value
  };
}

export function destinationLocationInputChanged(value) {
  return {
    type: actionTypes.DESTINATION_LOCATION_INPUT_CHANGED,
    data: value
  };
}

export function showLoading(show, text = '', type=Constants.LOADING_FULL) {
  return {
    type: actionTypes.SHOW_LOADING,
    data: {show, text, type}
  };
}

export function citiesLoaded(cities) {
  return {
    type: actionTypes.CITIES_LOADED,
    data: cities
  };
}

export function selectCity(cityId) {
  return {
    type: actionTypes.SELECT_CITY,
    data: cityId
  };
}

export function showCitiesModal(show) {
  return {
    type: actionTypes.SHOW_CITIES_MODAL,
    data: show
  };
}

export function swapSearchValues(){
  return {
    type: actionTypes.SWAP_SEARCH_VALUES
  }
}