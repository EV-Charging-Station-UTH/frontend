export interface ChargingPoint {
  id: string
  status: 'available' | 'in-use' | 'offline' | 'maintenance'
  power: number
  session?: string
  startedAt?: string
  stationId: string
}

export interface Station {
  id: string
  name: string
  lat: number
  lng: number
  available: number
  totalPoints: number
  status: 'online' | 'offline' | 'in-use'
}

export interface Payment {
  id: string
  sessionId: string
  amount: number
  status: 'completed' | 'pending' | 'failed'
  createdAt: string
  userId: string
  stationId: string
}

export interface User {
  id: string
  email: string
  name: string
  role: 'staff' | 'admin'
}