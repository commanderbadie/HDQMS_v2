'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useQueue } from '@/lib/queue-context';
import { Users, Clock, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const { queueEntries, getQueueLength, getAverageWaitTime } = useQueue();

  const stats = [
    {
      title: 'Patients in Queue',
      value: getQueueLength(),
      icon: AlertCircle,
      color: 'text-yellow-500',
    },
    {
      title: 'In Progress',
      value: queueEntries.filter((q) => q.status === 'in-progress').length,
      icon: Clock,
      color: 'text-blue-500',
    },
    {
      title: 'Completed Today',
      value: queueEntries.filter((q) => q.status === 'completed').length,
      icon: CheckCircle,
      color: 'text-green-500',
    },
    {
      title: 'Avg Wait Time',
      value: `${getAverageWaitTime()} min`,
      icon: TrendingUp,
      color: 'text-purple-500',
    },
  ];

  const departments = Array.from(new Set(queueEntries.map((q) => q.department)));

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">Monitor queue operations and manage patient flow</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`size-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Queue by Department */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Queue by Department</CardTitle>
            <CardDescription>Current queue status for each department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departments.map((dept) => {
                const deptEntries = queueEntries.filter((q) => q.department === dept && q.status !== 'cancelled');
                const waitingCount = deptEntries.filter((q) => q.status === 'waiting').length;
                const inProgressCount = deptEntries.filter((q) => q.status === 'in-progress').length;

                return (
                  <div key={dept} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">{dept}</p>
                      <Badge variant="secondary">{deptEntries.length} patients</Badge>
                    </div>
                    <div className="flex gap-2 text-xs">
                      <div className="flex-1">
                        <div className="bg-yellow-100 rounded-full h-2 flex-1"></div>
                        <p className="text-muted-foreground mt-1">{waitingCount} waiting</p>
                      </div>
                      <div className="flex-1">
                        <div className="bg-blue-100 rounded-full h-2 flex-1"></div>
                        <p className="text-muted-foreground mt-1">{inProgressCount} active</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest queue updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {queueEntries.slice(0, 5).map((entry) => (
                <div key={entry.id} className="text-xs space-y-1 pb-3 border-b last:border-0 last:pb-0">
                  <p className="font-medium truncate">{entry.patientName}</p>
                  <p className="text-muted-foreground">{entry.department}</p>
                  <Badge
                    variant={
                      entry.status === 'in-progress'
                        ? 'default'
                        : entry.status === 'waiting'
                          ? 'secondary'
                          : entry.status === 'completed'
                            ? 'default'
                            : 'destructive'
                    }
                    className="text-xs"
                  >
                    {entry.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Doctors */}
      <Card>
        <CardHeader>
          <CardTitle>Doctor Availability</CardTitle>
          <CardDescription>Current workload by doctor</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from(new Set(queueEntries.map((q) => q.doctor))).map((doctor) => {
              const doctorEntries = queueEntries.filter((q) => q.doctor === doctor && q.status !== 'cancelled');
              const patientsServed = queueEntries.filter(
                (q) => q.doctor === doctor && q.status === 'completed'
              ).length;

              return (
                <Card key={doctor} className="bg-muted/50">
                  <CardContent className="pt-6">
                    <p className="font-semibold text-sm">{doctor}</p>
                    <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                      <div>
                        <p className="text-muted-foreground">Current</p>
                        <p className="text-lg font-bold">{doctorEntries.filter((q) => q.status === 'in-progress').length}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Queue</p>
                        <p className="text-lg font-bold">{doctorEntries.filter((q) => q.status === 'waiting').length}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-muted-foreground">Completed</p>
                        <p className="text-lg font-bold">{patientsServed}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
