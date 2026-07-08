'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useQueue } from '@/lib/queue-context';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Search } from 'lucide-react';

export default function AdminPatientsPage() {
  const { queueEntries } = useQueue();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEntries = queueEntries.filter((entry) =>
    entry.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.patientId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const uniquePatients = Array.from(
    new Map(filteredEntries.map((item) => [item.patientId, item])).values()
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Patient Management</h1>
        <p className="text-muted-foreground mt-1">View and manage patient records</p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search by patient name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Patients Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Patients</CardTitle>
          <CardDescription>
            {uniquePatients.length} patient{uniquePatients.length !== 1 ? 's' : ''} in system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b">
                <tr className="text-muted-foreground text-xs font-medium">
                  <th className="text-left py-3 px-4">Patient ID</th>
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Department</th>
                  <th className="text-left py-3 px-4">Doctor</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Visit Count</th>
                </tr>
              </thead>
              <tbody>
                {uniquePatients.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-muted-foreground">
                      No patients found
                    </td>
                  </tr>
                ) : (
                  uniquePatients.map((patient) => {
                    const visits = queueEntries.filter((q) => q.patientId === patient.patientId).length;
                    const lastStatus = queueEntries
                      .filter((q) => q.patientId === patient.patientId)
                      .sort((a, b) => new Date(b.arrivalTime).getTime() - new Date(a.arrivalTime).getTime())[0]?.status;

                    return (
                      <tr key={patient.patientId} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4 font-mono text-xs">{patient.patientId}</td>
                        <td className="py-3 px-4 font-medium">{patient.patientName}</td>
                        <td className="py-3 px-4 text-xs">{patient.department}</td>
                        <td className="py-3 px-4 text-xs">{patient.doctor}</td>
                        <td className="py-3 px-4">
                          <Badge
                            variant={
                              lastStatus === 'completed'
                                ? 'default'
                                : lastStatus === 'in-progress'
                                  ? 'secondary'
                                  : 'outline'
                            }
                          >
                            {lastStatus}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">{visits}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
