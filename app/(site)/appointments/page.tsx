"use client"

import { useState } from "react"
import type { Metadata } from "next"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DEPARTMENTS, DOCTORS, LOCATIONS } from "@/lib/data"
import { Calendar, CheckCircle, ChevronRight, Clock, MapPin, User } from "lucide-react"

const steps = ["Select Department", "Choose Doctor", "Pick Date & Time", "Your Details", "Confirm"]

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
]

export default function AppointmentsPage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    department: "",
    doctor: "",
    facility: "",
    date: "",
    time: "",
    firstName: "",
    lastName: "",
    patientId: "",
    phone: "",
    email: "",
    reason: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const deptDoctors = DOCTORS.filter((d) => !form.department || d.department === form.department)

  const canProceed = () => {
    if (step === 0) return !!form.department && !!form.facility
    if (step === 1) return true // doctor optional
    if (step === 2) return !!form.date && !!form.time
    if (step === 3) return !!form.firstName && !!form.lastName && !!form.phone
    return true
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="py-24 text-center">
        <div className="mx-auto max-w-md px-4">
          <div className="flex size-20 mx-auto items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
            <CheckCircle className="size-10" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-foreground mb-3">Appointment Confirmed!</h1>
          <p className="text-muted-foreground mb-2">
            Your appointment has been booked at{" "}
            <span className="font-medium text-foreground">
              {LOCATIONS.find((l) => l.id === form.facility)?.name ?? "MediCare"}
            </span>
            .
          </p>
          <p className="text-muted-foreground mb-6">
            A confirmation SMS will be sent to <span className="font-medium text-foreground">{form.phone}</span>.
          </p>
          <div className="rounded-xl border border-border bg-muted/30 p-5 text-left mb-6">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground text-xs">Department</p>
                <p className="font-medium text-foreground">
                  {DEPARTMENTS.find((d) => d.id === form.department)?.name ?? "—"}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Date & Time</p>
                <p className="font-medium text-foreground">{form.date} at {form.time}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Patient</p>
                <p className="font-medium text-foreground">{form.firstName} {form.lastName}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Reference No.</p>
                <p className="font-bold text-primary">MCH-{Math.floor(Math.random() * 90000 + 10000)}</p>
              </div>
            </div>
          </div>
          <Button onClick={() => { setSubmitted(false); setStep(0); setForm({ department: "", doctor: "", facility: "", date: "", time: "", firstName: "", lastName: "", patientId: "", phone: "", email: "", reason: "" }) }} variant="outline">
            Book Another Appointment
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="bg-primary py-16 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <Badge variant="secondary" className="mb-4 text-primary-foreground/80 bg-primary-foreground/10 border-primary-foreground/20">
            Book Appointment
          </Badge>
          <h1 className="font-heading text-4xl font-bold md:text-5xl">Schedule Your Visit</h1>
          <p className="mt-4 max-w-xl text-primary-foreground/80">
            Book an appointment with our specialists in minutes. Select your department, choose a convenient
            date, and confirm online.
          </p>
        </div>
      </div>

      <div className="py-12 bg-background">
        <div className="mx-auto max-w-3xl px-4">
          {/* Stepper */}
          <div className="mb-8 flex items-center gap-0 overflow-x-auto">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center shrink-0">
                <button
                  onClick={() => i < step && setStep(i)}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    i === step ? "text-primary" : i < step ? "text-primary/60 cursor-pointer hover:text-primary" : "text-muted-foreground"
                  }`}
                  disabled={i > step}
                >
                  <span className={`flex size-7 items-center justify-center rounded-full text-xs font-bold border-2 transition-colors ${
                    i < step ? "bg-primary border-primary text-primary-foreground" :
                    i === step ? "bg-primary border-primary text-primary-foreground" :
                    "border-border text-muted-foreground"
                  }`}>
                    {i < step ? <CheckCircle className="size-4" /> : i + 1}
                  </span>
                  <span className="hidden sm:block">{s}</span>
                </button>
                {i < steps.length - 1 && (
                  <ChevronRight className="mx-2 size-4 text-muted-foreground shrink-0" />
                )}
              </div>
            ))}
          </div>

          <Card className="border-border">
            <CardContent className="p-6">
              {/* Step 0: Department + Facility */}
              {step === 0 && (
                <div className="flex flex-col gap-5">
                  <h2 className="font-heading text-xl font-bold text-foreground">Select Department &amp; Facility</h2>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground" htmlFor="dept">
                      Department / Specialty *
                    </label>
                    <select
                      id="dept"
                      value={form.department}
                      onChange={(e) => setForm({ ...form, department: e.target.value })}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Choose a department...</option>
                      {DEPARTMENTS.map((d) => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground" htmlFor="facility">
                      Select Facility / Hospital *
                    </label>
                    <div className="flex flex-col gap-3">
                      {LOCATIONS.map((loc) => (
                        <label
                          key={loc.id}
                          className={`flex items-start gap-3 rounded-xl border p-4 cursor-pointer transition-colors ${
                            form.facility === loc.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted/40"
                          }`}
                        >
                          <input
                            type="radio"
                            name="facility"
                            value={loc.id}
                            checked={form.facility === loc.id}
                            onChange={(e) => setForm({ ...form, facility: e.target.value })}
                            className="mt-0.5"
                          />
                          <div>
                            <p className="font-medium text-foreground text-sm">{loc.name}</p>
                            <p className="text-xs text-muted-foreground">{loc.type}</p>
                            <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1"><MapPin className="size-3" />{loc.address}</span>
                              <span className="flex items-center gap-1"><Clock className="size-3" />{loc.hours}</span>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 1: Doctor */}
              {step === 1 && (
                <div className="flex flex-col gap-5">
                  <h2 className="font-heading text-xl font-bold text-foreground">Choose a Doctor <span className="text-sm font-normal text-muted-foreground">(optional)</span></h2>
                  <div className="flex flex-col gap-3">
                    <label className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition-colors ${form.doctor === "" ? "border-primary bg-primary/5" : "border-border"}`}>
                      <input type="radio" name="doctor" value="" checked={form.doctor === ""} onChange={() => setForm({ ...form, doctor: "" })} />
                      <p className="text-sm font-medium text-foreground">No preference — assign best available</p>
                    </label>
                    {deptDoctors.map((doc) => (
                      <label
                        key={doc.id}
                        className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition-colors ${form.doctor === doc.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted/40"}`}
                      >
                        <input type="radio" name="doctor" value={doc.id} checked={form.doctor === doc.id} onChange={(e) => setForm({ ...form, doctor: e.target.value })} />
                        <div className="relative size-10 shrink-0 overflow-hidden rounded-full bg-muted">
                          <img src={doc.image} alt={doc.name} className="h-full w-full object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{doc.title} — {doc.specialty}</p>
                          <p className="text-xs text-muted-foreground">Available: {doc.availability}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Date & Time */}
              {step === 2 && (
                <div className="flex flex-col gap-5">
                  <h2 className="font-heading text-xl font-bold text-foreground">Pick Date &amp; Time</h2>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground" htmlFor="date">
                      Preferred Date *
                    </label>
                    <input
                      id="date"
                      type="date"
                      value={form.date}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-foreground">Available Times *</p>
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setForm({ ...form, time: slot })}
                          className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                            form.time === slot
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border hover:bg-accent hover:text-accent-foreground"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Patient Details */}
              {step === 3 && (
                <div className="flex flex-col gap-5">
                  <h2 className="font-heading text-xl font-bold text-foreground">Your Details</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-foreground" htmlFor="first">First Name *</label>
                      <input id="first" type="text" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Jane" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-foreground" htmlFor="last">Last Name *</label>
                      <input id="last" type="text" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Smith" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground" htmlFor="pid">Patient ID <span className="text-muted-foreground font-normal">(existing patients)</span></label>
                    <input id="pid" type="text" value={form.patientId} onChange={(e) => setForm({ ...form, patientId: e.target.value })} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="MCH-XXXXX" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground" htmlFor="phone">Mobile Number *</label>
                    <input id="phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="+1 (555) 000-0000" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground" htmlFor="email">Email Address</label>
                    <input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="jane@email.com" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground" htmlFor="reason">Reason for Visit</label>
                    <textarea id="reason" value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" rows={3} placeholder="Briefly describe your symptoms or reason for visit..." />
                  </div>
                </div>
              )}

              {/* Step 4: Confirm */}
              {step === 4 && (
                <div className="flex flex-col gap-5">
                  <h2 className="font-heading text-xl font-bold text-foreground">Confirm Your Appointment</h2>
                  <div className="rounded-xl border border-border bg-muted/30 p-5">
                    <dl className="grid grid-cols-2 gap-4 text-sm">
                      {[
                        { label: "Department", value: DEPARTMENTS.find((d) => d.id === form.department)?.name },
                        { label: "Doctor", value: form.doctor ? DOCTORS.find((d) => d.id === form.doctor)?.name : "Best available" },
                        { label: "Facility", value: LOCATIONS.find((l) => l.id === form.facility)?.name },
                        { label: "Date", value: form.date },
                        { label: "Time", value: form.time },
                        { label: "Patient", value: `${form.firstName} ${form.lastName}` },
                        { label: "Phone", value: form.phone },
                        { label: "Email", value: form.email || "—" },
                      ].map(({ label, value }) => (
                        <div key={label}>
                          <dt className="text-xs text-muted-foreground">{label}</dt>
                          <dd className="font-medium text-foreground">{value ?? "—"}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    By confirming, you agree to our appointment policy. A confirmation SMS will be sent to your mobile number.
                  </p>
                </div>
              )}

              {/* Navigation */}
              <div className="mt-6 flex items-center justify-between gap-3">
                {step > 0 ? (
                  <Button variant="outline" onClick={() => setStep((s) => s - 1)}>
                    Back
                  </Button>
                ) : <div />}
                {step < steps.length - 1 ? (
                  <Button onClick={() => setStep((s) => s + 1)} disabled={!canProceed()}>
                    Continue
                    <ChevronRight className="size-4" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} className="gap-2">
                    <CheckCircle className="size-4" />
                    Confirm Appointment
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
