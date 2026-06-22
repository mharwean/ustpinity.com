import { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Award, 
  HelpCircle, 
  Info, 
  X,
  Bell,
  Cpu,
  Bookmark,
  Sparkles,
  ExternalLink,
  Users,
  Grid
} from 'lucide-react';

import { User, Post, Resource, LabProject, MarketItem, CampusEvent, AlumnusMentor } from './types';
import { 
  SYSTEM_VIRTUAL_USERS, 
  INITIAL_POSTS, 
  INITIAL_RESOURCES, 
  INITIAL_LAB_PROJECTS, 
  INITIAL_MARKET_ITEMS, 
  INITIAL_CAMPUS_EVENTS, 
  ALUMNI_MENTORS, 
  INTEREST_CIRCLES 
} from './data';

import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import FeedSection from './components/FeedSection';
import CollegesSection from './components/CollegesSection';
import InnovationBoard from './components/InnovationBoard';
import MarketplaceSection from './components/MarketplaceSection';
import EventsSection from './components/EventsSection';
import AlumniSection from './components/AlumniSection';

export default function App() {
  // --- Persistent State ---
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('ustp_user_v1');
    return saved ? JSON.parse(saved) : SYSTEM_VIRTUAL_USERS[1]; // default verified student
  });

  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('ustp_posts_v1');
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });

  const [resources, setResources] = useState<Resource[]>(() => {
    const saved = localStorage.getItem('ustp_resources_v1');
    return saved ? JSON.parse(saved) : INITIAL_RESOURCES;
  });

  const [labProjects, setLabProjects] = useState<LabProject[]>(() => {
    const saved = localStorage.getItem('ustp_labprojects_v1');
    return saved ? JSON.parse(saved) : INITIAL_LAB_PROJECTS;
  });

  const [marketItems, setMarketItems] = useState<MarketItem[]>(() => {
    const saved = localStorage.getItem('ustp_market_v1');
    return saved ? JSON.parse(saved) : INITIAL_MARKET_ITEMS;
  });

  const [events, setEvents] = useState<CampusEvent[]>(() => {
    const saved = localStorage.getItem('ustp_events_v1');
    return saved ? JSON.parse(saved) : INITIAL_CAMPUS_EVENTS;
  });

  const [mentors, setMentors] = useState<AlumnusMentor[]>(() => {
    return ALUMNI_MENTORS;
  });

  // --- Active Tab Navigation ---
  const [activeTab, setActiveTab] = useState<'feed' | 'colleges' | 'innovation' | 'marketplace' | 'events' | 'alumni'>('feed');
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Filter tag selected from sidebar interests circle click
  const [selectedInterestTag, setSelectedInterestTag] = useState<string | null>(null);

  // Save changes to localStorage on change
  useEffect(() => {
    localStorage.setItem('ustp_posts_v1', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('ustp_resources_v1', JSON.stringify(resources));
  }, [resources]);

  useEffect(() => {
    localStorage.setItem('ustp_labprojects_v1', JSON.stringify(labProjects));
  }, [labProjects]);

  useEffect(() => {
    localStorage.setItem('ustp_market_v1', JSON.stringify(marketItems));
  }, [marketItems]);

  useEffect(() => {
    localStorage.setItem('ustp_events_v1', JSON.stringify(events));
  }, [events]);

  // --- Actions ---
  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('ustp_user_v1', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('ustp_user_v1');
  };

  const handleAddPost = (
    content: string, 
    category: 'General' | 'Research' | 'Announcement' | 'LabHelp', 
    collegeId: 'CITC' | 'CEA' | 'CSM' | 'COT' | 'Global', 
    tags: string[]
  ) => {
    if (!currentUser) return;
    const newPost: Post = {
      id: `post-${Date.now()}`,
      author: currentUser,
      content,
      timestamp: "Just now",
      likesCount: 0,
      likedByUser: false,
      comments: [],
      collegeId,
      tags,
      category,
      reportsCount: 0
    };
    setPosts([newPost, ...posts]);

    // Reward user reputation points for creating high quality posts!
    const updatedUser = {
      ...currentUser,
      reputationPoints: currentUser.reputationPoints + 15
    };
    setCurrentUser(updatedUser);
    localStorage.setItem('ustp_user_v1', JSON.stringify(updatedUser));
  };

  const handleLikePost = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const isCurrentlyLiked = p.likedByUser;
        return {
          ...p,
          likesCount: isCurrentlyLiked ? p.likesCount - 1 : p.likesCount + 1,
          likedByUser: !isCurrentlyLiked
        };
      }
      return p;
    }));
  };

  const handleAddComment = (postId: string, content: string) => {
    if (!currentUser) return;
    const newComment = {
      id: `c-${Date.now()}`,
      author: currentUser,
      content,
      timestamp: "Just now"
    };

    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...p.comments, newComment]
        };
      }
      return p;
    }));

    // Reward reputation Points
    const updatedUser = {
      ...currentUser,
      reputationPoints: currentUser.reputationPoints + 5
    };
    setCurrentUser(updatedUser);
    localStorage.setItem('ustp_user_v1', JSON.stringify(updatedUser));
  };

  const handleReportPost = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        alert("⚠️ Post Content Reported. Our automated student board guidelines will hide this if it flags over 3 student reports.");
        return {
          ...p,
          reportsCount: p.reportsCount + 1
        };
      }
      return p;
    }));
  };

  const handleAddResource = (
    title: string, 
    description: string, 
    collegeId: 'CITC' | 'CEA' | 'CSM' | 'COT', 
    courseCode: string, 
    fileType: 'PDF' | 'ZIP' | 'DOCX' | 'PPTX' | 'DBC', 
    fileSize: string
  ) => {
    if (!currentUser) return;
    const newRes: Resource = {
      id: `res-${Date.now()}`,
      title,
      description,
      uploadedBy: currentUser,
      collegeId,
      courseCode,
      downloadsCount: 0,
      fileType,
      fileSize,
      timestamp: "Just now"
    };
    setResources([newRes, ...resources]);

    // Reward points for academic collaboration
    const updatedUser = {
      ...currentUser,
      reputationPoints: currentUser.reputationPoints + 30
    };
    setCurrentUser(updatedUser);
    localStorage.setItem('ustp_user_v1', JSON.stringify(updatedUser));
  };

  const handleAddProject = (
    title: string, 
    description: string, 
    collegeId: 'CITC' | 'CEA' | 'CSM' | 'COT', 
    tags: string[], 
    status: 'Inception' | 'Prototype Phase' | 'Testing' | 'Seeking Collaborators', 
    lookingFor: string
  ) => {
    if (!currentUser) return;
    const newProj: LabProject = {
      id: `proj-${Date.now()}`,
      title,
      description,
      teamLead: currentUser,
      collegeId,
      tags,
      status,
      lookingFor,
      collaboratorsCount: 1,
      timestamp: "Just now"
    };
    setLabProjects([newProj, ...labProjects]);

    // Points
    const updatedUser = {
      ...currentUser,
      reputationPoints: currentUser.reputationPoints + 40
    };
    setCurrentUser(updatedUser);
    localStorage.setItem('ustp_user_v1', JSON.stringify(updatedUser));
  };

  const handleAddItem = (
    title: string, 
    price: number, 
    description: string, 
    category: 'Textbooks' | 'Electronics' | 'Lab Gear' | 'Uniforms' | 'Other', 
    contactEmail: string
  ) => {
    if (!currentUser) return;
    const newItem: MarketItem = {
      id: `item-${Date.now()}`,
      title,
      price,
      description,
      seller: currentUser,
      category,
      contactEmail,
      timestamp: "Just now",
      sold: false
    };
    setMarketItems([newItem, ...marketItems]);
  };

  const handleAddEvent = (
    title: string, 
    description: string, 
    date: string, 
    time: string, 
    location: string, 
    organizer: string, 
    collegeId: 'CITC' | 'CEA' | 'CSM' | 'COT' | 'Global', 
    category: 'Hackathon' | 'Seminar' | 'Sports' | 'Orientation' | 'Culture'
  ) => {
    if (!currentUser) return;
    const newEvt: CampusEvent = {
      id: `event-${Date.now()}`,
      title,
      description,
      date,
      time,
      location,
      organizer,
      collegeId,
      rsvps: [currentUser.studentId],
      category
    };
    setEvents([newEvt, ...events]);

    // Points
    const updatedUser = {
      ...currentUser,
      reputationPoints: currentUser.reputationPoints + 20
    };
    setCurrentUser(updatedUser);
    localStorage.setItem('ustp_user_v1', JSON.stringify(updatedUser));
  };

  const handleToggleRsvp = (eventId: string) => {
    if (!currentUser) return;
    const stuId = currentUser.studentId;

    setEvents(prev => prev.map(evt => {
      if (evt.id === eventId) {
        const alreadyRsvp = evt.rsvps.includes(stuId);
        let updatedRsvps = [];
        if (alreadyRsvp) {
          updatedRsvps = evt.rsvps.filter(id => id !== stuId);
        } else {
          updatedRsvps = [...evt.rsvps, stuId];
          alert(`🌟 RSVP Confirmed! You are registered for the event. We have credited +20 Reputation to your trail tracker!`);
        }
        return {
          ...evt,
          rsvps: updatedRsvps
        };
      }
      return evt;
    }));
  };

  // Safe tab selection
  const selectTab = (tab: typeof activeTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans select-none antialiased">
      
      {/* Top Professional Header */}
      <Navbar 
        currentUser={currentUser} 
        onLogout={handleLogout} 
        onOpenAuth={() => setAuthModalOpen(true)} 
      />

      {/* Main Container Layout */}
      <div className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT COLUMN: Sidebar menu, profile checklist, and club guilds (Span 3) */}
          <aside className="lg:col-span-3 space-y-6">
            
            {/* Quick Profile Overview / Welcome */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3 relative overflow-hidden">
              <div className="absolute right-0 top-0 h-1.5 w-full bg-ustp-gold"></div>
              {currentUser ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="h-12 w-12 rounded-xl object-cover border-2 border-ustp-gold"
                    />
                    <div>
                      <h3 className="text-xs font-black text-slate-900 font-display leading-tight truncate">
                        {currentUser.name}
                      </h3>
                      <p className="text-[10px] text-slate-500 font-mono tracking-tighter mt-0.5">
                        ID: {currentUser.studentId}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                    <span>Rank:</span>
                    <span className="font-bold text-ustp-blue-light">{currentUser.role === 'Faculty' ? 'Academic Guide' : 'Trailblazer Master'}</span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-slate-100 p-2 rounded-lg text-[10px] font-semibold text-slate-700">
                    <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Official @ustp.edu.ph Verified ID</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 space-y-2">
                  <HelpCircle className="h-8 w-8 mx-auto text-slate-300" />
                  <p className="text-xs text-slate-500">
                    Access local labs, upload lecture materials, and trade goods by activating your university gateway profile.
                  </p>
                  <button
                    onClick={() => setAuthModalOpen(true)}
                    className="text-xs font-bold text-slate-900 bg-ustp-gold py-1.5 px-4 rounded-lg hover:bg-ustp-gold-dark transition shadow-2xs cursor-pointer inline-block"
                  >
                    Activate Gateway
                  </button>
                </div>
              )}
            </div>

            {/* Platform Sub-Sections Navigation (The "Hubs" Model) */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-3.5 space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2 pb-2 border-b border-slate-100 mb-2">
                MAIN CAMPUS HUBS
              </p>

              <button
                onClick={() => selectTab('feed')}
                className={`w-full text-xs font-bold px-3 py-2.5 rounded-xl text-left transition flex items-center justify-between cursor-pointer ${
                  activeTab === 'feed'
                    ? 'bg-ustp-blue text-white shadow-2xs font-extrabold'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span>🌍 Universal Feed</span>
                <span className="text-[9px] font-mono bg-white/10 px-1.5 rounded">{posts.length}</span>
              </button>

              <button
                onClick={() => selectTab('colleges')}
                className={`w-full text-xs font-bold px-3 py-2.5 rounded-xl text-left transition flex items-center justify-between cursor-pointer ${
                  activeTab === 'colleges'
                    ? 'bg-ustp-blue text-white shadow-2xs font-extrabold'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span>🏫 Department Colleges</span>
                <span className="text-[9px] font-mono bg-white/10 px-1.5 rounded">4 Hubs</span>
              </button>

              <button
                onClick={() => selectTab('innovation')}
                className={`w-full text-xs font-bold px-3 py-2.5 rounded-xl text-left transition flex items-center justify-between cursor-pointer ${
                  activeTab === 'innovation'
                    ? 'bg-ustp-blue text-white shadow-2xs font-extrabold'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span>🧪 Innovation & Lab Board</span>
                <span className="text-[9px] font-mono bg-white/10 px-1.5 rounded">{labProjects.length}</span>
              </button>

              <button
                onClick={() => selectTab('marketplace')}
                className={`w-full text-xs font-bold px-3 py-2.5 rounded-xl text-left transition flex items-center justify-between cursor-pointer ${
                  activeTab === 'marketplace'
                    ? 'bg-ustp-blue text-white shadow-2xs font-extrabold'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span>🎒 Scholar Marketplace</span>
                <span className="text-[9px] font-mono bg-white/10 px-1.5 rounded">{marketItems.length}</span>
              </button>

              <button
                onClick={() => selectTab('events')}
                className={`w-full text-xs font-bold px-3 py-2.5 rounded-xl text-left transition flex items-center justify-between cursor-pointer ${
                  activeTab === 'events'
                    ? 'bg-ustp-blue text-white shadow-2xs font-extrabold'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span>📅 Events Calendar</span>
                <span className="text-[9px] font-mono bg-white/10 px-1.5 rounded">{events.length}</span>
              </button>

              <button
                onClick={() => selectTab('alumni')}
                className={`w-full text-xs font-bold px-3 py-2.5 rounded-xl text-left transition flex items-center justify-between cursor-pointer ${
                  activeTab === 'alumni'
                    ? 'bg-ustp-blue text-white shadow-2xs font-extrabold'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span>🎓 Alumni Mentor Directory</span>
                <span className="text-[9px] font-mono bg-white/10 px-1.5 rounded">Active</span>
              </button>
            </div>

            {/* Interest Circles Box (Cross-Functional) */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Cross-functional Clubs
                </span>
                <Users className="h-4 w-4 text-slate-400" />
              </div>
              <div className="space-y-2.5">
                {INTEREST_CIRCLES.map((circle) => (
                  <div key={circle.id} className="text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-805 cursor-pointer hover:text-ustp-blue-light">
                        {circle.name}
                      </span>
                      <span className="text-[9px] text-slate-450 bg-slate-100 px-1 py-0.5 rounded font-mono font-bold">
                        {circle.membersCount} m
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-normal line-clamp-2">
                      {circle.description}
                    </p>
                    <div className="text-[9px] text-slate-400 italic">
                      Lead student: {circle.lead}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </aside>

          {/* MIDDLE COLUMN: Hub viewport rendering selected core tab (Span 6) */}
          <main className="lg:col-span-6 space-y-6">
            
            {activeTab === 'feed' && (
              <FeedSection 
                posts={posts} 
                currentUser={currentUser} 
                onAddPost={handleAddPost} 
                onLikePost={handleLikePost} 
                onAddComment={handleAddComment} 
                onReportPost={handleReportPost} 
                onOpenAuth={() => setAuthModalOpen(true)} 
              />
            )}

            {activeTab === 'colleges' && (
              <CollegesSection 
                resources={resources} 
                currentUser={currentUser} 
                onAddResource={handleAddResource} 
                onOpenAuth={() => setAuthModalOpen(true)} 
              />
            )}

            {activeTab === 'innovation' && (
              <InnovationBoard 
                projects={labProjects} 
                currentUser={currentUser} 
                onAddProject={handleAddProject} 
                onOpenAuth={() => setAuthModalOpen(true)} 
              />
            )}

            {activeTab === 'marketplace' && (
              <MarketplaceSection 
                items={marketItems} 
                currentUser={currentUser} 
                onAddItem={handleAddItem} 
                onOpenAuth={() => setAuthModalOpen(true)} 
              />
            )}

            {activeTab === 'events' && (
              <EventsSection 
                events={events} 
                currentUser={currentUser} 
                onAddEvent={handleAddEvent} 
                onOpenAuth={() => setAuthModalOpen(true)} 
                onToggleRsvp={handleToggleRsvp} 
              />
            )}

            {activeTab === 'alumni' && (
              <AlumniSection 
                mentors={mentors} 
                currentUser={currentUser} 
                onOpenAuth={() => setAuthModalOpen(true)} 
              />
            )}

          </main>

          {/* RIGHT COLUMN: Campus Bulletins and Reputation League (Span 3) */}
          <aside className="lg:col-span-3 space-y-6">
            
            {/* Campus System bulletins */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 space-y-3 relative overflow-hidden">
              <div className="flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <span className="p-1.5 bg-amber-50 rounded text-amber-600">
                  <Bell className="h-4.5 w-4.5" />
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  CAMPUS BULLETINS
                </span>
              </div>

              <div className="space-y-3 text-xs leading-normal">
                <div className="space-y-0.5">
                  <span className="text-[9px] text-amber-700 font-mono font-bold uppercase block">
                    Admissions Dept • June 22
                  </span>
                  <span className="font-bold text-slate-900 block leading-tight">
                    Dean's List Applications Open
                  </span>
                  <p className="text-[10px] text-slate-600 line-clamp-2">
                    CITC and CEA student applications for Academic honors must submit validated transcripts before June 30.
                  </p>
                </div>

                <div className="space-y-0.5 pt-2 border-t border-slate-100">
                  <span className="text-[9px] text-indigo-700 font-mono font-bold uppercase block">
                    CITC Laboratory • June 20
                  </span>
                  <span className="font-bold text-slate-900 block leading-tight">
                    Server Maintenance Schedule
                  </span>
                  <p className="text-[10px] text-slate-600 line-clamp-2">
                    The CDO main computer lab server will undergo regular maintenance this Sunday. Local git backups advised.
                  </p>
                </div>
              </div>
            </div>

            {/* Student Reputation Tally / Gamification leaderboard */}
            <div className="bg-white rounded-2xl border border-slate-205/85 shadow-xs p-4 space-y-3">
              <div className="flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <span className="p-1.5 bg-ustp-blue/10 rounded text-ustp-blue">
                  <Award className="h-4.5 w-4.5 text-ustp-blue" />
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  REPUTATION LEAGUE
                </span>
              </div>

              <p className="text-[10px] text-slate-500 leading-normal">
                Earn badges and rep scores by uploading highly-rated lecture PDFs, helping in lab boards, or organizing workshops.
              </p>

              <div className="space-y-2 pt-2 text-xs">
                {SYSTEM_VIRTUAL_USERS.map((user, index) => {
                  return (
                    <div key={user.studentId} className="flex items-center justify-between bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-slate-400 font-bold w-3">
                          {index + 1}
                        </span>
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="h-6 w-6 rounded-full object-cover shrink-0"
                        />
                        <span className="font-semibold text-slate-800 text-[11px] truncate max-w-[100px]">
                          {user.name.split(' ')[0]}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Sparkles className="h-3 w-3 text-ustp-gold fill-ustp-gold" />
                        <span className="font-mono font-bold text-slate-700 text-[10px]">
                          {user.reputationPoints}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </aside>

        </div>
      </div>

      {/* Verification Auth Gateway Dialog */}
      <AuthModal 
        isOpen={authModalOpen} 
        onLogin={handleLogin} 
        onClose={() => setAuthModalOpen(false)} 
      />

      {/* Simple Academic Footer info */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-6 text-xs text-center font-display uppercase tracking-wider">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p>© 2026 USTP Campus Connect Social Network</p>
          <div className="text-[10px] text-slate-500 font-mono tracking-wide">
            Cagayan de Oro Main Campus • Unified Information & Academic Hub
          </div>
        </div>
      </footer>

    </div>
  );
}
