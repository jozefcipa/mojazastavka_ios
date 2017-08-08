import ActionTypes from "./ActionTypes";
import Constants from "./Constants";

export function firstGeolocationDone() {
    return {
        type: ActionTypes.FIRST_GEOLOCATION_DONE,
    };
}

export function userLocationLoaded(location) {
    return {
        type: ActionTypes.USER_LOCATION_LOADED,
        data: location
    };
}

export function userPositionLoaded(address) {
    return {
        type: ActionTypes.USER_POSITION_LOADED,
        data: address
    };
}

export function foundStops(stops) {
    return {
        type: ActionTypes.FOUND_STOPS,
        data: stops
    };
}

export function startLocationInputChanged(value) {
    return {
        type: ActionTypes.START_LOCATION_INPUT_CHANGED,
        data: value
    };
}

export function destinationLocationInputChanged(value) {
    return {
        type: ActionTypes.DESTINATION_LOCATION_INPUT_CHANGED,
        data: value
    };
}

export function showLoading(show, text = '', type = Constants.LOADING_FULL) {
    return {
        type: ActionTypes.SHOW_LOADING,
        data: {show, text, type}
    };
}

export function citiesLoaded(cities) {
    return {
        type: ActionTypes.CITIES_LOADED,
        data: cities
    };
}

export function selectCity(cityId) {
    return {
        type: ActionTypes.SELECT_CITY,
        data: cityId
    };
}

export function showCitiesModal(show) {
    return {
        type: ActionTypes.SHOW_CITIES_MODAL,
        data: show
    };
}

export function swapSearchValues() {
    return {
        type: ActionTypes.SWAP_SEARCH_VALUES
    };
}

export function showDirection(directions, type) {
    return {
        type: ActionTypes.SHOW_DIRECTION,
        data: {
            type,
            directions
        }
    };
}

export function showDeparturesMenu(type) {
    return {
        type: ActionTypes.SHOW_DEPARTURES_MENU,
        data: type
    };
}

export function setDeparturesStartStop(stopName) {
    return {
        type: ActionTypes.SET_DEPARTURES_START_STOP,
        data: stopName
    }
}
export function setDeparturesDestinationStop(stopName) {
    return {
        type: ActionTypes.SET_DEPARTURES_DESTINATION_STOP,
        data: stopName
    };
}

export function setDeparturesTime(time) {
    return {
        type: ActionTypes.SET_DEPARTURES_TIME,
        data: time
    };
}

export function setDepartures(departures) {
    return {
        type: ActionTypes.FOUND_DEPARTURES,
        data: departures
    };
}

export function changeDeparturesSelectedStop(stop) {
    return {
        type: ActionTypes.CHANGE_DEPARTURES_SELECTED_STOP,
        data: stop
    };
}

export function showDeparturesTimeModal(show) {
    return {
        type: ActionTypes.SHOW_TIME_MODAL,
        data: show
    };
}