import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Truck, Flag, Home, Utensils, Fuel, Wrench, MapPin } from 'lucide-react';
import ReactDOMServer from 'react-dom/server';

const poiIconMap = {
  restaurant: Utensils,
  fuel: Fuel,
  mechanic: Wrench,
  rest_stop: MapPin,
};

const createLucideIcon = (LucideComponent, color, bgColor = 'rgba(17, 24, 39, 0.8)') => {
  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(ReactDOMServer.renderToString(
      <div style={{
        backgroundColor: bgColor,
        borderRadius: '50%',
        padding: '8px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: `2px solid ${color}`
      }}>
        <LucideComponent color={color} size={24} />
      </div>
    ))}`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
};

const truckIcon = createLucideIcon(Truck, '#34d399');
const originIcon = createLucideIcon(Home, '#60a5fa');
const destinationIcon = createLucideIcon(Flag, '#f87171');

const poiIcons = {
  restaurant: createLucideIcon(poiIconMap.restaurant, '#f97316', 'rgba(71, 29, 0, 0.8)'),
  fuel: createLucideIcon(poiIconMap.fuel, '#3b82f6', 'rgba(0, 25, 71, 0.8)'),
  mechanic: createLucideIcon(poiIconMap.mechanic, '#f59e0b', 'rgba(71, 45, 0, 0.8)'),
  rest_stop: createLucideIcon(poiIconMap.rest_stop, '#10b981', 'rgba(0, 50, 35, 0.8)'),
};

const TrackingMap = ({ origin, destination, currentPosition, pois = [] }) => {
  if (!origin || !destination) return null;

  const route = [
    [origin.lat, origin.lng],
    [destination.lat, destination.lng]
  ];

  return (
    <MapContainer center={currentPosition || origin} zoom={7} scrollWheelZoom={true} className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      <Marker position={[origin.lat, origin.lng]} icon={originIcon}>
        <Popup>Ponto de Partida</Popup>
      </Marker>
      <Marker position={[destination.lat, destination.lng]} icon={destinationIcon}>
        <Popup>Destino Final</Popup>
      </Marker>
      {currentPosition && (
        <Marker position={[currentPosition.lat, currentPosition.lng]} icon={truckIcon}>
          <Popup>Localização Atual</Popup>
        </Marker>
      )}
      <Polyline pathOptions={{ color: '#60a5fa', weight: 3, opacity: 0.7, dashArray: '5, 10' }} positions={route} />
      
      {pois.map(poi => (
        <Marker key={poi.id} position={[poi.coordinates.lat, poi.coordinates.lng]} icon={poiIcons[poi.type] || poiIcons.rest_stop}>
          <Popup>{poi.name} ({poi.rating})</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default TrackingMap;