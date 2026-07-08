'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQueue } from '@/lib/queue-context';
import { Clock, MapPin, User, Phone, AlertCircle, CheckCircle, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Link from 'next/link';

export default function QueuePage() {
  const { queueEntries, getPatientPosition, getAverageWaitTime } = useQueue();
  const [patientId, setPatientId] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<typeof queueEntries[0] | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const patient = queueEntries.find((q) => q.patientId === patientId || q.id === patientId);
    if (patient) {
      setSelectedPatient(patient);
      setShowDetails(true);
    }
  };

  const activeQueues = queueEntries.filter((q) => q.status !== 'cancelled');
  const departments = Array.from(new Set(activeQueues.map((q) => q.department)));

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in-progress':
        return <Badge className="bg-blue-500">In Progress</Badge>;
      case 'waiting':
        return <Badge variant="secondary">Waiting</Badge>;
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in-progress':
        return <AlertCircle className="size-4 text-blue-500" />;
      case 'waiting':
        return <Clock className="size-4 text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="size-4 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/10 to-background py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight">Digital Queue Management</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Check your queue status and estimated wait time
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search */}
            <Card>
              <CardHeader>
                <CardTitle>Find Your Queue Status</CardTitle>
                <CardDescription>Enter your patient ID or queue token to view your status</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSearch} className="flex gap-2">
                  <Input
                    placeholder="Patient ID (P001) or Queue Token (Q001)"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit">Search</Button>
                </form>
              </CardContent>
            </Card>

            {/* Queue by Department */}
            <Tabs defaultValue={departments[0] || ''} className="space-y-4">
              <TabsList className="w-full">
                {departments.map((dept) => (
                  <TabsTrigger key={dept} value={dept} className="flex-1">
                    {dept}
                  </TabsTrigger>
                ))}
              </TabsList>

              {departments.map((dept) => {
                const deptQueue = activeQueues.filter((q) => q.department === dept && q.status !== 'cancelled');
                return (
                  <TabsContent key={dept} value={dept}>
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>{dept}</CardTitle>
                            <CardDescription>
                              {deptQueue.length} patient{deptQueue.length !== 1 ? 's' : ''} in queue
                            </CardDescription>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">{deptQueue.length}</p>
                            <p className="text-xs text-muted-foreground">Avg wait: {getAverageWaitTime()} min</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {deptQueue.length === 0 ? (
                            <p className="text-center text-muted-foreground py-8">No patients in queue</p>
                          ) : (
                            deptQueue.map((entry, idx) => (
                              <div key={entry.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full font-semibold text-sm">
                                  {idx + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-semibold text-sm truncate">{entry.patientName}</p>
                                  <p className="text-xs text-muted-foreground">Dr. {entry.doctor.split(' ').slice(1).join(' ')}</p>
                                </div>
                                <div className="text-right text-sm">
                                  {getStatusIcon(entry.status)}
                                  {getStatusBadge(entry.status)}
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {entry.estimatedWaitTime > 0 ? `~${entry.estimatedWaitTime} min` : 'Now'}
                                  </p>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                );
              })}
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Queue Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Patients Waiting</p>
                  <p className="text-3xl font-bold">{queueEntries.filter((q) => q.status === 'waiting').length}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold text-blue-500">{queueEntries.filter((q) => q.status === 'in-progress').length}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Average Wait Time</p>
                  <p className="text-2xl font-bold">{getAverageWaitTime()} min</p>
                </div>
              </CardContent>
            </Card>

            {/* Help */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="space-y-2">
                  <p className="font-medium">Contact Information</p>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="size-4" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="size-4" />
                    <span>Front desk</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Book Appointment */}
            <Link href="/appointments">
              <Button className="w-full" variant="outline">
                Book Appointment
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Patient Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Your Queue Status</DialogTitle>
          </DialogHeader>
          {selectedPatient && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Patient Name</p>
                <p className="font-semibold">{selectedPatient.patientName}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Queue Token</p>
                <p className="font-mono font-semibold text-lg text-primary">{selectedPatient.id}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Department</p>
                  <p className="font-medium text-sm">{selectedPatient.department}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Doctor</p>
                  <p className="font-medium text-sm">{selectedPatient.doctor}</p>
                </div>
              </div>

              <div className="space-y-2 bg-primary/5 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Position in Queue</span>
                  <span className="text-2xl font-bold text-primary">
                    {getPatientPosition(selectedPatient.id) || 'N/A'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Estimated Wait</span>
                  <span className="font-semibold">
                    {selectedPatient.estimatedWaitTime > 0
                      ? `${selectedPatient.estimatedWaitTime} minutes`
                      : 'Now'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  {getStatusBadge(selectedPatient.status)}
                </div>
              </div>

              <Button onClick={() => setShowDetails(false)} className="w-full">
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
