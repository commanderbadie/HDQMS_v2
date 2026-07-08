'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useQueue, type QueueEntry } from '@/lib/queue-context';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, X, Clock, AlertCircle, Plus, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

export default function AdminQueuePage() {
  const { queueEntries, updatePatientStatus, completePatient, cancelPatient, addPatient } = useQueue();
  const [selectedDept, setSelectedDept] = useState<string>(
    Array.from(new Set(queueEntries.map((q) => q.department)))[0] || ''
  );
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '',
    patientId: '',
    department: selectedDept,
    doctor: '',
    estimatedWaitTime: 30,
  });

  const departments = Array.from(new Set(queueEntries.map((q) => q.department)));
  const deptEntries = queueEntries.filter((q) => q.department === selectedDept);

  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.patientName || !formData.patientId || !formData.doctor) {
      toast.error('Please fill all fields');
      return;
    }

    addPatient({
      patientName: formData.patientName,
      patientId: formData.patientId,
      department: selectedDept,
      doctor: formData.doctor,
      appointmentTime: new Date(),
      status: 'waiting',
      arrivalTime: new Date(),
      estimatedWaitTime: formData.estimatedWaitTime,
    });

    toast.success('Patient added to queue');
    setFormData({ patientName: '', patientId: '', department: selectedDept, doctor: '', estimatedWaitTime: 30 });
    setShowAddDialog(false);
  };

  const getDoctorsForDept = (dept: string) => {
    return Array.from(new Set(queueEntries.filter((q) => q.department === dept).map((q) => q.doctor)));
  };

  const getStatusColor = (status: QueueEntry['status']) => {
    switch (status) {
      case 'waiting':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Queue Management</h1>
          <p className="text-muted-foreground mt-1">Manage patient queue and operations</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger onClick={() => setShowAddDialog(true)}>
            <Button>
              <Plus className="size-4 mr-2" />
              Add Patient
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Patient to Queue</DialogTitle>
              <DialogDescription>Add a new patient to the queue</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddPatient} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Patient Name</label>
                <Input
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Patient ID</label>
                <Input
                  value={formData.patientId}
                  onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                  placeholder="P001"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Department</label>
                <select
                  value={selectedDept}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Doctor</label>
                <select
                  value={formData.doctor}
                  onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                >
                  <option value="">Select Doctor</option>
                  {getDoctorsForDept(selectedDept).map((doc) => (
                    <option key={doc} value={doc}>
                      {doc}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Estimated Wait (min)</label>
                <Input
                  type="number"
                  value={formData.estimatedWaitTime}
                  onChange={(e) => setFormData({ ...formData, estimatedWaitTime: parseInt(e.target.value) })}
                />
              </div>
              <Button type="submit" className="w-full">
                Add to Queue
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Department Tabs */}
      <Tabs value={selectedDept} onValueChange={setSelectedDept}>
        <TabsList>
          {departments.map((dept) => (
            <TabsTrigger key={dept} value={dept}>
              {dept}
            </TabsTrigger>
          ))}
        </TabsList>

        {departments.map((dept) => {
          const entries = queueEntries.filter((q) => q.department === dept);
          const waiting = entries.filter((q) => q.status === 'waiting');
          const inProgress = entries.filter((q) => q.status === 'in-progress');
          const completed = entries.filter((q) => q.status === 'completed');

          return (
            <TabsContent key={dept} value={dept} className="space-y-6">
              {/* Status Overview */}
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Waiting</p>
                        <p className="text-3xl font-bold text-yellow-600">{waiting.length}</p>
                      </div>
                      <Clock className="size-6 text-yellow-500 opacity-50" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">In Progress</p>
                        <p className="text-3xl font-bold text-blue-600">{inProgress.length}</p>
                      </div>
                      <AlertCircle className="size-6 text-blue-500 opacity-50" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Completed</p>
                        <p className="text-3xl font-bold text-green-600">{completed.length}</p>
                      </div>
                      <Check className="size-6 text-green-500 opacity-50" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Queue Table */}
              <Card>
                <CardHeader>
                  <CardTitle>All Patients</CardTitle>
                  <CardDescription>Manage patient queue for {dept}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="border-b">
                        <tr className="text-muted-foreground text-xs font-medium">
                          <th className="text-left py-3 px-4">Patient</th>
                          <th className="text-left py-3 px-4">ID</th>
                          <th className="text-left py-3 px-4">Doctor</th>
                          <th className="text-left py-3 px-4">Status</th>
                          <th className="text-left py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {entries.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="text-center py-8 text-muted-foreground">
                              No patients in queue
                            </td>
                          </tr>
                        ) : (
                          entries.map((entry) => (
                            <tr key={entry.id} className="border-b hover:bg-muted/50">
                              <td className="py-3 px-4 font-medium">{entry.patientName}</td>
                              <td className="py-3 px-4 font-mono text-xs">{entry.id}</td>
                              <td className="py-3 px-4 text-xs">{entry.doctor}</td>
                              <td className="py-3 px-4">
                                <Badge className={getStatusColor(entry.status)}>{entry.status}</Badge>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex gap-2">
                                  {entry.status === 'waiting' && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => updatePatientStatus(entry.id, 'in-progress')}
                                      title="Start consultation"
                                    >
                                      <Clock className="size-3" />
                                    </Button>
                                  )}
                                  {entry.status === 'in-progress' && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => completePatient(entry.id)}
                                      title="Mark complete"
                                    >
                                      <Check className="size-3 text-green-500" />
                                    </Button>
                                  )}
                                  {entry.status !== 'completed' && entry.status !== 'cancelled' && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => cancelPatient(entry.id)}
                                      title="Cancel"
                                      className="text-destructive hover:text-destructive"
                                    >
                                      <X className="size-3" />
                                    </Button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
