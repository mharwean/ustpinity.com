import { User, Post, Resource, LabProject, MarketItem, CampusEvent, AlumnusMentor } from './types';

export const SYSTEM_VIRTUAL_USERS: User[] = [
  {
    studentId: "2023300501",
    name: "Engr. Jeanette Almine",
    email: "jeanette.almine@ustp.edu.ph",
    role: "Faculty",
    college: "CITC",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    reputationPoints: 1250,
    badges: ["Faculty Advisor", "Resource Leader", "Organizer"]
  },
  {
    studentId: "2024108844",
    name: "Mharwean Malolot",
    email: "malolot.mharweanjhymes24@gmail.com",
    role: "Student",
    college: "CITC",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    reputationPoints: 480,
    badges: ["Innovator", "Code Wizard", "Early Adopter"]
  },
  {
    studentId: "2024204122",
    name: "Alexa Rose Cabanlit",
    email: "alexa.rose@ustp.edu.ph",
    role: "Student",
    college: "CSM",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    reputationPoints: 340,
    badges: ["Top Helper", "Math Whiz"]
  },
  {
    studentId: "2023190887",
    name: "Christian Dave P.",
    email: "dave.p@ustp.edu.ph",
    role: "Student",
    college: "CEA",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    reputationPoints: 190,
    badges: ["Lab Captain"]
  },
  {
    studentId: "2025112233",
    name: "Precious Mae G.",
    email: "precious.mae@ustp.edu.ph",
    role: "Student",
    college: "COT",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    reputationPoints: 95,
    badges: ["Maker Showcase"]
  }
];

export const INITIAL_POSTS: Post[] = [
  {
    id: "post-1",
    author: SYSTEM_VIRTUAL_USERS[0], // Faculty
    content: "Welcome, Trailblazers, to the secure campus social network! This digital space was designed specifically to align IT, engineering, technology, and science under one collaborative ceiling. Ensure you complete your official verification using your @ustp.edu.ph email in the portal header. Let us maintain high professional and academic standards here. Safe postings!",
    timestamp: "2 hours ago",
    likesCount: 38,
    likedByUser: false,
    comments: [
      {
        id: "comm-1",
        author: SYSTEM_VIRTUAL_USERS[1],
        content: "Thank you for setting this up, Ma'am! This is a massive step forward for student-to-student collaboration across colleges.",
        timestamp: "1 hour ago"
      },
      {
        id: "comm-2",
        author: SYSTEM_VIRTUAL_USERS[2],
        content: "Agreed! Excited to share our mathematics lecture summaries with our peers.",
        timestamp: "45 mins ago"
      }
    ],
    collegeId: "Global",
    tags: ["USTPConnect", "AcademicDiscourse", "Welcome"],
    category: "Announcement",
    reportsCount: 0
  },
  {
    id: "post-2",
    author: SYSTEM_VIRTUAL_USERS[1], // Mharwean Student
    content: "Calling all developers and designers! With the annual Trailblazer Hackathon right around the corner, our team is looking for a Civil Engineering student from CEA and an Applied Physics major from CSM to finalize an IoT-based structural damage monitoring prototype. Let's make this cross-department build win gold. Fire off a message if you want to join!",
    timestamp: "4 hours ago",
    likesCount: 22,
    likedByUser: false,
    comments: [
      {
        id: "comm-3",
        author: SYSTEM_VIRTUAL_USERS[3],
        content: "This sounds incredible. I am Dave from CEA (Civil Engineering). I am highly proficient with CAD and structural simulations. Shoot me an invitation!",
        timestamp: "3 hours ago"
      }
    ],
    collegeId: "CITC",
    tags: ["Hackathon", "CEA", "CSM", "CITCCollab"],
    category: "LabHelp",
    reportsCount: 0
  },
  {
    id: "post-3",
    author: SYSTEM_VIRTUAL_USERS[2], // Alexa Student
    content: "Just published initial findings from the CSM organic waste bio-fuel efficiency test. By treating agricultural runoff using standard local yeasts, we saw a 14% increase in clean combustible gas yield. Full lab protocol is available for review in the CSM course portal folders. Feedback from biochem majors is more than welcome!",
    timestamp: "1 day ago",
    likesCount: 19,
    likedByUser: false,
    comments: [],
    collegeId: "CSM",
    tags: ["BioFuel", "ResearchProject", "GreenTech"],
    category: "Research",
    reportsCount: 0
  },
  {
    id: "post-4",
    author: SYSTEM_VIRTUAL_USERS[3], // Dave Student
    content: "Who is in charge of CEA Lab 3 today? I am troubleshooting structural loading on our steel arch prototype and need to verify the sensor calibration curves. If anyone is in the lab, can you help confirm? Thank you!",
    timestamp: "2 days ago",
    likesCount: 7,
    likedByUser: false,
    comments: [],
    collegeId: "CEA",
    tags: ["LabTrouble", "StructuralEngineering"],
    category: "LabHelp",
    reportsCount: 0
  }
];

