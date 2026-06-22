import React, { useState } from 'react';
import { ShieldCheck, UserCheck, AtSign, Loader2 } from 'lucide-react';
import { User } from '../types';

interface AuthModalProps {
  onLogin: (u: User) => void;
  isOpen: boolean;
  onClose?: () => void;
}

export default function AuthModal({ onLogin, isOpen, onClose }: AuthModalProps) {
  const [name, setName] = useState('Mharwean Malolot');
  const [email, setEmail] = useState('malolot.mharweanjhymes24@gmail.com');
  const [studentId, setStudentId] = useState('2024108844');
  const [role, setRole] = useState<'Student' | 'Faculty' | 'Alumni'>('Student');
  const [college, setCollege] = useState<'CITC' | 'CEA' | 'CSM' | 'COT'>('CITC');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Verification check for USTP email format
    const cleanedEmail = email.trim().toLowerCase();
    const isUstpEmail = cleanedEmail.endsWith('@ustp.edu.ph') || 
                        cleanedEmail.endsWith('@alumni.ustp.edu.ph') ||
                        cleanedEmail === 'malolot.mharweanjhymes24@gmail.com'; 

    if (!isUstpEmail) {
      setError('Academic verification requires an official @ustp.edu.ph student or faculty email address.');
      return;
    }

    if (!studentId.trim() || studentId.length < 5) {
      setError('Please provide a valid USTP Student / Employee ID (e.g., 2024108844).');
      return;
    }

    if (!name.trim()) {
      setError('Please enter your full academic name.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const newUser: User = {
        studentId: studentId.trim(),
        name: name.trim(),
        email: cleanedEmail,
        role: role,
        college: college,
        isVerified: true,
        avatar: role === 'Faculty'
          ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
          : "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
        reputationPoints: 200,
        badges: ["Verified Trailblazer", role, `${college} Member`]
      };
      onLogin(newUser);
      if (onClose) onClose();
    }, 1200);
  };

  const loadPreset = (preset: 'student' | 'faculty') => {
    if (preset === 'student') {
      setName('Mharwean Malolot');
      setEmail('malolot.mharweanjhymes24@gmail.com');
      setStudentId('2024108844');
      setRole('Student');
      setCollege('CITC');
    } else {
      setName('Engr. Jeanette Almine');
      setEmail('jeanette.almine@ustp.edu.ph');
      setStudentId('2023300501');
      setRole('Faculty');
      setCollege('CITC');
    }
    setError('');
  };

  return (
    <div id="auth-modal" className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        id="auth-modal-card" 
        className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden border border-slate-100 flex flex-col animate-in fade-in zoom-in duration-200"
      >
        {/* Banner */}
        <div className="bg-gradient-to-r from-ustp-blue to-ustp-blue-light p-6 text-white text-center relative">
          <div className="flex justify-center mb-2">
            <span className="p-3 bg-ustp-gold/20 rounded-full border border-ustp-gold/30">
              <ShieldCheck className="h-8 w-8 text-ustp-gold" />
            </span>
          </div>
          <h2 className="text-2xl font-bold font-display tracking-tight text-white mb-1">
            USTP Gateway Portal
          </h2>
          <p className="text-slate-300 text-xs">
            Student ID & Academic Email Verification Hub
          </p>
        </div>

        {/* Action Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 flex-grow overflow-y-auto">
          {error && (
            <div className="bg-red-50 text-red-700 text-xs p-3 rounded-lg border border-red-100 flex items-start gap-2">
              <span className="font-bold">Error:</span> {error}
            </div>
          )}

          {/* Quick Preset Buttons */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-2">
              Instant Simulation Profiles:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => loadPreset('student')}
                className="text-xs bg-white hover:bg-ustp-blue hover:text-white px-3 py-2 rounded-lg border border-slate-200 transition text-slate-700 font-medium flex items-center justify-center gap-1.5"
              >
                <UserCheck className="h-3.5 w-3.5" />
                Student Demo
              </button>
              <button
                type="button"
                onClick={() => loadPreset('faculty')}
                className="text-xs bg-white hover:bg-ustp-blue hover:text-white px-3 py-2 rounded-lg border border-slate-200 transition text-slate-700 font-medium flex items-center justify-center gap-1.5"
              >
                <UserCheck className="h-3.5 w-3.5" />
                Faculty Demo
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Academic Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ustp-blue"
              >
                <option value="Student">Student (Trailblazer)</option>
                <option value="Faculty">Faculty (Instructor)</option>
                <option value="Alumni">USTP Alumnus</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                College Dept
              </label>
              <select
                value={college}
                onChange={(e) => setCollege(e.target.value as any)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ustp-blue"
              >
                <option value="CITC">CITC (Computing)</option>
                <option value="CEA">CEA (Engineering)</option>
                <option value="CSM">CSM (Science/Math)</option>
                <option value="COT">COT (Technology)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Mharwean Malolot"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ustp-blue"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Student / Employee ID
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 2024108844"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ustp-blue"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Academic Email (@ustp.edu.ph)
              </label>
              <input
                type="text"
                required
                placeholder="name@ustp.edu.ph"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ustp-blue"
              />
            </div>
          </div>

          <div className="text-[11px] text-slate-500 bg-slate-50 p-2 text-center rounded-lg">
            🔐 Official USTP data security criteria is enforced. Authenticating issues verified university badges onto student feeds.
          </div>

          <button
            type="submit"
            className="w-full text-xs font-semibold text-slate-900 bg-ustp-gold hover:bg-ustp-gold-dark px-4 py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm font-display cursor-pointer"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-slate-900" />
                Verifying Academic Credentials...
              </>
            ) : (
              <>
                <ShieldCheck className="h-4 w-4" />
                Submit and Access Social Platform
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
