'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Download, Calendar } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'

const sessionData = [
  { day: 'Mon', sessions: 45 },
  { day: 'Tue', sessions: 52 },
  { day: 'Wed', sessions: 48 },
  { day: 'Thu', sessions: 60 },
  { day: 'Fri', sessions: 65 },
  { day: 'Sat', sessions: 70 },
  { day: 'Sun', sessions: 55 },
]

const revenueData = [
  { hour: '00:00', revenue: 1200 },
  { hour: '02:00', revenue: 900 },
  { hour: '04:00', revenue: 600 },
  { hour: '06:00', revenue: 1500 },
  { hour: '08:00', revenue: 3000 },
  { hour: '10:00', revenue: 4500 },
  { hour: '12:00', revenue: 5200 },
  { hour: '14:00', revenue: 4800 },
  { hour: '16:00', revenue: 3800 },
  { hour: '18:00', revenue: 3200 },
  { hour: '20:00', revenue: 2800 },
  { hour: '22:00', revenue: 1800 },
]

const stationPerformance = [
  { name: 'Q1 Central', sessions: 156, revenue: 18600 },
  { name: 'Q7 Riverside', sessions: 134, revenue: 16200 },
  { name: 'Q2 Highland', sessions: 98, revenue: 11500 },
  { name: 'BT Plaza', sessions: 87, revenue: 9800 },
]

const statusData = [
  { name: 'Online', value: 18 },
  { name: 'In Use', value: 12 },
  { name: 'Offline', value: 2 },
]

const COLORS = ['#10b981', '#3b82f6', '#6b7280']

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Reports & Analytics</h1>
        <div className="flex gap-2">
          <Select defaultValue="7days">
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">This year</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Charging Sessions by Day</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sessionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sessions" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Station Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Revenue by Hour (VND)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}K`, 'Revenue']} />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Station Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stationPerformance.map((station) => (
                <div key={station.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{station.name}</p>
                    <p className="text-sm text-muted-foreground">{station.sessions} sessions</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{(station.revenue / 1000).toFixed(0)}K VND</p>
                    <p className="text-sm text-muted-foreground">revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Key Performance Indicators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Total Sessions</h3>
              <p className="text-3xl font-bold text-blue-600">335</p>
              <p className="text-sm text-muted-foreground">This week</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Average Session Time</h3>
              <p className="text-3xl font-bold text-green-600">45 min</p>
              <p className="text-sm text-muted-foreground">+5% from last week</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Peak Usage</h3>
              <p className="text-3xl font-bold text-purple-600">12:00 PM</p>
              <p className="text-sm text-muted-foreground">Most active hour</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Success Rate</h3>
              <p className="text-3xl font-bold text-orange-600">98.2%</p>
              <p className="text-sm text-muted-foreground">+0.5% from last week</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}