import React, { useState } from 'react';
import { 
  BookOpen, 
  Download, 
  UploadCloud, 
  FileText, 
  Filter, 
  Search, 
  CheckCircle, 
  PlusCircle, 
  GraduationCap, 
  Building, 
  Wrench, 
  Cpu, 
  Atom, 
  Sparkles,
  Award
} from 'lucide-react';
import { Resource, User } from '../types';
import { COLLEGE_DEPARTMENTS_META } from '../data';

interface CollegesSectionProps {
  resources: Resource[];
  currentUser: User | null;
  onAddResource: (title: string, description: string, collegeId: 'CITC' | 'CEA' | 'CSM' | 'COT', courseCode: string, fileType: 'PDF' | 'ZIP' | 'DOCX' | 'PPTX' | 'DBC', fileSize: string) => void;
  onOpenAuth: () => void;
}

export default function CollegesSection({
  resources,
  currentUser,
  onAddResource,
  onOpenAuth
}: CollegesSectionProps) {
  const [selectedCollege, setSelectedCollege] = useState<'CITC' | 'CEA' | 'CSM' | 'COT'>('CITC');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  
  // Simulated downloads tracker (adds to UI feedback)
  const [downloadedIds, setDownloadedIds] = useState<string[]>([]);
  const [resourceRatings, setResourceRatings] = useState<{ [key: string]: number }>({});

  // Form states for resource upload
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCourseCode, setNewCourseCode] = useState('');
  const [newFileType, setNewFileType] = useState<'PDF' | 'ZIP' | 'DOCX' | 'PPTX' | 'DBC'>('PDF');
  const [newSize, setNewSize] = useState('1.5 MB');

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    if (!newTitle.trim() || !newCourseCode.trim()) return;

    onAddResource(
      newTitle, 
      newDescription, 
      selectedCollege, 
      newCourseCode.toUpperCase().replace(/\s/g, ''), 
      newFileType, 
      newSize
    );

    // Reset Form
    setNewTitle('');
    setNewDescription('');
    setNewCourseCode('');
    setNewFileType('PDF');
    setNewSize('2.0 MB');
    setIsUploading(false);
  };

  const handleDownloadClick = (resourceId: string) => {
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    if (!downloadedIds.includes(resourceId)) {
      setDownloadedIds(prev => [...prev, resourceId]);
    }
    // Simulated native browser download
    alert(`📥 [USTP CDN] "${resources.find(r => r.id === resourceId)?.title}" has been safely fetched and compiled into your student downloads folder!`);
  };

  const handleUpvoteClick = (resourceId: string) => {
    setResourceRatings(prev => ({
      ...prev,
      [resourceId]: (prev[resourceId] || 0) + 1
    }));
  };

  // Filter based on selected college and search query
  const filteredResources = resources.filter(res => {
    if (res.collegeId !== selectedCollege) return false;
    const query = searchQuery.toLowerCase();
    return res.title.toLowerCase().includes(query) || 
           res.courseCode.toLowerCase().includes(query) ||
           res.description.toLowerCase().includes(query);
  });

  const collegeMeta = COLLEGE_DEPARTMENTS_META[selectedCollege];

  const collegeDetails = {
    CITC: {
      title: "College of Information Technology & Computing",
      dean: "Dr. Maria Teresa M. Fajardo",
      courses: ["BS Information Technology (BSIT)", "BS Computer Science (BSCS)", "BS Technology Communication Management (BSTCM)", "BS Technology Education (BSTE)"],
      focus: "Software Engineering, AI Models, Cyber Security protocols, IoT Infrastructure research, and Agile project systems."
    },
    CEA: {
      title: "College of Engineering & Architecture",
      dean: "Dr. Leonel L. Pabilona",
      courses: ["BS Civil Engineering (BSCE)", "BS Electrical Engineering (BSEE)", "BS Mechanical Engineering (BSME)", "BS Architecture (BSAr)", "BS Geodetic Engineering (BSGE)"],
      focus: "Structural simulation, CAD calculations, Sustainable building modeling, Parametric design architecture, and Lab hardware tests."
    },
    CSM: {
      title: "College of Science & Mathematics",
      dean: "Dr. Daisy Lou L. Polestico",
      courses: ["BS Applied Physics", "BS Applied Mathematics", "BS Chemistry", "BS Food Technology"],
      focus: "Linear models, Organic yeasts research, Quantum paradigms, Fourier transforms, Chemistry lab synthesis, and analysis."
    },
    COT: {
      title: "College of Technology",
      dean: "Dr. Ruvel J. Cuasito",
      courses: ["BS Automotive Technology", "BS Electrical Technology", "BS Electronics Technology", "BS Mechanical Technology"],
      focus: "Rapid hardware prototyping, Lathe machining setup, Power grid design, and Automotive diagnostics."
    }
  };

  return (
    <div className="space-y-6">

      {/* College Hub Selector Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {(['CITC', 'CEA', 'CSM', 'COT'] as const).map((col) => {
          const isActive = selectedCollege === col;
          const targetMeta = COLLEGE_DEPARTMENTS_META[col];
          
          let icon = <Cpu className="h-5 w-5" />;
          if (col === 'CEA') icon = <Wrench className="h-5 w-5" />;
          if (col === 'CSM') icon = <Atom className="h-5 w-5" />;
          if (col === 'COT') icon = <Building className="h-5 w-5" />;

          return (
            <button
              key={col}
              onClick={() => {
                setSelectedCollege(col);
                setIsUploading(false); // Close upload panel if active
              }}
              className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden group cursor-pointer ${
                isActive 
                  ? `${targetMeta.color} border-slate-300 ring-2 ring-slate-800 shadow-md`
                  : 'bg-white hover:bg-slate-50 border-slate-200 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`p-2 rounded-xl ${isActive ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}>
                  {icon}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-slate-400">
                  HUB
                </span>
              </div>
              <p className="text-sm font-extrabold tracking-tight text-slate-900 font-display">
                {col} Hub
              </p>
              <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5 font-sans">
                {collegeDetails[col].title}
              </p>
            </button>
          );
        })}
      </div>

      {/* College Billboard / Information banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 border-b-4 border-ustp-gold shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 -mr-6 -mt-6 p-12 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-ustp-orange text-white font-bold font-mono px-2 py-0.5 rounded uppercase">
              Academic College Dept
            </span>
            <span className="text-[10px] text-slate-400 font-semibold">• Dean: {collegeDetails[selectedCollege].dean}</span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight font-display text-white">
            {collegeDetails[selectedCollege].title}
          </h2>
          <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
            <span className="font-semibold text-ustp-gold">Focus Area:</span> {collegeDetails[selectedCollege].focus}
          </p>

          <div className="pt-2 flex flex-wrap gap-1.5">
            {collegeDetails[selectedCollege].courses.map((course, idx) => (
              <span 
                key={idx} 
                className="text-[9px] bg-slate-800 text-slate-300 border border-slate-700 px-2 py-0.5 rounded font-mono"
              >
                {course}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Section body: Resources sharing search & list */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 space-y-5">
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-950 font-display flex items-center gap-1.5">
              <BookOpen className="h-4.5 w-4.5 text-ustp-blue" />
              Course Portal & Lecture Resources
            </h3>
            <p className="text-slate-500 text-[11px]">
              Share laboratory manuals, reviewers, codebases, and study materials specific to {selectedCollege} classes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (!currentUser) onOpenAuth();
                else setIsUploading(!isUploading);
              }}
              className="text-xs bg-ustp-blue hover:bg-ustp-blue-light text-white font-semibold px-4 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <UploadCloud className="h-4 w-4" />
              Share Study Resource
            </button>
          </div>
        </div>

        {/* Upload Resource Form Panel */}
        {isUploading && (
          <form 
            onSubmit={handleUploadSubmit}
            className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 animate-in slide-in-from-top duration-200"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 font-display uppercase tracking-wide">
                Publish Study Resource to {selectedCollege} Portal
              </span>
              <span className="text-[10px] text-slate-500">
                Uploaded by: {currentUser?.name}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                  Resource Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Calculus II Unit Circle review"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-ustp-blue"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                  Course Code *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ME-211 or IT-122"
                  value={newCourseCode}
                  onChange={(e) => setNewCourseCode(e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-ustp-blue"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                  File Format & Size
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={newFileType}
                    onChange={(e) => setNewFileType(e.target.value as any)}
                    className="text-xs px-2 py-1.5 border border-slate-200 rounded-lg bg-white"
                  >
                    <option value="PDF">PDF Manual</option>
                    <option value="ZIP">ZIP Code/Docs</option>
                    <option value="DOCX">DOCX Word</option>
                    <option value="PPTX">PPTX Slide</option>
                  </select>
                  <input
                    type="text"
                    value={newSize}
                    onChange={(e) => setNewSize(e.target.value)}
                    placeholder="2.4 MB"
                    className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                Resource Description
              </label>
              <textarea
                rows={2}
                placeholder="Brief summary of contents, lectures covered or topics included to aid searchability..."
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-ustp-blue"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsUploading(false)}
                className="text-xs px-3 py-1.5 text-slate-600 hover:bg-slate-200 rounded transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="text-xs bg-ustp-teal text-white font-semibold px-4 py-1.5 rounded transition shadow-sm flex items-center gap-1"
              >
                <CheckCircle className="h-3.5 w-3.5" />
                Publish to Portal
              </button>
            </div>
          </form>
        )}

        {/* Content Filtering Interface */}
        <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
          <Search className="h-4 w-4 text-slate-400 shrink-0 ml-1" />
          <input
            type="text"
            placeholder="Search resources by title, course code (e.g. IT-312), or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow bg-transparent text-xs focus:outline-none text-slate-800"
          />
        </div>

        {/* Resource Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredResources.length === 0 ? (
            <div className="md:col-span-2 py-8 text-center text-slate-400 text-xs bg-slate-50 rounded-xl border border-dashed border-slate-200">
              No specific resources match your search criteria. Try a general code or keyword.
            </div>
          ) : (
            filteredResources.map((res) => {
              const matchesDownloads = downloadedIds.includes(res.id);
              const customVotes = resourceRatings[res.id] || 0;

              return (
                <div 
                  key={res.id}
                  className="p-4 bg-slate-55 rounded-xl border border-slate-200 hover:border-slate-300 transition-all shadow-2xs hover:shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="p-2 bg-slate-100 rounded-lg text-slate-700">
                          <FileText className="h-4.5 w-4.5 text-slate-600" />
                        </span>
                        <div>
                          <span className="text-[9px] bg-ustp-blue text-white font-bold px-1.5 py-0.5 rounded text-left uppercase">
                            {res.courseCode}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium ml-1.5">{res.fileType} • {res.fileSize}</span>
                        </div>
                      </div>

                      {/* Rep / Star Upvotes button */}
                      <button
                        onClick={() => handleUpvoteClick(res.id)}
                        className="text-[10px] text-slate-500 hover:text-amber-500 bg-slate-100 px-2 py-1 rounded transition flex items-center gap-1 cursor-pointer font-bold"
                        title="Vouch for accuracy and quality"
                      >
                        <Award className="h-3 w-3 text-amber-500" />
                        <span>+{customVotes} Helpful</span>
                      </button>
                    </div>

                    <h4 className="text-xs font-extrabold text-slate-900 font-display line-clamp-1">
                      {res.title}
                    </h4>
                    <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                      {res.description}
                    </p>
                  </div>

                  {/* Down card controls */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                    <div>
                      <span>Uploaded by: </span>
                      <span className="font-semibold text-slate-700">{res.uploadedBy.name}</span>
                    </div>

                    <button
                      onClick={() => handleDownloadClick(res.id)}
                      className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1 shadow-2xs cursor-pointer transition ${
                        matchesDownloads
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      <Download className="h-3 w-3" />
                      <span>{matchesDownloads ? 'Downloaded' : `Fetch File (${res.downloadsCount})`}</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>

    </div>
  );
}
