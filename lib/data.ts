export const HOSPITAL_NAME = "MediCare General Hospital"
export const HOSPITAL_TAGLINE = "Compassionate Care, Advanced Medicine"
export const HOSPITAL_PHONE = "+1 (800) 555-0199"
export const HOSPITAL_EMAIL = "info@medicare-hospital.com"
export const HOSPITAL_ADDRESS = "1200 Medical Center Drive, Springfield, IL 62701"

export const STATS = [
  { label: "Specialist Physicians", value: 540, suffix: "+" },
  { label: "Hospital Facilities", value: 12, suffix: "" },
  { label: "Medical Specialties", value: 48, suffix: "+" },
  { label: "Patients Served Annually", value: 320000, suffix: "+" },
  { label: "Years of Excellence", value: 65, suffix: "" },
  { label: "Accreditations", value: 18, suffix: "" },
]

export const DEPARTMENTS = [
  {
    id: "cardiology",
    name: "Cardiology",
    icon: "Heart",
    description:
      "Advanced cardiac care including interventional cardiology, electrophysiology, and heart failure management.",
    image: "/placeholder.svg?height=400&width=600",
    color: "bg-red-50 text-red-700",
    doctors: 24,
    wait: "15 min",
  },
  {
    id: "oncology",
    name: "Oncology",
    icon: "Microscope",
    description:
      "Comprehensive cancer care from diagnosis through treatment, including radiation, chemotherapy, and immunotherapy.",
    image: "/placeholder.svg?height=400&width=600",
    color: "bg-purple-50 text-purple-700",
    doctors: 18,
    wait: "20 min",
  },
  {
    id: "neurology",
    name: "Neurology & Neurosurgery",
    icon: "Brain",
    description:
      "Expert care for neurological conditions including stroke, epilepsy, Parkinson's disease, and brain tumors.",
    image: "/placeholder.svg?height=400&width=600",
    color: "bg-blue-50 text-blue-700",
    doctors: 16,
    wait: "25 min",
  },
  {
    id: "orthopedics",
    name: "Orthopedics",
    icon: "Bone",
    description:
      "Specialized care for bone, joint, and musculoskeletal conditions with minimally invasive surgical options.",
    image: "/placeholder.svg?height=400&width=600",
    color: "bg-orange-50 text-orange-700",
    doctors: 22,
    wait: "30 min",
  },
  {
    id: "pediatrics",
    name: "Pediatrics",
    icon: "Baby",
    description:
      "Complete healthcare for children from newborns to adolescents, including neonatal intensive care.",
    image: "/placeholder.svg?height=400&width=600",
    color: "bg-green-50 text-green-700",
    doctors: 30,
    wait: "10 min",
  },
  {
    id: "womens-health",
    name: "Women's Health",
    icon: "Venus",
    description:
      "Comprehensive gynecology, obstetrics, maternal-fetal medicine, and women's wellness programs.",
    image: "/placeholder.svg?height=400&width=600",
    color: "bg-pink-50 text-pink-700",
    doctors: 20,
    wait: "18 min",
  },
  {
    id: "emergency",
    name: "Emergency Medicine",
    icon: "Zap",
    description:
      "24/7 emergency care with Level I trauma center designation and advanced life-support capabilities.",
    image: "/placeholder.svg?height=400&width=600",
    color: "bg-yellow-50 text-yellow-700",
    doctors: 35,
    wait: "Immediate",
  },
  {
    id: "radiology",
    name: "Radiology & Imaging",
    icon: "ScanLine",
    description:
      "State-of-the-art diagnostic imaging including MRI, CT, PET scans, and interventional radiology.",
    image: "/placeholder.svg?height=400&width=600",
    color: "bg-cyan-50 text-cyan-700",
    doctors: 14,
    wait: "45 min",
  },
]

