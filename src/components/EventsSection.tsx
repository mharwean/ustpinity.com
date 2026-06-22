import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  PlusCircle, 
  Check, 
  Sparkles,
  Award,
  ListFilter
} from 'lucide-react';
import { CampusEvent, User } from '../types';

interface EventsSectionProps {
  events: CampusEvent[];
  currentUser: User | null;
  onAddEvent: (title: string, description: string, date: string, time: string, location: string, organizer: string, collegeId: 'CITC' | 'CEA' | 'CSM' | 'COT' | 'Global', category: 'Hackathon' | 'Seminar' | 'Sports' | 'Orientation' | 'Culture') => void;
  onOpenAuth: () => void;
  onToggleRsvp: (eventId: string) => void;
}

export default function EventsSection({
  events,
  currentUser,
  onAddEvent,
  onOpenAuth,
  onToggleRsvp
}: EventsSectionProps) {
  const [selectedCollegeScope, setSelectedCollegeScope] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [isAddingEvent, setIsAddingEvent] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('July 15, 2026');
  const [time, setTime] = useState('10:00 AM');
  const [location, setLocation] = useState('CITC Student Lounge');
  const [organizer, setOrganizer] = useState('USTP Developers Guild');
  const [collegeId, setCollegeId] = useState<'CITC' | 'CEA' | 'CSM' | 'COT' | 'Global'>('Global');
  const [category, setCategory] = useState<'Hackathon' | 'Seminar' | 'Sports' | 'Orientation' | 'Culture'>('Seminar');

  const handleAddEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    if (!title.trim() || !organizer.trim() || !location.trim()) return;

    onAddEvent(title, description, date, time, location, organizer, collegeId, category);

    // Reset Form
    setTitle('');
    setDescription('');
    setDate('July 15, 2026');
    setTime('10:00 AM');
    setLocation('CITC Student Lounge');
    setOrganizer('USTP Developers Guild');
    setCategory('Seminar');
    setCollegeId('Global');
    setIsAddingEvent(false);
  };

  const handleRsvpClick = (eventId: string) => {
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    onToggleRsvp(eventId);
  };

  const categories = ['ALL', 'Hackathon', 'Seminar', 'Sports', 'Orientation', 'Culture'];

  const filteredEvents = events.filter(evt => {
    const passScope = selectedCollegeScope === 'ALL' || evt.collegeId === selectedCollegeScope;
    const passCat = selectedCategory === 'ALL' || evt.category === selectedCategory;
    return passScope && passCat;
  });

  return (
    <div className="space-y-6">

      {/* Intro display box */}
      <div className="bg-slate-900 border-b-4 border-ustp-gold rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[10px] bg-ustp-gold text-slate-900 font-bold px-2 py-0.5 rounded uppercase font-mono">
            USTP CENTRALIZED EVENTS SYSTEM
          </span>
          <h2 className="text-xl font-bold font-display text-white mt-1">
            Official Campus Interactive Calendar
          </h2>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed mt-0.5 font-sans">
            Never miss a departmental hackathon, certified scientific webinar, lab demonstration, or campus sports meet. RSVP to sync updates and earn reputation points!
          </p>
        </div>

        <button
          onClick={() => {
            if (!currentUser) onOpenAuth();
            else setIsAddingEvent(!isAddingEvent);
          }}
          className="text-xs bg-ustp-gold hover:bg-ustp-gold-dark text-slate-950 font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 shrink-0 shadow-sm cursor-pointer"
        >
          <PlusCircle className="h-4 w-4" />
          Propose Campus Event
        </button>
      </div>

      {/* Propose Event Form Panel */}
      {isAddingEvent && (
        <form 
          onSubmit={handleAddEventSubmit}
          className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4 animate-in slide-in-from-top-2 duration-200"
        >
          <div className="border-b pb-2 border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 font-display uppercase tracking-wide">
              Document & Publish Corporate Campus Event
            </span>
            <span className="text-[10px] text-slate-400">Created by: {currentUser?.name}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                Event Title / Seminar Subject *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. AutoCAD & SolidWorks Review"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                Collegiate Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white"
              >
                <option value="Seminar">Seminar / Workshop</option>
                <option value="Hackathon">Trailblazer Hackathon</option>
                <option value="Sports">Sports Meet</option>
                <option value="Orientation">Orientation / Assembly</option>
                <option value="Culture">Arts & Culture Festival</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                Host College / Faculty Scope
              </label>
              <select
                value={collegeId}
                onChange={(e) => setCollegeId(e.target.value as any)}
                className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white"
              >
                <option value="Global">Global (All Campus)</option>
                <option value="CITC">CITC (Computing)</option>
                <option value="CEA">CEA (Engineering)</option>
                <option value="CSM">CSM (Science & Math)</option>
                <option value="COT">COT (Technology)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                Scheduled Date *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. July 15, 2026"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                Time Interval *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 1:30 PM - 4:30 PM"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                Physical Location / Lab Hall *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. CEA Lab Room 102"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                Organizer Club / Student Body Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Philippine Society of Mechanical Engrs (PSME)"
                value={organizer}
                onChange={(e) => setOrganizer(e.target.value)}
                className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                Promotional Text / Synopsis
              </label>
              <input
                type="text"
                placeholder="Highlight speakers, software setup needs, or target audience profiles..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 text-xs pt-1">
            <button
              type="button"
              onClick={() => setIsAddingEvent(false)}
              className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-ustp-blue text-white px-4 py-1.5 rounded font-semibold"
            >
              Publish Event
            </button>
          </div>
        </form>
      )}

      {/* Filters array */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-100 p-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700">
        
        {/* Left selector: Category */}
        <div className="flex items-center gap-2">
          <ListFilter className="h-4 w-4 text-slate-400 shrink-0 ml-1" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Category:
          </span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="flex-grow bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium"
          >
            <option value="ALL">All Categories</option>
            <option value="Hackathon">🏆 Hackathons</option>
            <option value="Seminar">🎓 Seminars & Workshops</option>
            <option value="Sports">🏀 Sports Activities</option>
            <option value="Orientation">📚 Orientation/Assembly</option>
            <option value="Culture">🎨 Arts & Culture</option>
          </select>
        </div>

        {/* Right selector: Scope/College */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-2">
            Scope Filter:
          </span>
          <select
            value={selectedCollegeScope}
            onChange={(e) => setSelectedCollegeScope(e.target.value)}
            className="flex-grow bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium font-display"
          >
            <option value="ALL">🌐 All Departments</option>
            <option value="Global">🗣️ University Global Only</option>
            <option value="CITC">💻 CITC Computing</option>
            <option value="CEA">⚙️ CEA Engineering</option>
            <option value="CSM">📐 CSM Science/Math</option>
            <option value="COT">🗜️ COT Technology</option>
          </select>
        </div>

      </div>

      {/* Events Listing Staggered */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEvents.length === 0 ? (
          <div className="md:col-span-2 py-8 text-center text-slate-400 text-xs bg-slate-50 border border-dashed rounded-xl">
            No active events fit this department or category filter.
          </div>
        ) : (
          filteredEvents.map((evt) => {
            const hasRsvp = currentUser ? evt.rsvps.includes(currentUser.studentId) : false;

            return (
              <div 
                key={evt.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-xs hover:border-slate-350 transition flex flex-col justify-between"
              >
                
                {/* Event Top branding */}
                <div className="p-4 bg-slate-50 border-b border-slate-150 flex items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider font-mono text-slate-400">
                      Org: {evt.organizer}
                    </span>
                  </div>

                  <span className="text-[9px] bg-slate-200/90 text-slate-700 border border-slate-300 font-black px-2 py-0.5 rounded-full uppercase">
                    {evt.category}
                  </span>
                </div>

                {/* Event Main content */}
                <div className="p-5 space-y-3 flex-grow">
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] bg-ustp-orange text-white font-bold px-1.5 rounded uppercase">
                        {evt.collegeId} Hub
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold">Scheduled Entry</span>
                    </div>
                    <h3 className="text-sm font-extrabold text-slate-900 font-display">
                      {evt.title}
                    </h3>
                  </div>

                  <p className="text-[11px] text-slate-600 line-clamp-3 leading-relaxed font-sans">
                    {evt.description}
                  </p>

                  <div className="space-y-1.5 pt-2 text-[11px] text-slate-550 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <Calendar className="h-3.5 w-3.5 text-ustp-orange" />
                      <span className="font-semibold">{evt.date}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      <span>{evt.time}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      <span className="truncate">{evt.location}</span>
                    </div>
                  </div>

                </div>

                {/* Event Footer RSVP buttons */}
                <div className="bg-slate-50/70 py-3 px-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-slate-500 flex items-center gap-1 font-mono">
                    <Users className="h-3.5 w-3.5 text-slate-400" />
                    <span>{evt.rsvps.length} Student RSVP'd</span>
                  </span>

                  <button
                    onClick={() => handleRsvpClick(evt.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all flex items-center gap-1 ${
                      hasRsvp
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-250 font-bold'
                        : 'bg-ustp-blue hover:bg-ustp-blue-light text-white'
                    }`}
                  >
                    {hasRsvp && <Check className="h-3.5 w-3.5" />}
                    <span>{hasRsvp ? "Attending!" : "Reserve My Seat (+20 Rep)"}</span>
                  </button>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
