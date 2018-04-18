import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';
import api from './api';
/*
 *  state layout:
 *  {
 *   posts: [... Posts ...],
 *   users: [... Users ...],
 *   form: {
 *     user_id: null,
 *     body: "",
 *   }
 * }
 *
 * */

/*function posts(state = [], action) {
  return state;
}*/

//************************************************************
// This will have bydefault Northeastern Univeristy coodinate ,
// But Will be updated to coordinate of the current position of the 
// user... See function latitude and longitude
let coordinates = {"latitude": 42.3429381, "longitude": -71.0923845 }

function myMap(position){
      coordinates.latitude = position.coords.latitude;
      coordinates.longitude = position.coords.longitude;
      return coordinates;
    }
    
function latitude(){
      navigator.geolocation.getCurrentPosition(myMap)
      return coordinates.latitude;
    }

function longitude(){
      navigator.geolocation.getCurrentPosition(myMap)
      return coordinates.longitude;
    }


function token(state = null, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      sessionStorage.setItem('Token', JSON.stringify(action.token));
      return action.token;
    default:
      return JSON.parse(sessionStorage.getItem('Token'));;
  }
}

let empty_login = {
  email: "",
  password: "",
};

function login(state = empty_login, action) {
  switch (action.type) {
    case 'UPDATE_LOGIN_FORM':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

//************************************************************

function users(state = [], action) {
  switch (action.type) {
  case 'USERS_LIST':
  let lat = latitude();
  let lon = longitude();
  api.nearest_stops({"latitude": lat, "longitude": lon, "radius": 0.005})
    return [...action.users];
  default:
    return state;
  }
}

function stops_nearby(state = [], action) {
  switch (action.type) {
  case 'NEARBY_STOPS':
    return [...action.nearby_stops];
  default:
    return state;
  }
}

function allStops(state = [], action) {
  switch (action.type) {
  case 'STOPS_LIST':
    return [...action.allStops];
  default:
    return state;
  }
}

function bus_list(state = [], action) {
  switch (action.type) {
  case 'BUS_LIST':
    return [...action.buslist];
  default:
    return state;
  }
}

function error_msg(state = null, action) {
  switch (action.type) {
  case 'ERROR_MSG':
    return action.error_msg;
  default:
    return state;
  }
}

/*let empty_form = {
  user_id: "",
  body: "",
};*/

function form(state = [], action) {
  switch (action.type) {
    case 'UPDATE_FORM':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

function root_reducer(state0, action) {
  console.log("reducer", action);
  // {posts, users, form} is ES6 shorthand for
  // {posts: posts, users: users, form: form}
  let reducer = combineReducers({ users, form, token, login, stops_nearby, bus_list, latitude, longitude
    , allStops, error_msg});
  let state1 = reducer(state0, action);
  console.log("state1", state1);
  return deepFreeze(state1);
};


let store = createStore(root_reducer);
export default store;