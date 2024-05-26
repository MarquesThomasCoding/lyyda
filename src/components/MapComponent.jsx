/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

// Fix pour les icônes Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});


const RecenterMap = ({ position }) => {
    const map = useMap();
    map.setView(position, 13);
    return null;
};

const MapComponent = ({ address }) => {
  const [position, setPosition] = useState([0, 0]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
          params: {
            q: address,
            format: 'json',
            addressdetails: 1,
            limit: 1,
          },
        });

        if (response.data.length === 0) {
          setError('Adresse introuvable');
          return;
        }

        const { lat, lon } = response.data[0];
        const newPosition = [parseFloat(lat), parseFloat(lon)];
        setPosition(newPosition);
        setError(null);
      } catch (error) {
        setError('Erreur lors de la recherche de l\'adresse');
      }
    };

    if (address) {
      fetchCoordinates();
    }
  }, [address]);

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <MapContainer center={position} zoom={13} style={{ borderRadius: "10px", margin: "auto", height: "300px", width: "50%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>{address}</Popup>
        </Marker>
        <RecenterMap position={position} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;