export const INITIAL_RESOURCES: Resource[] = [
  {
    id: "res-1",
    title: "Vite + React 19 State Management Quick Guide",
    description: "A compact PDF guide explaining reactive props, hooks, and clean localStorage pattern state synchronization for CITC software development majors.",
    uploadedBy: SYSTEM_VIRTUAL_USERS[0],
    collegeId: "CITC",
    courseCode: "IT-312",
    downloadsCount: 142,
    fileType: "PDF",
    fileSize: "2.4 MB",
    timestamp: "1 day ago"
  },
  {
    id: "res-2",
    title: "Engineering Mechanics: Statics Formula Compilation",
    description: "Highly comprehensive review sheet capturing key formulas for centroids, moments of inertia, and beam stress tests.",
    uploadedBy: SYSTEM_VIRTUAL_USERS[3],
    collegeId: "CEA",
    courseCode: "ECE-211",
    downloadsCount: 98,
    fileType: "PDF",
    fileSize: "1.8 MB",
    timestamp: "3 days ago"
  },
  {
    id: "res-3",
    title: "Linear Algebra & Fourier Transforms for Computer Vision",
    description: "Excellent mathematics hand-written notes paired with practical code implementations. Essential for CITC and CSM juniors.",
    uploadedBy: SYSTEM_VIRTUAL_USERS[2],
    collegeId: "CSM",
    courseCode: "MATH-320",
    downloadsCount: 64,
    fileType: "PDF",
    fileSize: "5.1 MB",
    timestamp: "5 days ago"
  },
  {
    id: "res-4",
    title: "Lathe Machine Basic Operation & Safety Protocols",
    description: "Essential laboratory protocols, safety guidelines, and setup variables for mechanical technology students.",
    uploadedBy: SYSTEM_VIRTUAL_USERS[4],
    collegeId: "COT",
    courseCode: "MT-102",
    downloadsCount: 41,
    fileType: "DOCX",
    fileSize: "920 KB",
    timestamp: "1 week ago"
  }
];

export const INITIAL_LAB_PROJECTS: LabProject[] = [
  {
    id: "proj-1",
    title: "Solar-Powered Water Hyacinth Harvester",
    description: "An autonomous littoral drone aimed at clearing Cagayan de Oro riverways of congested biological growth. It uses custom Arduino-driven thrusters and a conveyor sorting mechanism.",
    teamLead: SYSTEM_VIRTUAL_USERS[3],
    collegeId: "CEA",
    tags: ["Arduino", "MechanicalDesign", "RenewableEnergy"],
    status: "Prototype Phase",
    lookingFor: "Need CITC student for remote GPS guidance programming & CSM student to test environmental chemical impact.",
    collaboratorsCount: 3,
    timestamp: "2 days ago"
  },
  {
    id: "proj-2",
    title: "Smart Classroom Energy Management System",
    description: "AI-enabled thermal and luminosity mapping array built using low-cost ESP32 microcontrollers to automatically power down empty academic lecture rooms across the USTP campus.",
    teamLead: SYSTEM_VIRTUAL_USERS[1],
    collegeId: "CITC",
    tags: ["IoT", "ESP32", "GreenCampus", "AI"],
    status: "Seeking Collaborators",
    lookingFor: "Requires COT (College of Technology) student for structural electric panel layout integration and load switch safety tests.",
    collaboratorsCount: 2,
    timestamp: "1 day ago"
  },
  {
    id: "proj-3",
    title: "AI-Assisted Phyto-remediation Analysis",
    description: "Software utilizing machine learning algorithms to map root growth progression of phytoremedial plants exposed to simulated heavy mineral industrial mining soil.",
    teamLead: SYSTEM_VIRTUAL_USERS[2],
    collegeId: "CSM",
    tags: ["MachineLearning", "Python", "Biology"],
    status: "Inception",
    lookingFor: "Seeking CITC programmer experienced in PyTorch or TensorFlow for image classification models.",
    collaboratorsCount: 1,
    timestamp: "4 days ago"
  }
];

