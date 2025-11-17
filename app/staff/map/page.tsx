'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { MapPin, Navigation, Zap, Maximize2 } from 'lucide-react'
import { Station } from '@/types'
import dynamic from 'next/dynamic'

// Dynamically import the map component to avoid SSR issues
const MapComponent = dynamic(() => import('@/components/map-component'), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] rounded-lg bg-muted flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p>Loading map...</p>
      </div>
    </div>
  )
})

const mockStations: Station[] = [
  { id: "ST-01", name: "Trạm EV Quận 1", lat: 10.776, lng: 106.700, available: 4, totalPoints: 6, status: "online" },
  { id: "ST-02", name: "Trạm EV Quận 7", lat: 10.728, lng: 106.721, available: 1, totalPoints: 4, status: "in-use" },
  { id: "ST-03", name: "Trạm EV Quận 2", lat: 10.787, lng: 106.750, available: 3, totalPoints: 4, status: "online" },
  { id: "ST-04", name: "Trạm EV Quận Bình Thạnh", lat: 10.801, lng: 106.714, available: 0, totalPoints: 3, status: "offline" },
  { id: "ST-05", name: "Trạm EV Quận Tân Bình", lat: 10.795, lng: 106.645, available: 2, totalPoints: 4, status: "online" },
  { id: "ST-06", name: "Trạm EV Quận 10", lat: 10.783, lng: 106.667, available: 5, totalPoints: 8, status: "online" },
  { id: "ST-07", name: "Trạm EV Quận Phú Nhuận", lat: 10.797, lng: 106.679, available: 1, totalPoints: 4, status: "in-use" },
  { id: "ST-08", name: "Trạm EV Quận Gò Vấp", lat: 10.839, lng: 106.671, available: 3, totalPoints: 5, status: "online" },
]

const statusMap = {
  'online': { label: 'Online', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
  'in-use': { label: 'In Use', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' },
  'offline': { label: 'Offline', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' },
}

export default function MapPage() {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleStationSelect = (station: Station) => {
    setSelectedStation(station)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Map View</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{mockStations.length} charging stations</span>
          </div>
          <Button variant="outline" size="sm" onClick={toggleFullscreen}>
            <Maximize2 className="h-4 w-4 mr-2" />
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </Button>
        </div>
      </div>

      <div className={`grid gap-6 ${isFullscreen ? '' : 'lg:grid-cols-4'}`}>
        {!isFullscreen && (
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Stations List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {mockStations.map((station) => (
                  <div
                    key={station.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      selectedStation?.id === station.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' : ''
                    }`}
                    onClick={() => handleStationSelect(station)}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-sm">{station.name}</h3>
                      <Badge className={statusMap[station.status].color}>
                        {statusMap[station.status].label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs">
                      <div className="flex items-center gap-1">
                        <Zap className="h-3 w-3 text-yellow-500" />
                        <span>{station.available}/{station.totalPoints} available</span>
                      </div>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {station.lat.toFixed(3)}, {station.lng.toFixed(3)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card className={isFullscreen ? '' : 'lg:col-span-3'}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Charging Stations Map</CardTitle>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Online</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span>In Use</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>Offline</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className={`rounded-lg overflow-hidden border ${isFullscreen ? 'h-[calc(100vh-200px)]' : 'h-[600px]'}`}>
              <MapComponent 
                stations={mockStations} 
                selectedStation={selectedStation}
                onStationSelect={handleStationSelect}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Station Details Dialog */}
      <Dialog open={!!selectedStation} onOpenChange={() => setSelectedStation(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Station Details</DialogTitle>
          </DialogHeader>
          {selectedStation && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Station ID</label>
                  <p className="font-medium">{selectedStation.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <div>
                    <Badge className={statusMap[selectedStation.status].color}>
                      {statusMap[selectedStation.status].label}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Available Points</label>
                  <p className="font-medium">{selectedStation.available}/{selectedStation.totalPoints}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Location</label>
                  <p className="font-medium">{selectedStation.lat.toFixed(6)}, {selectedStation.lng.toFixed(6)}</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Charging Points</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 border rounded">
                    <span>Fast Charging (60kW)</span>
                    <Badge variant="outline">3 points</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 border rounded">
                    <span>Standard Charging (30kW)</span>
                    <Badge variant="outline">{selectedStation.totalPoints - 3} points</Badge>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Recent Activity</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Last session</span>
                    <span>2 hours ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Today&apos;s sessions</span>
                    <span>12 sessions</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Today&apos;s revenue</span>
                    <span>2.4M VND</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1">View Detailed Report</Button>
                <Button variant="outline">Edit Station</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}