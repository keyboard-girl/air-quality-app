import * as React from 'react';
import Map, {NavigationControl} from 'react-map-gl';
import { Marker } from 'react-map-gl';
import Navbar from './components/navbar.js';
import maplibregl from 'maplibre-gl';
import { useState } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import './App.css';

function App() {

  const api_key="gbarpIC0LFulru5JPzI6"; //Sarah's key

  const [userLocation, setUserLocation] = useState(null);
  
  const [error, setError] = useState(null);
  
  const geolocationOptions = {
    enableHighAccuracy: true,     // GPS en lugar de WiFi
    timeout: 10000,               // tiempo espera
    maximumAge: 60000             // tiempo cache
  };


  const getLocation = () => {

    //errors handler
    if (!navigator.geolocation) {
      setError('Geolocalización no soportada');
      return;
    }

    //permissions
    navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          setError('Error obteniendo ubicación: ' + error.message);
        },
        geolocationOptions
      );
  };


  return (
    <div className="App">
      <Navbar/>
      <button onClick={getLocation}>
        Obtener mi ubicación
      </button>

      {error && <div style={{ color: 'red' }}>{error}</div>}
     {userLocation && (

      <Map mapLib={maplibregl} 
        initialViewState={{
          longitude: userLocation.lng,
          latitude: userLocation.lat,
          zoom: 17
        }}
        style={{width: "100%", height: " calc(100vh - 77px)"}}
        mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${api_key}`}
      >
        <NavigationControl position="top-left" />
        
        <Marker
          longitude={userLocation.lng}
          latitude={userLocation.lat}
          color="red"
        />

      </Map>
      )}
    </div>
  );
  }

export default App;
