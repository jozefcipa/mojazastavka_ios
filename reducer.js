import {actionTypes} from './ActionTypes';

const store = {

	// strings from inputs
	startLocation: '',
	destinationLocation: '', 

	//selected city
	//TODO THIS IS JUST TEMPORARY
	selectedCity: {
		id: -1,
		name: '',
		name_escaped: ''
	},

	//available cities
	cities: [],

	citiesModalVisible: false,
	
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

    case actionTypes.CITIES_LOADED:
    	return {
	      	...state,
	      	_mapBlocked: true,
	      	cities: action.data
	  	};
    	break;

    case actionTypes.SELECT_CITY:
    	return {
	      	...state,
	      	_mapBlocked: true,
	      	selectedCity: action.data
	  	};
    	break;

    case actionTypes.SHOW_CITIES_MODAL:
    	return {
	      	...state,
	      	_mapBlocked: true,
	      	citiesModalVisible: action.data
	  	};
    	break;

    case actionTypes.SWAP_SEARCH_VALUES:
    	return {
	      	...state,
	      	_mapBlocked: true,
	      	startLocation: state.destinationLocation,
	      	destinationLocation: state.startLocation
	  	};
    	break;
  }

  return state;
};