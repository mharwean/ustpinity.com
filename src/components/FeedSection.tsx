import React, { useState } from 'react';
import { 
  Heart, 
  MessageSquare, 
  Send, 
  AlertTriangle, 
  Sparkles, 
  Tag, 
  Megaphone, 
  FlaskConical, 
  Wrench, 
  LifeBuoy,
  PlusCircle,
  HelpCircle
} from 'lucide-react';
import { Post, User, Comment } from '../types';
import { COLLEGE_DEPARTMENTS_META } from '../data';

interface FeedSectionProps {
  posts: Post[];
  currentUser: User | null;
  onAddPost: (content: string, category: 'General' | 'Research' | 'Announcement' | 'LabHelp', collegeId: 'CITC' | 'CEA' | 'CSM' | 'COT' | 'Global', tags: string[]) => void;
  onLikePost: (postId: string) => void;
  onAddComment: (postId: string, content: string) => void;
  onReportPost: (postId: string) => void;
  onOpenAuth: () => void;
}

export default function FeedSection({
  posts,
  currentUser,
  onAddPost,
  onLikePost,
  onAddComment,
  onReportPost,
  onOpenAuth
}: FeedSectionProps) {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('ALL');
  const [activeCollegeFilter, setActiveCollegeFilter] = useState<string>('ALL');
  
  // Post Creator State
  const [postContent, setPostContent] = useState('');
  const [postCategory, setPostCategory] = useState<'General' | 'Research' | 'Announcement' | 'LabHelp'>('General');
  const [postCollege, setPostCollege] = useState<'CITC' | 'CEA' | 'CSM' | 'COT' | 'Global'>('Global');
  const [tagsString, setTagsString] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  // Comments accordion state
  const [expandedCommentsPostId, setExpandedCommentsPostId] = useState<string | null>(null);
  const [newCommentInput, setNewCommentInput] = useState<{ [key: string]: string }>({});

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    if (!postContent.trim()) return;

    // Parse tags by comma or whitespace
    const parsedTags = tagsString
      .split(/[\s,]+/)
      .map(tag => tag.trim().replace(/^#/, ''))
      .filter(tag => tag.length > 0);

    onAddPost(postContent, postCategory, postCollege, parsedTags);
    
    // Reset form
    setPostContent('');
    setTagsString('');
    setPostCategory('General');
    setPostCollege('Global');
    setIsCreating(false);
  };

  const handleCommentSubmit = (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    const txt = newCommentInput[postId] || '';
    if (!txt.trim()) return;

    onAddComment(postId, txt);
    setNewCommentInput(prev => ({ ...prev, [postId]: '' }));
  };

  // Filter selection helper
  const filteredPosts = posts.filter(post => {
    const passCat = activeCategoryFilter === 'ALL' || post.category === activeCategoryFilter;
    const passColl = activeCollegeFilter === 'ALL' || post.collegeId === activeCollegeFilter;
    // Hide heavily reported content
    const passReport = post.reportsCount < 4;
    return passCat && passColl && passReport;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Announcement':
        return <Megaphone className="h-3 w-3 text-red-500 shrink-0" />;
      case 'Research':
        return <FlaskConical className="h-3 w-3 text-emerald-500 shrink-0" />;
      case 'LabHelp':
        return <Wrench className="h-3 w-3 text-amber-500 shrink-0" />;
      default:
        return <HelpCircle className="h-3 w-3 text-slate-500 shrink-0" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Create Post Card */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
        {!isCreating ? (
          <div className="flex items-center gap-4">
            <img
              src={currentUser?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
              alt="User avatar"
              className="h-10 w-10 rounded-full border border-slate-200 object-cover"
            />
            <button
              onClick={() => {
                if (!currentUser) onOpenAuth();
                else setIsCreating(true);
              }}
              className="flex-grow text-left text-slate-500 text-xs bg-slate-50 hover:bg-slate-100 transition px-4 py-3 rounded-full border border-slate-200 text-sm font-sans cursor-pointer focus:outline-none"
            >
              {currentUser 
                ? `What do you want to collaborate on today, ${currentUser.name.split(' ')[0]}?`
                : "Join the USTP platform to share announcements, research, or ask for lab help!"}
            </button>
          </div>
        ) : (
          <form onSubmit={handlePostSubmit} className="space-y-4 animate-in fade-in duration-150">
            <div className="flex items-start gap-3">
              <img
                src={currentUser?.avatar}
                alt="My avatar"
                className="h-9 w-9 rounded-full object-cover border border-slate-200"
              />
              <div className="flex-grow">
                <textarea
                  required
                  rows={4}
                  placeholder="Share a research update, coordinate a study session, or ask for engineering lab help with details..."
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-ustp-blue focus:bg-white transition-all text-slate-800"
                />
              </div>
            </div>

            {/* Selector parameters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200/60">
              
              {/* Category selector */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">
                  Post Category
                </label>
                <select
                  value={postCategory}
                  onChange={(e) => setPostCategory(e.target.value as any)}
                  className="w-full text-xs px-2 py-1.5 rounded bg-white border border-slate-200 text-slate-700 font-medium"
                >
                  <option value="General">💬 General Chat</option>
                  <option value="Announcement">📢 Announcement</option>
                  <option value="Research">🧪 Research Update</option>
                  <option value="LabHelp">🛠️ Lab/Homework Help</option>
                </select>
              </div>

              {/* Scope/College selector */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">
                  Target Hub/College
                </label>
                <select
                  value={postCollege}
                  onChange={(e) => setPostCollege(e.target.value as any)}
                  className="w-full text-xs px-2 py-1.5 rounded bg-white border border-slate-200 text-slate-700 font-medium"
                >
                  <option value="Global">🌐 Global Feed (All)</option>
                  <option value="CITC">💻 CITC (Computing)</option>
                  <option value="CEA">⚙️ CEA (Engineering)</option>
                  <option value="CSM">📐 CSM (Science & Math)</option>
                  <option value="COT">🗜️ COT (Technology)</option>
                </select>
              </div>

              {/* Tags input */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">
                  Tags (space or comma)
                </label>
                <input
                  type="text"
                  placeholder="e.g. hackathon, calculus"
                  value={tagsString}
                  onChange={(e) => setTagsString(e.target.value)}
                  className="w-full text-xs px-2 py-1.5 rounded bg-white border border-slate-200 text-slate-700 font-medium"
                />
              </div>

            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="text-xs px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="text-xs bg-ustp-blue hover:bg-ustp-blue-light text-white font-semibold px-5 py-2 rounded-lg transition shadow-sm flex items-center gap-1.5"
              >
                <Send className="h-3.5 w-3.5" />
                Broadcast Post
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Filter Bar Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-100 p-2 rounded-xl border border-slate-200">
        
        {/* Category filters */}
        <div className="flex flex-wrap gap-1">
          {['ALL', 'Announcement', 'LabHelp', 'Research', 'General'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategoryFilter(cat)}
              className={`text-xs px-3 py-1.5 rounded-lg transition-all font-medium font-display cursor-pointer ${
                activeCategoryFilter === cat
                  ? 'bg-ustp-blue text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'ALL' ? '🌍 All Feeds' : cat}
            </button>
          ))}
        </div>

        {/* College scope filters */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-2">
            Scope:
          </span>
          <select
            value={activeCollegeFilter}
            onChange={(e) => setActiveCollegeFilter(e.target.value)}
            className="text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium font-display focus:outline-none"
          >
            <option value="ALL">🌐 All Departments</option>
            <option value="Global">🗣️ University Global Only</option>
            <option value="CITC">💻 CITC (Computing)</option>
            <option value="CEA">⚙️ CEA (Engineering)</option>
            <option value="CSM">📐 CSM (Science/Math)</option>
            <option value="COT">🗜️ COT (Technology)</option>
          </select>
        </div>

      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-2xl py-12 px-4 shadow-sm border border-slate-150 text-center text-slate-500">
            <LifeBuoy className="h-10 w-10 mx-auto text-slate-300 mb-2" />
            <p className="text-sm font-semibold">No recent social signals found.</p>
            <p className="text-xs text-slate-400 mt-1">Be the first to post a study lead or college news updates in this category!</p>
          </div>
        ) : (
          filteredPosts.map((post) => {
            const isCommentsExpanded = expandedCommentsPostId === post.id;
            const meta = COLLEGE_DEPARTMENTS_META[post.collegeId];

            return (
              <div 
                key={post.id} 
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden transition-all hover:border-slate-300 animate-in fade-in duration-200"
              >
                
                {/* Header info */}
                <div className="p-4 flex items-start justify-between gap-3 border-b border-slate-100/60 bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="h-10 w-10 rounded-full object-cover border border-slate-200 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-semibold text-slate-950 text-xs">
                          {post.author.name}
                        </span>
                        
                        {/* Verified badge */}
                        <span className="flex items-center text-[9px] bg-sky-100 text-sky-800 font-bold px-1 rounded gap-0.5">
                          <Sparkles className="h-2.5 w-2.5 text-sky-600" />
                          VERIFIED
                        </span>

                        {/* Student/Faculty Role Sticker */}
                        <span className={`text-[9px] font-mono px-1 rounded shrink-0 ${
                          post.author.role === 'Faculty' 
                            ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                            : 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                        }`}>
                          {post.author.role}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5 font-mono">
                        <span>{post.timestamp}</span>
                        <span>•</span>
                        <span className="font-sans font-semibold text-slate-400">
                          {post.author.college} Club
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* College Scope Hub Tag */}
                  <span className={`text-[10px] uppercase font-bold tracking-wide px-2.5 py-1 rounded-full border shrink-0 font-display ${meta.color}`}>
                    {post.collegeId} Hub
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-4">
                  
                  {/* Category marker */}
                  <div className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded-full font-semibold font-display border border-slate-200">
                    {getCategoryIcon(post.category)}
                    <span>{post.category}</span>
                  </div>

                  {/* Main text content */}
                  <p className="text-slate-800 text-xs leading-relaxed whitespace-pre-wrap font-sans">
                    {post.content}
                  </p>

                  {/* Tags list */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {post.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="text-[10px] text-ustp-blue font-mono font-medium hover:underline cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                </div>

                {/* Bottom Controls panel */}
                <div className="bg-slate-50/70 border-t border-slate-100 p-2 flex items-center justify-between text-xs text-slate-500">
                  
                  <div className="flex items-center gap-1.5">
                    
                    {/* Like button */}
                    <button
                      onClick={() => onLikePost(post.id)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                        post.likedByUser 
                          ? 'bg-rose-50 text-rose-600 font-bold' 
                          : 'hover:bg-slate-200/60 text-slate-500'
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${post.likedByUser ? 'fill-rose-600 text-rose-600' : ''}`} />
                      <span>{post.likesCount}</span>
                    </button>

                    {/* Comment toggler */}
                    <button
                      onClick={() => setExpandedCommentsPostId(isCommentsExpanded ? null : post.id)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-slate-200/60 transition cursor-pointer ${
                        isCommentsExpanded ? 'bg-slate-200/80 font-semibold text-slate-800' : ''
                      }`}
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>{post.comments.length} Comments</span>
                    </button>

                  </div>

                  {/* Report Flag action */}
                  <button
                    onClick={() => onReportPost(post.id)}
                    title="Report post due to community standards violation"
                    className="flex items-center gap-1 text-slate-400 hover:text-amber-600 hover:bg-amber-50 px-2 py-1 rounded transition cursor-pointer text-[11px]"
                  >
                    <AlertTriangle className="h-3 w-3" />
                    <span>Report</span>
                  </button>

                </div>

                {/* Sub-Comments Section */}
                {isCommentsExpanded && (
                  <div className="bg-slate-100/50 border-t border-slate-200/60 p-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
                    
                    {/* Existing Comments list */}
                    {post.comments.length > 0 && (
                      <div className="space-y-3">
                        {post.comments.map((comment) => (
                          <div 
                            key={comment.id} 
                            className="bg-white p-3 rounded-xl border border-slate-150 flex items-start gap-2.5 shadow-2xs"
                          >
                            <img
                              src={comment.author.avatar}
                              alt={comment.author.name}
                              className="h-7 w-7 rounded-full object-cover shrink-0 border border-slate-200"
                            />
                            <div className="flex-grow space-y-1">
                              <div className="flex items-center justify-between text-[11px]">
                                <div className="flex items-center gap-1.5">
                                  <span className="font-bold text-slate-900">{comment.author.name}</span>
                                  <span className="text-[9px] text-slate-400 bg-slate-100 px-1 rounded">{comment.author.college}</span>
                                </div>
                                <span className="text-[10px] text-slate-400 font-mono">{comment.timestamp}</span>
                              </div>
                              <p className="text-xs text-slate-700 leading-normal">{comment.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* New Comment submission form */}
                    <form onSubmit={(e) => handleCommentSubmit(e, post.id)} className="flex items-center gap-2">
                      <input
                        type="text"
                        required
                        placeholder="Add a constructive reaction or support answer..."
                        value={newCommentInput[post.id] || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setNewCommentInput(prev => ({ ...prev, [post.id]: val }));
                        }}
                        className="flex-grow bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-ustp-blue"
                      />
                      <button
                        type="submit"
                        className="bg-ustp-blue hover:bg-ustp-blue-light text-white p-2 rounded-lg transition shrink-0 cursor-pointer"
                      >
                        <Send className="h-3.5 w-3.5" />
                      </button>
                    </form>

                  </div>
                )}

              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
