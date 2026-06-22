export interface User {
  studentId: string;
  name: string;
  email: string;
  role: 'Student' | 'Faculty' | 'Alumni';
  college: 'CITC' | 'CEA' | 'CSM' | 'COT' | 'Global';
  isVerified: boolean;
  avatar: string;
  reputationPoints: number;
  badges: string[];
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  timestamp: string;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  timestamp: string;
  likesCount: number;
  likedByUser: boolean;
  comments: Comment[];
  collegeId: 'CITC' | 'CEA' | 'CSM' | 'COT' | 'Global';
  tags: string[];
  category: 'General' | 'Research' | 'Announcement' | 'LabHelp';
  reportsCount: number;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  uploadedBy: User;
  collegeId: 'CITC' | 'CEA' | 'CSM' | 'COT';
  courseCode: string;
  downloadsCount: number;
  fileType: 'PDF' | 'ZIP' | 'DOCX' | 'PPTX' | 'DBC';
  fileSize: string;
  timestamp: string;
}

export interface LabProject {
  id: string;
  title: string;
  description: string;
  teamLead: User;
  collegeId: 'CITC' | 'CEA' | 'CSM' | 'COT';
  tags: string[];
  status: 'Inception' | 'Prototype Phase' | 'Testing' | 'Seeking Collaborators';
  lookingFor: string;
  collaboratorsCount: number;
  timestamp: string;
}

export interface MarketItem {
  id: string;
  title: string;
  price: number;
  description: string;
  seller: User;
  category: 'Textbooks' | 'Electronics' | 'Lab Gear' | 'Uniforms' | 'Other';
  image?: string;
  contactEmail: string;
  timestamp: string;
  sold: boolean;
}

export interface CampusEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  collegeId: 'CITC' | 'CEA' | 'CSM' | 'COT' | 'Global';
  rsvps: string[]; // studentIds of attendees
  category: 'Hackathon' | 'Seminar' | 'Sports' | 'Orientation' | 'Culture';
}

export interface AlumnusMentor {
  id: string;
  name: string;
  college: 'CITC' | 'CEA' | 'CSM' | 'COT';
  graduationYear: number;
  currentRole: string;
  company: string;
  skills: string[];
  contactEmail: string;
  isAvailableForMentorship: boolean;
  featuredAdvice: string;
}
