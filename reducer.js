import {actionTypes} from './ActionTypes';

const store = {

	// strings from inputs
	current_location: '',
	destination_location: '', 

	//from Google api
	geolocated_address: '',

	//current user position
	current_location_geo: {
		latitude: 0,
		longitude: 0
	},

	//destination position
	destination_location_geo: {
		latitude: 0,
		longitude: 0
	},

	//found stops in nearby of destination
	destination_stops: [],

	//found stops in user's nearby
	nearby_stops: [],

	//from which stop is highlighted route on map for destination stop
	selected_destination_stop: {
		latitude: 0,
		longitude: 0
	},

	//from which stop is highlighted route on map for nearby stop
	selected_nearby_stop: {
		latitude: 0,
		longitude: 0
	},

	show_loading: false
};

const reducer = (state = store, action) => {

  switch(action.type) {

    case actionTypes.USER_LOCATION_LOADED:
    	return {
	      	...state,
	      	current_location_geo: {
	      		latitude: action.data.latitude,
	      		longitude: action.data.longitude
	      }  
	  	};
    	break;

    case actionTypes.USER_POSITION_LOADED:
    	return {
	      	...state,
	      	geolocated_address: action.data.address,
	      	current_location_geo: {
	      		latitude: action.data.latitude,
	      		longitude: action.data.longitude
	      }      
      };
      break;
      
    case actionTypes.CURRENT_LOCATION_INPUT_CHANGED:
    	return {
	      	...state,
	      	current_location: action.data
      };
      break;

    case actionTypes.DESTINATION_LOCATION_INPUT_CHANGED:
    	return {
	      	...state,
	      	destination_location: action.data
      };
      break;

    case actionTypes.SHOW_LOADING:
    	return {
	      	...state,
	      	show_loading: action.data
      };
      break;

    case actionTypes.FOUND_STOPS:

    	return {
	      	...state,
	      	destination_location: action.data.destination_name,
	      	destination_stops: action.data.destination_stops,
	      	nearby_stops: action.data.nearby_stops,
	      	destination_location_geo: action.data.destination
      };
      break;
  }

  return state;
}

export default reducer;