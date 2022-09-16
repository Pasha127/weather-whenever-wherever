const initialState = {    
    query: "" ,
    currentLocation:{
        lat:"",
        long:""
    },
    thisLocationObj: {
        description:null,
        temp:null,
        temp_max:null,
        temps_min:null,
        humidity:null,
        speed:null,
        deg:null
    },
    locations: [],  
    favs: [] 
  };
const mainReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SEARCH":
        return {
          ...state,
          query: action.payload          
        };        
      case "CURRENT_LOCATION":
        return {
          ...state,
          currentLocation: {lat: action.payload.lat, long: action.payload.long}          
        };           
      case "THIS_LOCATION_OBJ":        
        return {
          ...state,
          thisLocationObj:{
            description:action.payload.description,
            temp:action.payload.temp,
            temp_max:action.payload.temp_max,
            temp_min:action.payload.temp_min,
            humidity:action.payload.humidity,
            speed:action.payload.speed,
            deg:action.payload.deg
        }        
        };           
      case "LOCATIONS":
        return {
          ...state,
          locations: [...state.locations, action.payload]          
        };           
      case "FAV+":          
          return {
            ...state,
            favs: [...state.favs, action.payload]
          };
      case "FAV-":
          return {
            ...state,
            favs: state.favs.filter((location) => location._id !== action.payload._id)
          };
        
      default:
        return state; 
    }
  };
export default mainReducer;