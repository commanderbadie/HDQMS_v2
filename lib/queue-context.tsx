'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

export interface QueueEntry {
  id: string;
  patientName: string;
  patientId: string;
  department: string;
  doctor: string;
  appointmentTime: Date;
  status: 'waiting' | 'in-progress' | 'completed' | 'cancelled';
  arrivalTime: Date;
  estimatedWaitTime: number; // in minutes
  position: number;
}

interface QueueContextType {
  queueEntries: QueueEntry[];
  addPatient: (entry: Omit<QueueEntry, 'id' | 'position'>) => void;
  updatePatientStatus: (id: string, status: QueueEntry['status']) => void;
  getPatientPosition: (id: string) => number | null;
  getQueueLength: () => number;
  getAverageWaitTime: () => number;
  completePatient: (id: string) => void;
  cancelPatient: (id: string) => void;
}

const QueueContext = createContext<QueueContextType | undefined>(undefined);

// Initial mock data
const initialQueueData: QueueEntry[] = [
  {
    id: 'Q001',
    patientName: 'Alice Johnson',
    patientId: 'P001',
    department: 'Cardiology',
    doctor: 'Dr. Sarah Smith',
    appointmentTime: new Date(Date.now() + 15 * 60000),
    status: 'in-progress',
    arrivalTime: new Date(Date.now() - 30 * 60000),
    estimatedWaitTime: 0,
    position: 1,
  },
  {
    id: 'Q002',
    patientName: 'Bob Wilson',
    patientId: 'P002',
    department: 'Cardiology',
    doctor: 'Dr. Sarah Smith',
    appointmentTime: new Date(Date.now() + 35 * 60000),
    status: 'waiting',
    arrivalTime: new Date(Date.now() - 10 * 60000),
    estimatedWaitTime: 35,
    position: 2,
  },
  {
    id: 'Q003',
    patientName: 'Carol Davis',
    patientId: 'P003',
    department: 'Neurology',
    doctor: 'Dr. Michael Chen',
    appointmentTime: new Date(Date.now() + 45 * 60000),
    status: 'waiting',
    arrivalTime: new Date(),
    estimatedWaitTime: 45,
    position: 1,
  },
  {
    id: 'Q004',
    patientName: 'David Brown',
    patientId: 'P004',
    department: 'Orthopedics',
    doctor: 'Dr. James Martinez',
    appointmentTime: new Date(Date.now() + 60 * 60000),
    status: 'waiting',
    arrivalTime: new Date(Date.now() - 5 * 60000),
    estimatedWaitTime: 60,
    position: 1,
  },
];

export function QueueProvider({ children }: { children: React.ReactNode }) {
  const [queueEntries, setQueueEntries] = useState<QueueEntry[]>(initialQueueData);

  const addPatient = useCallback((entry: Omit<QueueEntry, 'id' | 'position'>) => {
    const id = `Q${String(queueEntries.length + 1).padStart(3, '0')}`;
    const deptEntries = queueEntries.filter((q) => q.department === entry.department && q.status !== 'cancelled');
    const position = deptEntries.length + 1;

    setQueueEntries((prev) => [
      ...prev,
      {
        ...entry,
        id,
        position,
      },
    ]);
  }, [queueEntries.length]);

  const updatePatientStatus = useCallback((id: string, status: QueueEntry['status']) => {
    setQueueEntries((prev) =>
      prev.map((entry) =>
        entry.id === id ? { ...entry, status } : entry
      )
    );
  }, []);

  const completePatient = useCallback((id: string) => {
    updatePatientStatus(id, 'completed');
  }, [updatePatientStatus]);

  const cancelPatient = useCallback((id: string) => {
    updatePatientStatus(id, 'cancelled');
  }, [updatePatientStatus]);

  const getPatientPosition = useCallback((id: string) => {
    const entry = queueEntries.find((q) => q.id === id);
    if (!entry) return null;

    const deptEntries = queueEntries
      .filter((q) => q.department === entry.department && q.status !== 'cancelled')
      .sort((a, b) => a.position - b.position);

    return deptEntries.findIndex((q) => q.id === id) + 1;
  }, [queueEntries]);

  const getQueueLength = useCallback(() => {
    return queueEntries.filter((q) => q.status === 'waiting').length;
  }, [queueEntries]);

  const getAverageWaitTime = useCallback(() => {
    const waitingEntries = queueEntries.filter((q) => q.status === 'waiting');
    if (waitingEntries.length === 0) return 0;
    return Math.round(
      waitingEntries.reduce((sum, q) => sum + q.estimatedWaitTime, 0) / waitingEntries.length
    );
  }, [queueEntries]);

  return (
    <QueueContext.Provider
      value={{
        queueEntries,
        addPatient,
        updatePatientStatus,
        getPatientPosition,
        getQueueLength,
        getAverageWaitTime,
        completePatient,
        cancelPatient,
      }}
    >
      {children}
    </QueueContext.Provider>
  );
}

export function useQueue() {
  const context = useContext(QueueContext);
  if (!context) {
    throw new Error('useQueue must be used within a QueueProvider');
  }
  return context;
}