export const DOCTORS = [
  {
    id: "dr-sarah-johnson",
    name: "Dr. Sarah Johnson",
    title: "MD, FACC",
    specialty: "Cardiology",
    department: "cardiology",
    image: "/placeholder.svg?height=400&width=400",
    education: "Johns Hopkins School of Medicine",
    experience: 18,
    languages: ["English", "Spanish"],
    bio: "Dr. Johnson is a board-certified cardiologist specializing in interventional cardiology and structural heart disease. She has performed over 2,000 complex cardiac procedures.",
    availability: "Mon, Wed, Fri",
    rating: 4.9,
    reviews: 312,
  },
  {
    id: "dr-michael-chen",
    name: "Dr. Michael Chen",
    title: "MD, PhD",
    specialty: "Neurology",
    department: "neurology",
    image: "/placeholder.svg?height=400&width=400",
    education: "Stanford University School of Medicine",
    experience: 22,
    languages: ["English", "Mandarin"],
    bio: "Dr. Chen is a leading neurologist and neuroscientist with expertise in stroke prevention, epilepsy management, and movement disorders.",
    availability: "Tue, Thu",
    rating: 4.8,
    reviews: 287,
  },
  {
    id: "dr-amara-okafor",
    name: "Dr. Amara Okafor",
    title: "MD, FACS",
    specialty: "Oncology",
    department: "oncology",
    image: "/placeholder.svg?height=400&width=400",
    education: "Harvard Medical School",
    experience: 15,
    languages: ["English", "French", "Yoruba"],
    bio: "Dr. Okafor is an oncologist specializing in breast cancer, lymphoma, and immunotherapy. She leads the hospital's clinical trials program.",
    availability: "Mon, Tue, Thu",
    rating: 4.9,
    reviews: 198,
  },
  {
    id: "dr-james-mitchell",
    name: "Dr. James Mitchell",
    title: "MD, FAAOS",
    specialty: "Orthopedics",
    department: "orthopedics",
    image: "/placeholder.svg?height=400&width=400",
    education: "Mayo Clinic School of Medicine",
    experience: 20,
    languages: ["English"],
    bio: "Dr. Mitchell specializes in joint replacement, sports medicine, and minimally invasive spine surgery. He has treated professional athletes.",
    availability: "Mon, Wed, Fri",
    rating: 4.7,
    reviews: 415,
  },
  {
    id: "dr-priya-sharma",
    name: "Dr. Priya Sharma",
    title: "MD, FAAP",
    specialty: "Pediatrics",
    department: "pediatrics",
    image: "/placeholder.svg?height=400&width=400",
    education: "University of Pennsylvania",
    experience: 12,
    languages: ["English", "Hindi", "Gujarati"],
    bio: "Dr. Sharma provides compassionate care for children across all age groups with special focus on developmental pediatrics and adolescent medicine.",
    availability: "Mon–Fri",
    rating: 5.0,
    reviews: 523,
  },
  {
    id: "dr-emily-rodriguez",
    name: "Dr. Emily Rodriguez",
    title: "MD, FACOG",
    specialty: "Women's Health",
    department: "womens-health",
    image: "/placeholder.svg?height=400&width=400",
    education: "Yale School of Medicine",
    experience: 16,
    languages: ["English", "Spanish"],
    bio: "Dr. Rodriguez is a maternal-fetal medicine specialist focused on high-risk pregnancies, fetal surgery, and minimally invasive gynecologic procedures.",
    availability: "Tue, Wed, Fri",
    rating: 4.8,
    reviews: 341,
  },
]

export const NEWS = [
  {
    id: "new-cardiac-center",
    category: "Facility",
    title: "MediCare Opens State-of-the-Art Cardiac Center of Excellence",
    excerpt:
      "Our newly expanded Cardiac Center features the latest hybrid OR suites, advanced imaging, and a dedicated heart failure clinic serving the tri-state region.",
    date: "June 28, 2026",
    image: "/placeholder.svg?height=300&width=500",
    author: "Communications Team",
    readTime: "4 min read",
  },
  {
    id: "ai-diagnostics",
    category: "Technology",
    title: "AI-Powered Diagnostics Reduce Radiology Turnaround by 60%",
    excerpt:
      "MediCare's partnership with leading AI vendors has cut imaging read times significantly, improving outcomes for stroke and trauma patients.",
    date: "June 15, 2026",
    image: "/placeholder.svg?height=300&width=500",
    author: "Dr. Kevin Park",
    readTime: "3 min read",
  },
  {
    id: "joint-commission",
    category: "Awards",
    title: "Hospital Receives Joint Commission's Gold Seal of Approval for 8th Consecutive Year",
    excerpt:
      "MediCare General Hospital maintains its perfect compliance record across all 1,500 Joint Commission standards, reaffirming our commitment to safety.",
    date: "June 3, 2026",
    image: "/placeholder.svg?height=300&width=500",
    author: "Quality & Safety Team",
    readTime: "2 min read",
  },
  {
    id: "pediatric-research",
    category: "Research",
    title: "Breakthrough Study on Childhood Asthma Treatment Published in NEJM",
    excerpt:
      "Dr. Sharma and team's 5-year study demonstrates a 45% reduction in hospitalization rates with new targeted therapy protocol.",
    date: "May 22, 2026",
    image: "/placeholder.svg?height=300&width=500",
    author: "Dr. Priya Sharma",
    readTime: "5 min read",
  },
  {
    id: "community-health",
    category: "Community",
    title: "Free Community Health Screening Day Serves Over 2,000 Residents",
    excerpt:
      "Annual health fair provided blood pressure checks, diabetes screening, and cancer risk assessments to underserved communities.",
    date: "May 10, 2026",
    image: "/placeholder.svg?height=300&width=500",
    author: "Community Outreach",
    readTime: "3 min read",
  },
  {
    id: "digital-queue",
    category: "Innovation",
    title: "New Digital Queue Management System Eliminates 90-Minute Wait Times",
    excerpt:
      "Our cloud-based DQMS now serves all 12 facilities with real-time tracking, SMS notifications, and smart appointment scheduling.",
    date: "April 29, 2026",
    image: "/placeholder.svg?height=300&width=500",
    author: "Innovation Team",
    readTime: "4 min read",
  },
]

