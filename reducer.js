import {actionTypes} from './ActionTypes';

const store = {

	// strings from inputs
	startLocation: '',
	destinationLocation: '', 

	//from Google api
	geolocatedAddress: '',

	//start user position, geolocated from input
	startLocationGeo: {
		latitude: 0,
		longitude: 0
	},

	//destination position, geolocated from input
	destinationLocationGeo: {
		latitude: 0,
		longitude: 0
	},

	//geolocated position
	geolocatedLocationGeo: {
		latitude: 0,
		longitude: 0
	},

	//found stops in nearby of destination
	destinationStops: [],

	//found stops in user's nearby
	nearbyStops: [],

	//from which stop is highlighted route on map for destination stop
	selectedDestinationStop: {
		latitude: 0,
		longitude: 0
	},

	//from which stop is highlighted route on map for nearby stop
	selectedNearbyStop: {
		latitude: 0,
		longitude: 0
	},

	//loader
	showLoading: false,
	loadingText: '',
	loadingType: null,

	_mapBlocked: false
};

//reducer
export default (state = store, action) => {

  switch(action.type) {

    case actionTypes.USER_LOCATION_LOADED:
    	return {
	      	...state,
	      	_mapBlocked: false,
	      	geolocatedLocationGeo: {
	      		latitude: action.data.latitude,
	      		longitude: action.data.longitude
	      }  
	  	};
    	break;

    case actionTypes.USER_POSITION_LOADED:
    	return {
	      	...state,
	      	_mapBlocked: false,
	      	geolocatedAddress: action.data
      };
      break;
      
    case actionTypes.START_LOCATION_INPUT_CHANGED:
    	return {
	      	...state,
	      	_mapBlocked: true,
	      	startLocation: action.data
      };
      break;

    case actionTypes.DESTINATION_LOCATION_INPUT_CHANGED:
    	return {
	      	...state,
	      	_mapBlocked: true,
	      	destinationLocation: action.data
      };
      break;

    case actionTypes.SHOW_LOADING:

    	return {
	      	...state,
	      	_mapBlocked: false,
	      	showLoading: action.data.show,
	      	loadingText: action.data.text,
	      	loadingType: action.data.type
      };
      break;

    case actionTypes.FOUND_STOPS:

    	return {
	      	...state,
	      	_mapBlocked: false,
	      	destinationLocation: action.data.destinationName,
	      	destinationStops: action.data.destinationStops,
	      	nearbyStops: action.data.nearbyStops,
	      	destinationLocationGeo: action.data.destinationGeo,
	      	startLocationGeo: action.data.startGeo
      };
      break;
  }

  return state;
};