export const INITIAL_MARKET_ITEMS: MarketItem[] = [
  {
    id: "item-1",
    title: "Scientific Calculator CASIO fx-991ES PLUS",
    price: 850,
    description: "Mint condition, used for two semesters. Perfect for engineering, mathematics, and science majors. Comes with original sliding cover shell and fresh battery.",
    seller: SYSTEM_VIRTUAL_USERS[2],
    category: "Electronics",
    contactEmail: "alexa.rose@ustp.edu.ph",
    timestamp: "Yesterday",
    sold: false
  },
  {
    id: "item-2",
    title: "Basic Drafting Instrument Set",
    price: 1200,
    description: "Includes professional engineering compass, scale rulers, professional triangular protractors, and custom storage case. Approved for CEA architecture/civil courses.",
    seller: SYSTEM_VIRTUAL_USERS[3],
    category: "Lab Gear",
    contactEmail: "dave.p@ustp.edu.ph",
    timestamp: "3 days ago",
    sold: false
  },
  {
    id: "item-3",
    title: "Introduction to Calculus (11th Global Edition)",
    price: 450,
    description: "Textbook covering limits, differentiation, integration, and multivariate coordinates. Minimal highlights inside. Half the original university bookstore price.",
    seller: SYSTEM_VIRTUAL_USERS[0], // Faculty
    category: "Textbooks",
    contactEmail: "jeanette.almine@ustp.edu.ph",
    timestamp: "5 days ago",
    sold: false
  },
  {
    id: "item-4",
    title: "Official CITC Department Polo Shirt",
    price: 300,
    description: "Size Medium. Worn twice, practically brand new. Required uniform for CITC wash days and official department gatherings.",
    seller: SYSTEM_VIRTUAL_USERS[1],
    category: "Uniforms",
    contactEmail: "malolot.mharweanjhymes24@gmail.com",
    timestamp: "1 week ago",
    sold: true
  }
];

export const INITIAL_CAMPUS_EVENTS: CampusEvent[] = [
  {
    id: "event-1",
    title: "Trailblazer Tech Hackathon 2026",
    description: "The biggest annual university-wide development challenge. Teams from CITC, CEA, CSM, and COT will pitch innovative prototypes tackling environmental and academic hurdles. Great prizes, free swag, and networking with local tech leaders.",
    date: "July 12, 2026",
    time: "8:00 AM - 5:00 PM (36-Hour Run)",
    location: "CITC Student Lounge & Gym Hall v4",
    organizer: "Computing Student Society & CITC Faculty",
    collegeId: "Global",
    rsvps: ["2024108844", "2024204122"],
    category: "Hackathon"
  },
  {
    id: "event-2",
    title: "Advanced AutoCAD & SolidWorks Seminar",
    description: "A fast-paced training workshop detailing modern solid-state modeling, parametric adjustments, and rapid prototyping workflows. Bring your own laptop with the required student license pre-installed.",
    date: "June 28, 2026",
    time: "1:30 PM - 4:30 PM",
    location: "CEA CAD Laboratory v2",
    organizer: "PICE (Philippine Institute of Civil Engineers) USTP",
    collegeId: "CEA",
    rsvps: ["2023190887"],
    category: "Seminar"
  },
  {
    id: "event-3",
    title: "Mathematics & Applied Sciences Symposium",
    description: "Presenting student research thesis papers regarding linear regressions, local bio-growth variables, and computational algorithms. Open to all colleges.",
    date: "July 05, 2026",
    time: "9:00 AM - 12:00 PM",
    location: "CSM Auditorium Room 101",
    organizer: "Collegiate Science Advocates",
    collegeId: "CSM",
    rsvps: ["2024204122", "2023300501"],
    category: "Seminar"
  }
];

