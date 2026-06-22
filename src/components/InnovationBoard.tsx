import React, { useState } from 'react';
import { 
  Lightbulb, 
  Users, 
  Cpu, 
  Atom, 
  Wrench, 
  Building, 
  PlusCircle, 
  Sparkles, 
  ArrowRight, 
  Check, 
  Heart,
  Share2,
  BookmarkCheck
} from 'lucide-react';
import { LabProject, User } from '../types';

interface InnovationBoardProps {
  projects: LabProject[];
  currentUser: User | null;
  onAddProject: (title: string, description: string, collegeId: 'CITC' | 'CEA' | 'CSM' | 'COT', tags: string[], status: 'Inception' | 'Prototype Phase' | 'Testing' | 'Seeking Collaborators', lookingFor: string) => void;
  onOpenAuth: () => void;
}

export default function InnovationBoard({
  projects,
  currentUser,
  onAddProject,
  onOpenAuth
}: InnovationBoardProps) {
  const [joinedProjects, setJoinedProjects] = useState<string[]>([]);
  const [likedProjects, setLikedProjects] = useState<string[]>([]);
  const [isRegistering, setIsRegistering] = useState(false);

  // Matchmaking engine states
  const [matchMyCollege, setMatchMyCollege] = useState<'CITC' | 'CEA' | 'CSM' | 'COT'>('CITC');
  const [matchTargetRequirement, setMatchTargetRequirement] = useState<'CITC' | 'CEA' | 'CSM' | 'COT'>('CEA');
  const [matchmakingResult, setMatchmakingResult] = useState<any | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [collegeId, setCollegeId] = useState<'CITC' | 'CEA' | 'CSM' | 'COT'>('CITC');
  const [lookingFor, setLookingFor] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [status, setStatus] = useState<'Inception' | 'Prototype Phase' | 'Testing' | 'Seeking Collaborators'>('Seeking Collaborators');

  const handleRegisterProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    if (!title.trim() || !lookingFor.trim()) return;

    const parsedTags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    onAddProject(title, description, collegeId, parsedTags, status, lookingFor);

    // Reset Form
    setTitle('');
    setDescription('');
    setLookingFor('');
    setTagsInput('');
    setStatus('Seeking Collaborators');
    setIsRegistering(false);
  };

  const handleJoinProject = (id: string, name: string) => {
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    if (joinedProjects.includes(id)) return;
    setJoinedProjects(prev => [...prev, id]);
    alert(`🎉 Collaboration Request Sent! You have applied to join Engr./Student "${name}". Your portfolio has been securely shared with their lab lead.`);
  };

  const handleLikeProject = (id: string) => {
    if (likedProjects.includes(id)) {
      setLikedProjects(prev => prev.filter(pId => pId !== id));
    } else {
      setLikedProjects(prev => [...prev, id]);
    }
  };

  const runMatchmaking = () => {
    setIsSearching(true);
    setMatchmakingResult(null);

    setTimeout(() => {
      setIsSearching(false);
      // Simulate highly optimized inter-department pairing
      if (matchMyCollege === matchTargetRequirement) {
        setMatchmakingResult({
          status: 'warning',
          message: `Internal departmental pairing is good, but USTP encourages cross-disciplinary innovation! Try pairing a Computing major (CITC) with an Engineering major (CEA) to unlock smart cyber-physical prototypes.`
        });
        return;
      }

      setMatchmakingResult({
        status: 'success',
        partnerRole: matchTargetRequirement,
        suggestedFocus: 
          matchMyCollege === 'CITC' && matchTargetRequirement === 'CEA' 
            ? 'Smart IoT Structural Overwatch: Build real-time ESP32 sensors communicating civil concrete stress.'
          : matchMyCollege === 'CEA' && matchTargetRequirement === 'CITC'
            ? 'Autonomous Hydraulic Drone Navigation: Implement PID control flight loops onto custom physical CAD chassis.'
          : matchMyCollege === 'CSM' && matchTargetRequirement === 'CITC'
            ? 'Computational Bio-Chemistry Predictor: Apply ML neural networks to assess yeast bacterial grow rates.'
          : 'Industrial Automation: Deploy PLC microcontrollers alongside modern software diagnostics.',
        ideas: [
          `1. Secure critical laboratory data logging APIs.`,
          `2. Align physical stress strain telemetry indicators.`,
          `3. Co-author research proposal for the upcoming USTP Trailblazer Innovation Summit.`
        ]
      });
    }, 1200);
  };

  return (
    <div className="space-y-6">

      {/* Intro Dashboard */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-6 border-l-4 border-ustp-orange shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] bg-ustp-orange text-white px-2 py-0.5 rounded font-mono font-bold uppercase">
              Innovation & prototypes
            </span>
            <h2 className="text-xl font-bold font-display text-white">
              USTP Innovation & Lab Board
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Southern Philippines has expansive scientific blueprints. Use this board to publish your hardware or software research prototypes, request specific technical peer validation, or team up for national competitions.
            </p>
          </div>
          <button
            onClick={() => {
              if (!currentUser) onOpenAuth();
              else setIsRegistering(!isRegistering);
            }}
            className="bg-ustp-gold hover:bg-ustp-gold-dark text-slate-900 font-bold px-4 py-2 rounded-xl transition text-xs flex items-center gap-1.5 cursor-pointer shrink-0 shadow-sm"
          >
            <Lightbulb className="h-4 w-4" />
            Launch Lab Project
          </button>
        </div>
      </div>

      {/* Matchmaking Wizard Box */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 font-display flex items-center gap-1.5">
            <Sparkles className="h-4.5 w-4.5 text-ustp-orange" />
            Cross-Department Hackathon Matchmaker
          </h3>
          <p className="text-[11px] text-slate-500">
            A proprietary algorithmic matrix to bridge computing, physical science, technology, and engineering majors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">
                  My Major College
                </label>
                <select
                  value={matchMyCollege}
                  onChange={(e) => setMatchMyCollege(e.target.value as any)}
                  className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                >
                  <option value="CITC">CITC (Computing)</option>
                  <option value="CEA">CEA (Engineering)</option>
                  <option value="CSM">CSM (Science & Math)</option>
                  <option value="COT">COT (Technology)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">
                  Seeking Partner From
                </label>
                <select
                  value={matchTargetRequirement}
                  onChange={(e) => setMatchTargetRequirement(e.target.value as any)}
                  className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                >
                  <option value="CEA">CEA (Engineering)</option>
                  <option value="CITC">CITC (Computing)</option>
                  <option value="CSM">CSM (Science & Math)</option>
                  <option value="COT">COT (Technology)</option>
                </select>
              </div>
            </div>

            <button
              onClick={runMatchmaking}
              disabled={isSearching}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2 rounded-lg text-xs transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
            >
              {isSearching ? (
                <span>Simulating Algorithmic Matching Grid...</span>
              ) : (
                <>
                  <span>Initialize Connection Match</span>
                  <ArrowRight className="h-3 w-3" />
                </>
              )}
            </button>
          </div>

          <div className="flex flex-col justify-center min-h-[100px] bg-white p-3.5 rounded-lg border border-slate-200/80">
            {isSearching ? (
              <div className="text-center space-y-2 py-4">
                <div className="h-6 w-6 border-2 border-ustp-orange border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-[10px] text-slate-500 font-mono tracking-wider">Syncing CITC APIs & CEA blueprints...</p>
              </div>
            ) : matchmakingResult ? (
              <div className="space-y-2 animate-in fade-in duration-200 text-xs text-slate-700">
                {matchmakingResult.status === 'success' ? (
                  <>
                    <p className="font-bold text-emerald-800 text-xs flex items-center gap-1">
                      <BookmarkCheck className="h-4 w-4" />
                      Optimum Cross-Department Pathway Configured!
                    </p>
                    <p className="text-[11px] leading-relaxed font-semibold text-slate-850">
                      🎯 <span className="text-ustp-orange">{matchmakingResult.suggestedFocus}</span>
                    </p>
                    <div className="text-[10px] space-y-1 text-slate-500 pl-4 list-disc font-mono">
                      {matchmakingResult.ideas.map((id: string, i: number) => (
                        <p key={i}>{id}</p>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="text-amber-700 text-center text-xs py-2">{matchmakingResult.message}</p>
                )}
              </div>
            ) : (
              <div className="text-center p-3 text-slate-400 text-xs">
                Select your academic colleges and trigger connection guidelines to find hackathon project structures.
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Register Project Modal/Form */}
      {isRegistering && (
        <form 
          onSubmit={handleRegisterProject} 
          className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4 animate-in slide-in-from-top-3 duration-200"
        >
          <div className="flex items-center justify-between border-b pb-2 border-slate-200">
            <h3 className="text-xs font-bold text-slate-900 font-display uppercase tracking-wide">
              Document New Laboratory Research / Prototype
            </h3>
            <span className="text-[10px] text-slate-500">Lead: {currentUser?.name}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">
                Project Title / Invention Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Algae bio-reactor system v2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">
                Host College
              </label>
              <select
                value={collegeId}
                onChange={(e) => setCollegeId(e.target.value as any)}
                className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
              >
                <option value="CITC">CITC (Computing)</option>
                <option value="CEA">CEA (Engineering)</option>
                <option value="CSM">CSM (Science & Math)</option>
                <option value="COT">COT (Technology)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">
                Tags / Tools Used (comma separated)
              </label>
              <input
                type="text"
                placeholder="Arduino, Python, IoT, Concrete"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">
                Prototype Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
              >
                <option value="Seeking Collaborators">Seeking Collaborators</option>
                <option value="Inception">Inception</option>
                <option value="Prototype Phase">Prototype Phase</option>
                <option value="Testing">Testing</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">
              Who are you looking for? (Collaborator Role Profiles) *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Needs CEA Civil Major to test soil loads & CITC for sensor telemetry"
              value={lookingFor}
              onChange={(e) => setLookingFor(e.target.value)}
              className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white animate-pulse"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">
              Technical Description of Prototype & Goal
            </label>
            <textarea
              rows={3}
              placeholder="Provide context on your invention, laboratory targets, and hardware specifications..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
            />
          </div>

          <div className="flex justify-end gap-2 text-xs pt-1">
            <button
              type="button"
              onClick={() => setIsRegistering(false)}
              className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-ustp-blue text-white px-4 py-1.5 rounded font-semibold"
            >
              Publish Prototype
            </button>
          </div>

        </form>
      )}

      {/* Native Project List */}
      <div className="space-y-4">
        {projects.map((proj) => {
          const hasJoined = joinedProjects.includes(proj.id);
          const hasLiked = likedProjects.includes(proj.id);

          return (
            <div 
              key={proj.id} 
              className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-slate-300 transition-all shadow-2xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-ustp-orange/10 rounded text-ustp-orange font-bold text-[10px] font-mono">
                      {proj.collegeId} PROJECT
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      proj.status === 'Seeking Collaborators' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {proj.status}
                    </span>
                  </div>

                  <span className="text-[10px] text-slate-400 font-mono">
                    Published {proj.timestamp}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 font-display">
                  {proj.title}
                </h3>

                <p className="text-xs text-slate-700 leading-relaxed font-sans">
                  {proj.description}
                </p>

                {/* Team request banner */}
                <div className="bg-amber-50/70 border border-amber-250 p-3 rounded-xl space-y-1">
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-amber-800 font-display">
                    🚨 SEEKING PARTNERSHIP DETAILS:
                  </span>
                  <p className="text-xs text-slate-800 leading-normal">
                    {proj.lookingFor}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-[9px] font-mono bg-slate-100 text-slate-600 border border-slate-250 px-2 py-0.5 rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom footer controls */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <img
                    src={proj.teamLead.avatar}
                    alt={proj.teamLead.name}
                    className="h-7 w-7 rounded-full object-cover border border-slate-250"
                  />
                  <div>
                    <span className="text-slate-800 font-semibold block text-[11px] leading-tight">
                      {proj.teamLead.name}
                    </span>
                    <span className="text-[9px] text-slate-400 font-mono">
                      {proj.teamLead.role} • {proj.teamLead.college}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleLikeProject(proj.id)}
                    className={`p-2 rounded-lg transition ${hasLiked ? 'text-rose-600 bg-rose-50' : 'hover:bg-slate-100 text-slate-400'}`}
                  >
                    <Heart className={`h-4 w-4 ${hasLiked ? 'fill-rose-600' : ''}`} />
                  </button>

                  <button
                    onClick={() => handleJoinProject(proj.id, proj.title)}
                    disabled={hasJoined}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition flex items-center gap-1.5 ${
                      hasJoined
                        ? 'bg-slate-100 text-slate-400 border border-slate-200'
                        : 'bg-slate-950 hover:bg-slate-850 text-white shadow-2xs'
                    }`}
                  >
                    {hasJoined ? <Check className="h-3.5 w-3.5" /> : null}
                    <span>{hasJoined ? 'Requested' : `Apply to Collaborate (${proj.collaboratorsCount})`}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