export const TESTIMONIALS = [
  {
    name: "Margaret T.",
    age: 68,
    condition: "Cardiac Surgery",
    quote:
      "After my triple bypass, the care team at MediCare was extraordinary. Dr. Johnson and her team gave me my life back. I am forever grateful for their compassion and expertise.",
    rating: 5,
    date: "May 2026",
  },
  {
    name: "Robert K.",
    age: 45,
    condition: "Orthopedic Surgery",
    quote:
      "I was back on the basketball court six months after my total knee replacement. Dr. Mitchell's minimally invasive approach was everything I hoped for. The recovery was smoother than I ever imagined.",
    rating: 5,
    date: "April 2026",
  },
  {
    name: "Anita P.",
    age: 38,
    condition: "Maternity Care",
    quote:
      "Dr. Rodriguez guided me through a high-risk pregnancy with such confidence and warmth. My twins were born healthy and strong. I cannot recommend MediCare enough.",
    rating: 5,
    date: "March 2026",
  },
  {
    name: "David L.",
    age: 54,
    condition: "Cancer Treatment",
    quote:
      "Dr. Okafor's immunotherapy program put my stage III lymphoma into complete remission. The oncology team treated me as a person, not just a patient. They saved my life.",
    rating: 5,
    date: "February 2026",
  },
  {
    name: "Sofia M.",
    age: 8,
    condition: "Pediatric Neurology",
    quote:
      "My daughter had been misdiagnosed for two years before Dr. Chen identified her epilepsy variant. Within months she was seizure-free. We are beyond thankful.",
    rating: 5,
    date: "January 2026",
  },
]

export const AWARDS = [
  {
    name: "Joint Commission Gold Seal",
    year: "2026",
    description: "8th Consecutive Year",
  },
  {
    name: "U.S. News Best Hospitals",
    year: "2026",
    description: "Top 50 National Ranking",
  },
  {
    name: "Leapfrog 'A' Safety Grade",
    year: "2026",
    description: "Patient Safety Excellence",
  },
  {
    name: "Magnet Nursing Recognition",
    year: "2025",
    description: "Nursing Excellence Award",
  },
  {
    name: "Healthgrades Excellence Award",
    year: "2026",
    description: "America's 100 Best Hospitals",
  },
  {
    name: "Press Ganey Guardian of Excellence",
    year: "2025",
    description: "Patient Experience",
  },
]

export const LOCATIONS = [
  {
    id: "main-campus",
    name: "Main Campus",
    type: "Full-Service Hospital",
    address: "1200 Medical Center Drive",
    city: "Springfield, IL 62701",
    phone: "+1 (800) 555-0199",
    hours: "24/7 Emergency",
    departments: ["Emergency", "Surgery", "ICU", "All Specialties"],
    lat: 39.7817,
    lng: -89.6501,
  },
  {
    id: "north-clinic",
    name: "North Health Center",
    type: "Outpatient Clinic",
    address: "4500 Northview Boulevard",
    city: "Springfield, IL 62702",
    phone: "+1 (800) 555-0200",
    hours: "Mon–Sat, 7am–8pm",
    departments: ["Primary Care", "Lab", "Radiology", "Urgent Care"],
    lat: 39.8217,
    lng: -89.6401,
  },
  {
    id: "west-surgical",
    name: "West Surgical Center",
    type: "Ambulatory Surgery",
    address: "320 West Wellness Way",
    city: "Springfield, IL 62703",
    phone: "+1 (800) 555-0201",
    hours: "Mon–Fri, 6am–6pm",
    departments: ["Orthopedics", "GI", "ENT", "Ophthalmology"],
    lat: 39.7617,
    lng: -89.7001,
  },
]

// --- Queue Management Data ---
export const QUEUE_DEPARTMENTS = [
  { id: "emergency", name: "Emergency", avgWait: 5, current: 3, total: 8 },
  { id: "cardiology", name: "Cardiology", avgWait: 15, current: 12, total: 20 },
  { id: "general", name: "General OPD", avgWait: 25, current: 24, total: 40 },
  { id: "pediatrics", name: "Pediatrics", avgWait: 10, current: 8, total: 15 },
  { id: "radiology", name: "Radiology", avgWait: 45, current: 18, total: 22 },
  { id: "lab", name: "Laboratory", avgWait: 20, current: 30, total: 45 },
]
