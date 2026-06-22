import { Search, ShieldCheck, Award, LogOut, UserCheck } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  currentUser: User | null;
  onLogout: () => void;
  onOpenAuth: () => void;
}

export default function Navbar({ currentUser, onLogout, onOpenAuth }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900 text-white shadow-md border-b-2 border-ustp-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-ustp-orange to-ustp-gold flex items-center justify-center shadow-md font-bold text-slate-900 border border-white">
              <span className="font-display text-xl">U</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-base tracking-tight text-white">
                  USTP
                </span>
                <span className="text-[10px] bg-ustp-orange font-bold px-1.5 py-0.5 rounded text-white uppercase tracking-wider">
                  CDO
                </span>
              </div>
              <p className="text-[10px] text-slate-300 tracking-wide block font-sans">
                Campus Connect Hub
              </p>
            </div>
          </div>

          {/* Slogan details / System Notice */}
          <div className="hidden lg:flex items-center bg-slate-800/80 rounded-full px-4 py-1.5 border border-slate-700/60 text-xs text-slate-300">
            <ShieldCheck className="h-3.5 w-3.5 text-ustp-gold mr-1.5" />
            <span className="font-mono text-[10px]">Verified Student-Run Network</span>
          </div>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {currentUser ? (
              <div className="flex items-center gap-3">
                
                {/* Reputation / Rank */}
                <div className="hidden md:flex flex-col items-end">
                  <div className="flex items-center gap-1 font-mono text-[11px] text-ustp-gold font-bold">
                    <Award className="h-3.5 w-3.5 text-ustp-gold" />
                    <span>{currentUser.reputationPoints} Rep</span>
                  </div>
                  <span className="text-[9px] text-slate-400 capitalize">
                    {currentUser.role} • {currentUser.college}
                  </span>
                </div>

                {/* Avatar and Info */}
                <div className="flex items-center gap-2 bg-slate-800 p-1.5 pr-3 rounded-full border border-slate-700 text-left">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="h-8 w-8 rounded-full border border-ustp-gold object-cover"
                  />
                  <div className="leading-tight text-xs max-w-[124px]">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold block truncate text-slate-100">
                        {currentUser.name.split(' ')[0]}
                      </span>
                      <ShieldCheck className="h-3.5 w-3.5 text-ustp-gold shrink-0" />
                    </div>
                    <span className="text-[9px] font-mono text-slate-400 block truncate">
                      {currentUser.studentId}
                    </span>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={onLogout}
                  title="Logout"
                  className="p-2 bg-slate-800 hover:bg-red-950/40 text-slate-400 hover:text-red-400 rounded-full transition-all border border-slate-700 hover:border-red-900 cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                </button>

              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="text-xs font-semibold text-slate-900 bg-ustp-gold hover:bg-ustp-gold-dark hover:scale-105 transition-all px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 shadow-md font-display"
              >
                <UserCheck className="h-4 w-4" />
                Sign Up & Verify ID
              </button>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
