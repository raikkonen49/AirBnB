import React, { useEffect, useState, useRef } from 'react';
import { Loader } from "@googlemaps/js-api-loader";

const MapComponent = ({ address }) => {
  const [map, setMap] = useState(null);
  const [google, setGoogle] = useState(null);
  const [location, setLocation] = useState(null);
  const mapRef = useRef(null);

  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const defaultCenter = {
    lat: 40.712776,
    lng: -74.005974
  };

  useEffect(() => {
    if (!address) return; // Проверяем наличие адреса перед загрузкой карты

    const loader = new Loader({
      apiKey: "AIzaSyB4IU2XGu1tSfdhOqaLsZTeTQPm3RL7HAw", // Замените на ваш реальный API ключ
      version: "weekly",
    });

    loader.load().then(() => {
      setGoogle(window.google);
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: defaultCenter,
        zoom: 13,
      });
      setMap(mapInstance);

      geocodeAddress(address, window.google, mapInstance);
    });

  }, [address]);

  const geocodeAddress = (address, google, map) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === 'OK') {
        const location = results[0].geometry.location;
        setLocation(location);
        map.setCenter(location);

        const infoWindow = new google.maps.InfoWindow({
          content: 'Your Location',
        });

        const marker = new google.maps.Marker({
          map: map,
          position: location,
          title: 'Your Location',
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      } else {
        console.error('Geocode was not successful for the following reason: ' + status);
      }
    });
  };

  return (
    <div ref={mapRef} id="map" style={mapStyles}></div>
  );
};

export default MapComponent;