'use client';

import { useState, useEffect } from 'react';
import { courseData } from '@/lib/courseData';
import { 
  initializeUserData, 
  updateLessonProgress, 
  getLessonProgress,
  getCompletionPercentage 
} from '@/lib/storage';
import { UserProfile, UserProgress, Lesson } from '@/types/course';
import { 
  Brain, Target, Sparkles, MessageSquare, FileText, Palette, 
  Zap, PenTool, Briefcase, Bot, Languages, BarChart, Video, 
  Search, TrendingUp, Share2, DollarSign, Users, Globe, Rocket,
  CheckCircle2, Circle, Star, ChevronRight, ChevronLeft, Menu, X,
  Award, TrendingUp as Progress
} from 'lucide-react';

const iconMap: Record<string, any> = {
  Brain, Target, Sparkles, MessageSquare, FileText, Palette,
  Zap, PenTool, Briefcase, Bot, Languages, BarChart, Video,
  Search, TrendingUp, Share2, DollarSign, Users, Globe, Rocket
};

const categoryColors = {
  mindset: 'from-amber-500 via-yellow-600 to-amber-700',
  opportunity: 'from-yellow-500 via-amber-600 to-yellow-700',
  'ai-tools': 'from-amber-600 via-yellow-500 to-amber-500',
  services: 'from-yellow-600 via-amber-500 to-yellow-500',
  marketing: 'from-amber-500 via-yellow-600 to-amber-600',
};

const categoryLabels = {
  mindset: 'Mentalidade',
  opportunity: 'Oportunidades',
  'ai-tools': 'Ferramentas IA',
  services: 'Serviços',
  marketing: 'Marketing',
};

