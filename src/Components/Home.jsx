import { current } from '@reduxjs/toolkit';
import { Container, Row, Col, Form,Button } from 'react-bootstrap'
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

const mapStateToProps = state => {
    
    return {
    query: state.query ,
    currentLocation: state.currentLocation,
    locations: state.locations,  
    favs: state.faves,
    thisLocationObj : state.thisLocationObj
    
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setQuery: query => {
      dispatch({
        type: "SEARCH",
        payload: query,
      });
    },
    setCurrentLocation: currentLocation =>{
      dispatch({
        type:"CURRENT_LOCATION",
        payload: currentLocation
      })
    },

    setThisLocationObj: currentLocation =>{
      dispatch({
        type:"THIS_LOCATION_OBJ",
        payload: { description:currentLocation.weather[0].description,
            temp:currentLocation.main.temp,
            temp_max:currentLocation.main.temp_max,
            temp_min:currentLocation.main.temp_min,
            humidity:currentLocation.main.humidity,
            speed:currentLocation.wind.speed,
            deg:currentLocation.wind.deg
    }})
    },
    setLocations: currentLocation =>{
      dispatch({
        type:"LOCATIONS",
        payload: currentLocation
      })
    },
    setLocations: loc =>{
      dispatch({
        type:"FAV+",
        payload: loc
      })
    },
    setLocations: loc =>{
      dispatch({
        type:"FAV-",
        payload: loc
      })
    }
  };
};



const Home = (props) => {
    const getLocation =()=> {
        console.log("tried for location");
        return(navigator.geolocation?.getCurrentPosition((position)=>{
                console.log(position.coords.latitude, 
                    position.coords.longitude);
                    setTimeout(()=>{lati = position.coords.latitude;
                        longi= position.coords.longitude;},500)
                    
                    
                   }))
                }
    let lati=50.1002;
let longi = 14.5497;


const handleChange = (e) => {
    props.setQuery(e.target.value)
}

const handleSubmit = async (e) => {
    e.preventDefault()
      getLocation();
      props.setCurrentLocation( {lat:lati,long:longi})

    try {
        console.log(props.currentLocation.lat,props.currentLocation.long)
        /* const localCoordinates = {lat:lati,long:longi}  */
        
         /*  const endpoint = ``  */
          /* const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${props.currentLocation.lat}&lon=${props.currentLocation.long}&appid=dfcc2e4bdeeec0d20d50ec100bf89ffe`   */
          const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&appid=dfcc2e4bdeeec0d20d50ec100bf89ffe`  
      const response = await fetch(endpoint)
      if (response.ok) {
        const data  = await response.json()
        props.setThisLocationObj(data);
       console.log(data);
      } else {
        alert('Error fetching results')
      }
    } catch (error) {
      console.log(error)
    }finally{console.log(props.thisLocationObj)}
  }

  return (
    <Container>
      <Row>
        <Col xs={10} className="mx-auto my-3">
          <div className='d-flex flex-row align-items-center'>
          <h1 className='mr-auto'>WWW - Weather Whenever Wherever</h1>
          <Link to="/favs"><Button>See Favorites</Button></Link> 
          </div>
        </Col>
            {console.log(props.thisLocationObj.description)}
        {props.thisLocationObj && (<Col xs={10} className="mx-auto">
          <p>Your Local Weather:</p>
          <p>Sky: {props.thisLocationObj.description}</p>
          <p>Current Temp: {Math.floor(props.thisLocationObj.temp - 273.15)+"°C"}</p>
          <p>Max Temp: {Math.floor(props.thisLocationObj.temp_max -273.15)+"°C"}</p>
          <p>Min Temp: {Math.floor(props.thisLocationObj.temp_min -273.15)+"°C"}</p>
          <p>Humidity: {props.thisLocationObj.humidity + "%"}</p>
          <p>Wind Speed: {props.thisLocationObj.speed}</p>
          <p>Wind Direction: {props.thisLocationObj.deg+"°"}</p>
        </Col>)}
        <Col xs={10} className="mx-auto mb-5">
          {console.log(props.thisLocationObj)}
          <Button onClick={handleSubmit}>Get My Weather</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
