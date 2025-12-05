import React, { useState, useEffect } from 'react';
import { Language, StartupData, LicenseResponse, AppState } from './types';
import Hero from './components/Hero';
import StartupForm from './components/StartupForm';
import Results from './components/Results';
import OnboardingModal from './components/OnboardingModal';
import { generateLicenseRoadmap } from './services/geminiService';

const App: React.FC = () => {
  // State
  const [appState, setAppState] = useState<AppState>(AppState.LANDING);
  const [language, setLanguage] = useState<Language>('ar');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [startupData, setStartupData] = useState<StartupData | null>(null);
  const [result, setResult] = useState<LicenseResponse | null>(null);
  
  // UI Flags
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  // Initialize Theme & Language
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }

    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  // Handle Onboarding Logic
  useEffect(() => {
    const hasSeenIntro = localStorage.getItem('taasis_intro_seen');
    if (!hasSeenIntro) {
      // Small delay to allow initial render
      const timer = setTimeout(() => setShowOnboarding(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Handle Offline Status
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Handle PWA Install Prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        }
        setDeferredPrompt(null);
      });
    }
  };

  // Actions
  const toggleLanguage = () => setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const closeOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem('taasis_intro_seen', 'true');
  };

  const handleStart = () => {
    setAppState(AppState.FORM);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = async (data: StartupData) => {
    setStartupData(data);
    setAppState(AppState.LOADING);
    
    try {
      const response = await generateLicenseRoadmap(data, language);
      setResult(response);
      setAppState(AppState.RESULT);
    } catch (error) {
      console.error(error);
      setAppState(AppState.ERROR);
      // In a real app, show error message
      setAppState(AppState.FORM); // fallback for now
    }
  };

  const handleReset = () => {
    setStartupData(null);
    setResult(null);
    setAppState(AppState.FORM);
  };

  const isAr = language === 'ar';

  return (
    <div className="font-sans antialiased text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-950 min-h-screen flex flex-col transition-colors duration-300">
      
      {/* Offline Banner */}
      {isOffline && (
        <div className="bg-amber-500 text-white text-center py-1 px-4 text-sm font-bold z-[100]">
          {isAr ? '⚠️ لا يوجد اتصال بالإنترنت. التطبيق يعمل في وضع عدم الاتصال.' : '⚠️ No internet connection. App is running in offline mode.'}
        </div>
      )}

      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div 
              className="flex-shrink-0 flex items-center cursor-pointer" 
              onClick={() => setAppState(AppState.LANDING)}
            >
              <div className={`w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-xl ${isAr ? 'ml-3' : 'mr-3'} shadow-lg shadow-emerald-200 dark:shadow-none`}>
                {isAr ? 'ت' : 'T'}
              </div>
              <span className="font-bold text-xl text-slate-800 dark:text-white">
                {isAr ? 'تأسيس' : "Ta'asis"}
              </span>
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-3">
               {/* Install Button - Visible if prompt available */}
               {deferredPrompt && (
                 <button
                   onClick={handleInstallClick}
                   className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-semibold hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors"
                 >
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                   {isAr ? 'تثبيت' : 'Install'}
                 </button>
               )}

               {/* Theme Toggle */}
               <button 
                 onClick={toggleTheme}
                 className="p-2 text-slate-500 hover:text-emerald-500 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                 title={isAr ? 'تبديل المظهر' : 'Toggle Theme'}
               >
                 {theme === 'light' ? (
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                     <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                   </svg>
                 ) : (
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                     <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                   </svg>
                 )}
               </button>

               {/* Language Toggle */}
               <button 
                  onClick={toggleLanguage}
                  className="px-3 py-1.5 text-sm font-semibold rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
               >
                 {language === 'ar' ? 'English' : 'العربية'}
               </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow pt-16">
        {appState === AppState.LANDING && (
          <Hero onStart={handleStart} lang={language} />
        )}

        {(appState === AppState.FORM || appState === AppState.LOADING) && (
          <StartupForm 
            onSubmit={handleFormSubmit} 
            isLoading={appState === AppState.LOADING}
            lang={language}
          />
        )}

        {appState === AppState.RESULT && result && (
          <Results 
            data={result} 
            onReset={handleReset}
            lang={language}
          />
        )}
      </main>

      {/* iOS Install Instructions (Visible on mobile only if PWA logic detects iOS-like user agent, but here simplifying by showing manual install hint in footer for mobile) */}
      <div className="md:hidden bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 text-center text-xs text-slate-500">
        {isAr 
          ? 'لتثبيت التطبيق على آيفون: اضغط زر "مشاركة" ثم "إضافة إلى الشاشة الرئيسية"' 
          : 'To install on iPhone: Tap "Share" then "Add to Home Screen"'}
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            © {new Date().getFullYear()} {isAr ? 'منصة تأسيس' : 'Ta\'asis'}. {isAr ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </p>
          <div className="flex gap-6 text-sm text-slate-400 dark:text-slate-500">
            <a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}</a>
            <a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{isAr ? 'الشروط والأحكام' : 'Terms of Service'}</a>
            <a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{isAr ? 'اتصل بنا' : 'Contact Us'}</a>
          </div>
        </div>
      </footer>

      {/* Onboarding Modal */}
      <OnboardingModal 
        isOpen={showOnboarding} 
        onClose={closeOnboarding} 
        lang={language}
      />

    </div>
  );
};

export default App;