export default function Home() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson>(courseData.lessons[0]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  useEffect(() => {
    const { profile: userProfile, progress: userProgress } = initializeUserData();
    setProfile(userProfile);
    setProgress(userProgress);
    
    // Load current lesson based on progress
    const lessonToLoad = courseData.lessons.find(
      l => l.id === userProgress.currentLesson
    ) || courseData.lessons[0];
    setCurrentLesson(lessonToLoad);
  }, []);

  const handleLessonSelect = (lesson: Lesson) => {
    setCurrentLesson(lesson);
    setShowSidebar(false);
    setShowFeedbackForm(false);
    setFeedback('');
    setRating(0);
  };

  const handleCompleteLesson = () => {
    if (!showFeedbackForm) {
      setShowFeedbackForm(true);
      return;
    }

    updateLessonProgress(currentLesson.id, true, feedback, rating);
    
    // Refresh progress
    const { progress: updatedProgress } = initializeUserData();
    setProgress(updatedProgress);
    
    // Move to next lesson
    const nextLesson = courseData.lessons.find(l => l.id === currentLesson.id + 1);
    if (nextLesson) {
      setCurrentLesson(nextLesson);
    }
    
    setShowFeedbackForm(false);
    setFeedback('');
    setRating(0);
  };

  const handlePreviousLesson = () => {
    const prevLesson = courseData.lessons.find(l => l.id === currentLesson.id - 1);
    if (prevLesson) {
      setCurrentLesson(prevLesson);
      setShowFeedbackForm(false);
    }
  };

  const handleNextLesson = () => {
    const nextLesson = courseData.lessons.find(l => l.id === currentLesson.id + 1);
    if (nextLesson) {
      setCurrentLesson(nextLesson);
      setShowFeedbackForm(false);
    }
  };

  const lessonProgress = currentLesson ? getLessonProgress(currentLesson.id) : null;
  const isCompleted = lessonProgress?.completed || false;
  const completionPercentage = getCompletionPercentage();

  const IconComponent = iconMap[currentLesson.icon] || Brain;

  return (
    <div className="flex h-screen bg-black relative overflow-hidden">
      {/* Background Effects - Mountains and Light */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Distant Light Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-amber-500/20 via-yellow-600/10 to-transparent blur-3xl" />
        
        {/* Mountain Silhouettes */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-amber-950/30 to-transparent" 
             style={{
               clipPath: 'polygon(0 100%, 0 60%, 10% 70%, 20% 50%, 30% 65%, 40% 45%, 50% 55%, 60% 40%, 70% 60%, 80% 35%, 90% 50%, 100% 30%, 100% 100%)'
             }} 
        />
        
        {/* Golden Particles */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-amber-400 rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <aside 
        className={`${
          showSidebar ? 'translate-x-0' : '-translate-x-full'
        } fixed lg:relative lg:translate-x-0 z-30 w-80 h-full bg-black/95 backdrop-blur-xl border-r border-amber-900/30 transition-transform duration-300 ease-in-out overflow-y-auto`}
      >
        <div className="p-6 border-b border-amber-900/30 relative">
          {/* Golden accent line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
          
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 mb-1">
                O DESPERTAR
              </h1>
              <p className="text-xs text-amber-500/70 font-semibold tracking-widest uppercase">
                Sua Jornada Começa Aqui
              </p>
            </div>
            <button
              onClick={() => setShowSidebar(false)}
              className="lg:hidden p-2 hover:bg-amber-900/20 rounded-lg transition-colors text-amber-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Progress Overview */}
          <div className="space-y-3 bg-gradient-to-br from-amber-950/40 to-yellow-950/20 p-4 rounded-xl border border-amber-900/30">
            <div className="flex items-center justify-between text-sm">
              <span className="text-amber-400/80 font-semibold">Progresso da Jornada</span>
              <span className="font-bold text-amber-400">
                {progress?.totalCompleted || 0}/20
              </span>
            </div>
            <div className="w-full bg-amber-950/50 rounded-full h-3 overflow-hidden border border-amber-900/30">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 transition-all duration-500 ease-out shadow-lg shadow-amber-500/50"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-amber-400/80">
              <Zap className="w-4 h-4 text-amber-500" />
              <span className="font-semibold">{completionPercentage}% do caminho percorrido</span>
            </div>
          </div>
        </div>

        {/* Lessons List */}
        <div className="p-4 space-y-2">
          {courseData.lessons.map((lesson) => {
            const lessonProg = getLessonProgress(lesson.id);
            const LessonIcon = iconMap[lesson.icon] || Brain;
            
            return (
              <button
                key={lesson.id}
                onClick={() => handleLessonSelect(lesson)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-300 relative overflow-hidden group ${
                  currentLesson.id === lesson.id
                    ? 'bg-gradient-to-r ' + categoryColors[lesson.category] + ' text-black shadow-xl shadow-amber-500/30 scale-105 border border-amber-400/50'
                    : 'bg-gradient-to-br from-amber-950/20 to-yellow-950/10 hover:from-amber-950/40 hover:to-yellow-950/20 text-amber-100 border border-amber-900/20 hover:border-amber-700/40'
                }`}
              >
                {/* Golden shimmer effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                
                <div className="flex items-start gap-3 relative z-10">
                  <div className={`p-2.5 rounded-lg ${
                    currentLesson.id === lesson.id 
                      ? 'bg-black/20 shadow-lg' 
                      : 'bg-amber-900/30 group-hover:bg-amber-800/40'
                  }`}>
                    <LessonIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-bold tracking-wider ${
                        currentLesson.id === lesson.id ? 'text-black/70' : 'text-amber-500/80'
                      }`}>
                        ETAPA {lesson.id}
                      </span>
                      {lessonProg?.completed && (
                        <CheckCircle2 className="w-4 h-4 text-amber-400" />
                      )}
                    </div>
                    <h3 className="font-bold text-sm mb-1 line-clamp-2">
                      {lesson.title}
                    </h3>
                    <div className={`flex items-center gap-2 text-xs ${
                      currentLesson.id === lesson.id ? 'text-black/60' : 'text-amber-500/60'
                    }`}>
                      <span>{lesson.duration}</span>
                      <span>•</span>
                      <span>{categoryLabels[lesson.category]}</span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-black/90 backdrop-blur-xl border-b border-amber-900/30">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
          
          <div className="flex items-center justify-between p-4 lg:p-6">
            <button
              onClick={() => setShowSidebar(true)}
              className="lg:hidden p-2 hover:bg-amber-900/20 rounded-lg transition-colors text-amber-400"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-xl bg-gradient-to-br ${categoryColors[currentLesson.category]} shadow-xl shadow-amber-500/30 border border-amber-400/30`}>
                <IconComponent className="w-7 h-7 text-black" />
              </div>
              <div>
                <div className="text-sm text-amber-500/80 font-semibold tracking-wider uppercase">
                  Etapa {currentLesson.id} • {categoryLabels[currentLesson.category]}
                </div>
                <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600">
                  {currentLesson.title}
                </h2>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              {isCompleted && (
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-400 rounded-full text-sm font-bold border border-amber-500/30">
                  <CheckCircle2 className="w-4 h-4" />
                  Concluída
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Lesson Content */}
        <div className="p-4 lg:p-8 max-w-4xl mx-auto">
          {/* Description */}
          <div className="mb-8 p-8 bg-gradient-to-br from-amber-950/40 to-yellow-950/20 rounded-2xl border border-amber-900/30 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <p className="text-lg text-amber-100/90 leading-relaxed relative z-10">
              {currentLesson.description}
            </p>
            <div className="flex items-center gap-4 mt-4 text-sm text-amber-500/70 relative z-10">
              <span className="flex items-center gap-1">
                <Progress className="w-4 h-4" />
                {currentLesson.duration}
              </span>
            </div>
          </div>

          {/* Main Content */}
          <div className="mb-8 p-8 bg-gradient-to-br from-amber-950/40 to-yellow-950/20 rounded-2xl border border-amber-900/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
            <h3 className="text-2xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600">
              Conteúdo da Etapa
            </h3>
            <p className="text-amber-100/80 leading-relaxed whitespace-pre-line">
              {currentLesson.content}
            </p>
          </div>

          {/* Key Points */}
          <div className="mb-8 p-8 bg-gradient-to-br from-amber-900/30 to-yellow-900/20 rounded-2xl border border-amber-700/40 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
            <h3 className="text-2xl font-black mb-6 text-amber-400 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-amber-500" />
              Pontos-Chave
            </h3>
            <ul className="space-y-4">
              {currentLesson.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-4 group">
                  <div className="mt-1 p-2 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-lg shadow-lg shadow-amber-500/30">
                    <CheckCircle2 className="w-5 h-5 text-black" />
                  </div>
                  <span className="text-amber-100/90 flex-1 leading-relaxed">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Items */}
          <div className="mb-8 p-8 bg-gradient-to-br from-yellow-900/30 to-amber-900/20 rounded-2xl border border-amber-700/40 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
            <h3 className="text-2xl font-black mb-6 text-amber-400 flex items-center gap-3">
              <Target className="w-6 h-6 text-amber-500" />
              Ações Práticas
            </h3>
            <ul className="space-y-4">
              {currentLesson.actionItems.map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="mt-1 px-3 py-1.5 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-lg shadow-lg shadow-amber-500/30">
                    <span className="text-black text-sm font-black">
                      {index + 1}
                    </span>
                  </div>
                  <span className="text-amber-100/90 flex-1 leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Feedback Form */}
          {showFeedbackForm && (
            <div className="mb-8 p-8 bg-gradient-to-br from-amber-950/60 to-yellow-950/40 rounded-2xl border-2 border-amber-500/50 relative overflow-hidden shadow-2xl shadow-amber-500/20">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
              <h3 className="text-2xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600">
                Avalie esta Etapa
              </h3>
              
              {/* Rating */}
              <div className="mb-6">
                <label className="block text-sm font-bold mb-3 text-amber-400 tracking-wider uppercase">
                  Qual sua nota?
                </label>
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="transition-all hover:scale-125 active:scale-110"
                    >
                      <Star
                        className={`w-10 h-10 ${
                          star <= rating
                            ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                            : 'text-amber-900/40 hover:text-amber-700/60'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback */}
              <div className="mb-4">
                <label className="block text-sm font-bold mb-3 text-amber-400 tracking-wider uppercase">
                  Comentários (opcional)
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Compartilhe sua experiência com esta etapa..."
                  className="w-full p-4 border border-amber-700/40 rounded-xl bg-black/40 text-amber-100 placeholder:text-amber-700/50 focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none backdrop-blur-sm"
                  rows={4}
                />
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <button
              onClick={handlePreviousLesson}
              disabled={currentLesson.id === 1}
              className="flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-amber-950/60 to-yellow-950/40 text-amber-400 rounded-xl font-bold hover:from-amber-900/60 hover:to-yellow-900/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 border border-amber-900/30 hover:border-amber-700/50"
            >
              <ChevronLeft className="w-5 h-5" />
              Anterior
            </button>

            <button
              onClick={handleCompleteLesson}
              className={`flex items-center gap-3 px-10 py-4 rounded-xl font-black transition-all duration-300 shadow-2xl hover:scale-105 border-2 ${
                isCompleted
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-black border-amber-400/50 shadow-amber-500/50'
                  : 'bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-500 text-black border-amber-400/50 shadow-amber-500/50 hover:shadow-amber-500/70'
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 className="w-6 h-6" />
                  Etapa Concluída
                </>
              ) : showFeedbackForm ? (
                <>
                  <CheckCircle2 className="w-6 h-6" />
                  Confirmar Conclusão
                </>
              ) : (
                <>
                  Marcar como Concluída
                  <ChevronRight className="w-6 h-6" />
                </>
              )}
            </button>

            <button
              onClick={handleNextLesson}
              disabled={currentLesson.id === 20}
              className="flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-amber-950/60 to-yellow-950/40 text-amber-400 rounded-xl font-bold hover:from-amber-900/60 hover:to-yellow-900/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 border border-amber-900/30 hover:border-amber-700/50"
            >
              Próxima
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Completion Message */}
          {completionPercentage === 100 && (
            <div className="p-12 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 rounded-2xl text-black text-center shadow-2xl shadow-amber-500/50 border-2 border-amber-400 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
              <Zap className="w-20 h-20 mx-auto mb-6 relative z-10" />
              <h3 className="text-4xl font-black mb-4 relative z-10">
                DESPERTAR COMPLETO! 🔥
              </h3>
              <p className="text-xl font-bold relative z-10">
                Você percorreu toda a jornada das 20 etapas!
                <br />
                Agora é hora de aplicar seu conhecimento e construir sua renda digital.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      {showSidebar && (
        <div
          onClick={() => setShowSidebar(false)}
          className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-20"
        />
      )}
    </div>
  );
}
