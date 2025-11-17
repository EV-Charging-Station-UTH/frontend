'use client'

import DashboardCharts from '@/components/charts/dashboard-charts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, Zap, CreditCard, Users } from 'lucide-react'

const stats = [
  {
    title: 'Active Sessions',
    value: '12',
    description: '+2 from yesterday',
    icon: Activity,
    color: 'text-blue-600'
  },
  {
    title: 'Online/Offline Points',
    value: '18/2',
    description: '90% availability',
    icon: Zap,
    color: 'text-green-600'
  },
  {
    title: "Today's Total Charges",
    value: '45',
    description: '+5 from yesterday',
    icon: Users,
    color: 'text-purple-600'
  },
  {
    title: "Today's Revenue",
    value: '12.5M',
    description: '+1.2M from yesterday',
    icon: CreditCard,
    color: 'text-orange-600'
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <DashboardCharts />
    </div>
  )
}