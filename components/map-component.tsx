'use client'

import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Station } from '@/types'
import { Button } from './ui/button'

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Custom icons for different station statuses
const createCustomIcon = (status: Station['status']) => {
  const color = 
    status === 'online' ? '#10b981' : 
    status === 'in-use' ? '#3b82f6' : 
    '#ef4444'

  return new L.DivIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 10px;
      ">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      </div>
    `,
    className: 'custom-marker',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  })
}

interface MapComponentProps {
  stations: Station[]
  selectedStation: Station | null
  onStationSelect: (station: Station) => void
}

// Component to handle map view changes when selectedStation changes
function MapController({ selectedStation }: { selectedStation: Station | null }) {
  const map = useMap()

  useEffect(() => {
    if (selectedStation) {
      map.setView([selectedStation.lat, selectedStation.lng], 15, {
        animate: true,
        duration: 1
      })
    }
  }, [selectedStation, map])

  return null
}

export default function MapComponent({ stations, selectedStation, onStationSelect }: MapComponentProps) {
  const mapRef = useRef<L.Map>(null)

  // Default center (Ho Chi Minh City)
  const defaultCenter: [number, number] = [10.776, 106.700]

  return (
    <MapContainer
      center={defaultCenter}
      zoom={12}
      style={{ height: '100%', width: '100%' }}
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <MapController selectedStation={selectedStation} />

      {stations.map((station) => (
        <Marker
          key={station.id}
          position={[station.lat, station.lng]}
          icon={createCustomIcon(station.status)}
          eventHandlers={{
            click: () => {
              onStationSelect(station)
            },
          }}
        >
          <Popup>
            <div className="p-2 min-w-[200px]">
              <h3 className="font-semibold text-sm mb-2">{station.name}</h3>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className={
                    station.status === 'online' ? 'text-green-600' :
                    station.status === 'in-use' ? 'text-blue-600' :
                    'text-red-600'
                  }>
                    {station.status === 'online' ? 'Online' :
                     station.status === 'in-use' ? 'In Use' :
                     'Offline'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Available:</span>
                  <span>{station.available}/{station.totalPoints}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span>{station.lat.toFixed(4)}, {station.lng.toFixed(4)}</span>
                </div>
              </div>
              <Button 
                className="w-full mt-3 text-xs py-1 h-7"
                onClick={() => onStationSelect(station)}
              >
                View Details
              </Button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}