export const ALUMNI_MENTORS: AlumnusMentor[] = [
  {
    id: "mentor-1",
    name: "Engr. Kenneth Macas",
    college: "CITC",
    graduationYear: 2021,
    currentRole: "Senior Software Engineer",
    company: "Google Asia-Pacific",
    skills: ["Cloud Architecture", "Go/Rust Systems", "Data Science Models"],
    contactEmail: "kenneth.macas@alumni.ustp.edu.ph",
    isAvailableForMentorship: true,
    featuredAdvice: "Never wait for classroom lectures to build production apps. Build, break, and deploy 10,000 hours of actual code while you are a student at CITC."
  },
  {
    id: "mentor-2",
    name: "Arch. Fiona Mae Ortiz",
    college: "CEA",
    graduationYear: 2018,
    currentRole: "Lead Urban Designer",
    company: "B+H Architects",
    skills: ["Sustainable Design", "BIM Workflows", "Urban Redevelopment"],
    contactEmail: "fiona.ortiz@alumni.ustp.edu.ph",
    isAvailableForMentorship: true,
    featuredAdvice: "The bridge between CITC's tech and CEA's structures is the future of sustainable cities. Team up across colleges to understand modern smart building standards."
  },
  {
    id: "mentor-3",
    name: "Dr. Ryan Paul Villarta",
    college: "CSM",
    graduationYear: 2015,
    currentRole: "Research Fellow",
    company: "Singapore National Institute of Science",
    skills: ["Nanotechnology", "Computational Physics", "Statistical Models"],
    contactEmail: "ryan.villarta@alumni.ustp.edu.ph",
    isAvailableForMentorship: false,
    featuredAdvice: "Science is the foundation of all technology resources. Invest heavily in understanding advanced physical and math paradigms during your student trials."
  }
];

export const INTEREST_CIRCLES = [
  {
    id: "circle-1",
    name: "Robotics & Automation Alliance",
    description: "Developing autonomous vehicles, micro-drones, and IoT sensors. Unites CEA electronics engineers, CITC software devs, and COT makers.",
    membersCount: 154,
    lead: "Christian Dave P."
  },
  {
    id: "circle-2",
    name: "USTP Developers' Guild",
    description: "A collective focused on open-source contributions, mobile development, and preparing students for competitive national hackathons.",
    membersCount: 220,
    lead: "Mharwean Malolot"
  },
  {
    id: "circle-3",
    name: "Debate and Critical Thinkers Society",
    description: "Developing discourse skills, debating university and national policies, and coordinating regular competitive parliamentary meetups.",
    membersCount: 88,
    lead: "Alexa Rose Cabanlit"
  },
  {
    id: "circle-4",
    name: "Eco-Tech Innovation Council",
    description: "Cross-disciplinary circle engineering sustainable systems for waste recycling, solar power setups, and clean organic bio-fuel tests.",
    membersCount: 112,
    lead: "Precious Mae G."
  }
];

export const COLLEGE_DEPARTMENTS_META = {
  Global: {
    color: "bg-amber-100 text-amber-800 border-amber-200",
    badgeColor: "bg-slate-200 text-slate-800",
    fullname: "University of Science and Technology of Southern Philippines"
  },
  CITC: {
    color: "bg-blue-50 text-blue-800 border-blue-200",
    badgeColor: "bg-blue-600 text-white",
    hoverColor: "hover:bg-blue-100",
    fullname: "College of Information Technology and Computing"
  },
  CEA: {
    color: "bg-amber-50 text-amber-800 border-amber-200",
    badgeColor: "bg-amber-600 text-white",
    hoverColor: "hover:bg-amber-100",
    fullname: "College of Engineering and Architecture"
  },
  CSM: {
    color: "bg-emerald-50 text-emerald-800 border-emerald-200",
    badgeColor: "bg-emerald-600 text-white",
    hoverColor: "hover:bg-emerald-100",
    fullname: "College of Science and Mathematics"
  },
  COT: {
    color: "bg-rose-50 text-rose-800 border-rose-200",
    badgeColor: "bg-rose-600 text-white",
    hoverColor: "hover:bg-rose-100",
    fullname: "College of Technology"
  }
};
