import React, { useState } from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  Award, 
  Send, 
  Check, 
  Sparkles, 
  Mail, 
  UserPlus, 
  BookOpen,
  LifeBuoy
} from 'lucide-react';
import { AlumnusMentor, User } from '../types';

interface AlumniSectionProps {
  mentors: AlumnusMentor[];
  currentUser: User | null;
  onOpenAuth: () => void;
}

export default function AlumniSection({
  mentors,
  currentUser,
  onOpenAuth
}: AlumniSectionProps) {
  const [requestedMentorsList, setRequestedMentorsList] = useState<string[]>([]);
  const [submittedQuestion, setSubmittedQuestion] = useState(false);
  const [questionText, setQuestionText] = useState('');

  const handleRequestMentorship = (mentor: AlumnusMentor) => {
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    if (requestedMentorsList.includes(mentor.id)) return;

    setRequestedMentorsList(prev => [...prev, mentor.id]);
    alert(`🎓 [USTP ALUMNI HUB] Mentorship proposal submitted! "${mentor.name}" has been notified via their verified alumni mail endpoint (${mentor.contactEmail}). An automated meeting token was logged to your academic clipboard!`);
  };

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;
    if (!currentUser) {
      onOpenAuth();
      return;
    }

    setSubmittedQuestion(true);
    setTimeout(() => {
      setSubmittedQuestion(false);
      setQuestionText('');
      alert(`💬 Advice Query Dispatched! Your inquiry was posted to the Alumni Advisory Slack stream. Alumni mentors frequently check this queue to help students!`);
    }, 1000);
  };

  return (
    <div className="space-y-6">

      {/* Intro Banner */}
      <div className="bg-slate-900 border-b-4 border-ustp-gold rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[10px] bg-ustp-gold text-slate-900 font-bold px-2 py-0.5 rounded uppercase font-mono">
            USTP GRADUATED ALUMNI REVOLUTION
          </span>
          <h2 className="text-xl font-bold font-display text-white mt-1">
            Alumni Mentorship Bridge & Job Leads
          </h2>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed mt-0.5">
            Synchronize with successful trailblazers who graduated from CITC, CEA, CSM, and COT. Request direct study reviews, schedule professional resume evaluations, or explore global job referral opportunities.
          </p>
        </div>

        <span className="p-3 bg-white/5 rounded-full border border-white/20 hidden md:block">
          <GraduationCap className="h-8 w-8 text-ustp-gold" />
        </span>
      </div>

      {/* Alumni Hub Advice board */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-1000 font-display flex items-center gap-1.5">
            <BookOpen className="h-4.5 w-4.5 text-ustp-blue" />
            Post an Academic Career Triage Question
          </h3>
          <p className="text-[11px] text-slate-500">
            Confused about industry requirements, soft skills, or choosing your engineering specializations? Post your question below for alumni review.
          </p>
        </div>

        <form onSubmit={handleQuestionSubmit} className="flex gap-2">
          <input
            type="text"
            required
            placeholder="e.g. How helpful is learning Go/Rust for local tech roles vs web dev?"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="flex-grow bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-ustp-blue focus:bg-white"
          />
          <button
            type="submit"
            className="text-xs bg-slate-950 text-white font-bold px-4 rounded-lg hover:bg-slate-850 transition cursor-pointer flex items-center gap-1 shrink-0"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Ask Alumni</span>
          </button>
        </form>
      </div>

      {/* Mentors Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mentors.map((men) => {
          const hasRequested = requestedMentorsList.includes(men.id);

          return (
            <div 
              key={men.id}
              className="bg-white rounded-2xl border border-slate-150 p-5 shadow-2xs hover:shadow-xs hover:border-slate-300 transition flex flex-col justify-between space-y-4 animate-in fade-in duration-200"
            >
              
              <div className="space-y-3">
                
                {/* Header tag */}
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-wider font-extrabold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full border border-slate-250">
                    {men.college} Alumnus • Class of {men.graduationYear}
                  </span>

                  <span className={`h-2.5 w-2.5 rounded-full ${men.isAvailableForMentorship ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} title={men.isAvailableForMentorship ? "Accepting Mentees" : "At Mentorship Limit"}></span>
                </div>

                {/* Profile Title */}
                <div>
                  <h3 className="text-sm font-bold text-slate-950 font-display flex items-center gap-1">
                    {men.name}
                    <Sparkles className="h-4 w-4 text-ustp-gold fill-ustp-gold" />
                  </h3>
                  
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                    <Briefcase className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span className="font-semibold text-slate-700">{men.currentRole}</span>
                    <span>at</span>
                    <span className="font-extrabold text-ustp-blue">{men.company}</span>
                  </div>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1">
                  {men.skills.map((sk) => (
                    <span 
                      key={sk} 
                      className="text-[9px] bg-sky-50 text-sky-800 font-mono font-medium px-1.5 py-0.5 rounded border border-sky-100"
                    >
                      {sk}
                    </span>
                  ))}
                </div>

                {/* advice callout */}
                <div className="bg-slate-50/80 p-3 rounded-lg border border-slate-200/60 flex items-start gap-1.5 relative">
                  <p className="text-[11px] text-slate-600 line-clamp-4 leading-relaxed italic">
                    "{men.featuredAdvice}"
                  </p>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => handleRequestMentorship(men)}
                  disabled={hasRequested || !men.isAvailableForMentorship}
                  className={`w-full text-xs font-bold py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    hasRequested
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-extrabold'
                      : men.isAvailableForMentorship
                        ? 'bg-ustp-blue hover:bg-ustp-blue-light text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                  }`}
                >
                  {hasRequested ? <Check className="h-3.5 w-3.5" /> : <UserPlus className="h-3.5 w-3.5" />}
                  <span>
                    {hasRequested 
                      ? 'Mentorship Synced' 
                      : men.isAvailableForMentorship 
                        ? 'Request Active Mentorship' 
                        : 'Full Slots (Ask advice in General)'}
                  </span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
