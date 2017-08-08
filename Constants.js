const Constants = {
    GAPI_KEY: 'AIzaSyC92I7iEK7wntF_kxDL01VzTluCmaGy5ps',

    // GOOGLE API CALLS
    GEOLOCATE_USER_URL: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=',

    // API CALLS - local
    // FIND_DEPARTURES: 'http://localhost:8000/api/v2/find/departures',
    // FIND_STOPS_URL: 'http://localhost:8000/api/v2/find/stops',
    // LOAD_CITIES_URL: 'http://localhost:8000/api/v2/cities',

    // API CALLS - live
    FIND_DEPARTURES: 'http://mojazastavka.jozefcipa.com/api/v2/find/departures',
    FIND_STOPS_URL: 'http://mojazastavka.jozefcipa.com/api/v2/find/stops',
    LOAD_CITIES_URL: 'http://mojazastavka.jozefcipa.com/api/v2/cities',

    STOPS_COUNT: 5,

    GEOLOCATION_PROPERTIES: {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    GEO: {
        EDGE_PADDING: {top: 40, right: 40, bottom: 40, left: 40},

        // Coords of the westernmost and easternmost point of Slovakia
        DEFAULT_COORDS: [
            {latitude: 48.3779435, longitude: 16.8486673}, // West - Zahorska Ves
            {latitude: 49.0478019, longitude: 22.5151043} // East - Nova Sedlica
        ],

        // used to zoom out map when the only point on map is user's location
        // zooms out map in radius 100 meters from user's location
        RADIUS_KM: 0.1
    },

    //loader types
    LOADING_FULL: 'LOADING_FULL', // loading view and network activity indicator
    LOADING_INDICATOR: 'LOADING_INDICATOR', //network activity indicator
    LOADING_VIEW: 'LOADING_VIEW', //loading view

    // direction types
    NEARBY_DIRECTION: 'NEARBY_DIRECTION',
    DESTINATION_DIRECTION: 'DESTINATION_DIRECTION',

    //AsyncStorage keys
    SELECTED_CITY: 'SELECTED_CITY',

    //departures show menu types
    DEPARTURES_MENU: {
        HIDDEN: 0, //menu is not showing in app
        ENABLED: 50, //showed small view(Najblizsie odchody)
        SEARCH: 230, //showed bigger view, search form
        RESULTS: 350 // showed full menu, with search form and results
    },

    DEPARTURES: {
        SELECTED_START_STOP_INPUT: 'DEPARTURES.SELECTED_START_STOP_INPUT',
        SELECTED_DESTINATION_STOP_INPUT: 'DEPARTURES.SELECTED_DESTINATION_STOP_INPUT'
    }
};

export default Constants;