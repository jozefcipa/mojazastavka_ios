import ActionTypes from './ActionTypes';
import Constants from './Constants';
import { calculateToleranceCoords } from './helpers';

//todo: refactor this reducer to map, search, modal 
const store = {

	// strings from inputs
	startLocation: '',
	destinationLocation: '', 

	//selected city
	selectedCity: {
		id: -1,
		name: '',
		name_escaped: ''
	},

	//available cities
	cities: [],

	//modal window to choose city
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

	//set to true after first app geolocation
	firstGeolocationDone: false,

	//found stops in nearby of destination
	destinationStops: [],

	//found stops in user's nearby
	nearbyStops: [],

	//array of latitude/longitude pairs
	//from which stop is highlighted route on map to destination stop
	destinationDirection: [],

	//from which stop is highlighted route on map to nearby stop
	nearbyDirection: [],

	//loader
	showLoading: false,
	loadingText: '',
	loadingType: null,

	//if this is set to true, map won't be updated(shouldComponentUpdate() will return false in component)
	_mapBlocked: false,

	mapCenterPoints: [...Constants.GEO.DEFAULT_COORDS],

	// departures
	showDeparturesMenu: Constants.DEPARTURES_MENU.HIDDEN, // by default menu is hidden, shows after found stops
	departuresStartStop: '',
	departuresDestinationStop: '',
	departuresSelectedStopInput: Constants.DEPARTURES.SELECTED_START_STOP_INPUT,
	departuresTime: Date.now(),
	showDeparturesTimeModal: false,
	departures: [{lines:[]},{lines:[]},{lines:[]},{lines:[]},{lines:[]},{lines:[]}, ],

};

//reducer
export default (state = store, action) => {

  switch(action.type){

  	case ActionTypes.FIRST_GEOLOCATION_DONE:
  		return{
  			...state,
  			firstGeolocationDone: true
  		};
  		break;

    case ActionTypes.USER_LOCATION_LOADED:

    	var geolocatedLocationGeo = {
      		latitude: action.data.latitude,
      		longitude: action.data.longitude
      	};

    	return {
	      	...state,
	      	_mapBlocked: false,
	      	geolocatedLocationGeo,
	      	mapCenterPoints: state.firstGeolocationDone ? state.mapCenterPoints : [
	      		geolocatedLocationGeo,
	      		...calculateToleranceCoords(geolocatedLocationGeo, Constants.GEO.RADIUS_KM)
	      	]
	  	};
    	break;

    case ActionTypes.USER_POSITION_LOADED:
    	return {
	      	...state,
	      	_mapBlocked: false,
	      	geolocatedAddress: action.data
      };
      break;
      
    case ActionTypes.START_LOCATION_INPUT_CHANGED:
    	return {
	      	...state,
	      	_mapBlocked: true,
	      	startLocation: action.data
      };
      break;

    case ActionTypes.DESTINATION_LOCATION_INPUT_CHANGED:
    	return {
	      	...state,
	      	_mapBlocked: true,
	      	destinationLocation: action.data
      };
      break;

    case ActionTypes.SHOW_LOADING:

    	return {
	      	...state,
	      	_mapBlocked: false,
	      	showLoading: action.data.show,
	      	loadingText: action.data.text,
	      	loadingType: action.data.type
      };
      break;

    case ActionTypes.FOUND_STOPS:

    	return {
	      	...state,
	      	_mapBlocked: false,
	      	destinationLocation: action.data.destinationName,
	      	destinationStops: action.data.destinationStops,
	      	nearbyStops: action.data.nearbyStops,
	      	destinationLocationGeo: action.data.destinationGeo,
	      	startLocationGeo: action.data.startGeo,

	      	mapCenterPoints: [
	      		...action.data.nearbyStops, 
		        ...action.data.destinationStops,
		        action.data.startGeo,
		        action.data.destinationGeo
	      	],

	      	//reset routes
	      	nearbyDirection: [],
	      	destinationDirection: [],

	      	//show departures menu
	      	showDeparturesMenu: Constants.DEPARTURES_MENU.ENABLED,
	      	departuresStartStop: '',
			departuresDestinationStop: '',
			departuresTime: Date.now(),
      };
      break;

    case ActionTypes.CITIES_LOADED:
    	return {
	      	...state,
	      	_mapBlocked: true,
	      	cities: action.data
	  	};
    	break;

    case ActionTypes.SELECT_CITY:
    	return {
	      	...state,
	      	_mapBlocked: true,
	      	selectedCity: action.data
	  	};
    	break;

    case ActionTypes.SHOW_CITIES_MODAL:
    	return {
	      	...state,
	      	_mapBlocked: true,
	      	citiesModalVisible: action.data
	  	};
    	break;

    case ActionTypes.SWAP_SEARCH_VALUES:
    	return {
	      	...state,
	      	_mapBlocked: true,
	      	startLocation: state.destinationLocation,
	      	destinationLocation: state.startLocation
	  	};
    	break;
    case ActionTypes.SHOW_DIRECTION:

    	if(action.data.type == Constants.NEARBY_DIRECTION){
    		return {
    			...state,
    			_mapBlocked: false,
    			nearbyDirection: action.data.directions,
    			mapCenterPoints: action.data.directions
    		}
    	}
    	else if(action.data.type == Constants.DESTINATION_DIRECTION){
    		return {
		      	...state,
		      	_mapBlocked: false,
		      	destinationDirection: action.data.directions,
		      	mapCenterPoints: action.data.directions
		  	};
    	}
    	break;

    case ActionTypes.SHOW_DEPARTURES_MENU:
    	return {
    		...state,
    		_mapBlocked: false,
    		showDeparturesMenu: action.data
    	};
    	break;

    case ActionTypes.SET_DEPARTURES_START_STOP:
    	return {
    		...state,
	      	_mapBlocked: false,
	      	departuresStartStop: action.data
    	};
    	break;
    case ActionTypes.SET_DEPARTURES_DESTINATION_STOP:
    	return{
    		...state,
	      	_mapBlocked: false,
	      	departuresDestinationStop: action.data
    	};
    	break;
    case ActionTypes.SET_DEPARTURES_TIME:
    	return{
    		...state,
	      	_mapBlocked: false,
	      	departuresTime: action.data
    	};
    	break;
    case ActionTypes.CHANGE_DEPARTURES_SELECTED_STOP:
    	return{
    		...state,
	      	_mapBlocked: false,
	      	departuresSelectedStopInput: action.data
    	};
    	break;
    case ActionTypes.FOUND_DEPARTURES:
    	return {
    		...state,
    		_mapBlocked: false,
    		departures: action.data
    	};
    	break;

    case ActionTypes.SHOW_TIME_MODAL:
    	return {
    		...state,
    		_mapBlocked: false,
    		showDeparturesTimeModal: action.data
    	};
    	break;
  }

  return state;
};