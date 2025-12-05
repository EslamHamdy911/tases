import React from 'react';
import { Language } from '../types';

interface HeroProps {
  onStart: () => void;
  lang: Language;
}

const Hero: React.FC<HeroProps> = ({ onStart, lang }) => {
  const isAr = lang === 'ar';

  return (
    <div className="relative overflow-hidden bg-emerald-900 text-white min-h-screen flex items-center justify-center">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-emerald-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="mb-8 inline-block px-4 py-1.5 rounded-full bg-emerald-800/50 border border-emerald-600 backdrop-blur-sm text-emerald-300 text-sm font-medium">
          {isAr ? '✨ مدعوم بالذكاء الاصطناعي Gemini 2.0' : '✨ Powered by AI Gemini 2.0'}
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          {isAr ? (
            <>
              ابدأ شركتك الناشئة <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">
                على أرض صلبة
              </span>
            </>
          ) : (
            <>
              Start Your Startup <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">
                On Solid Ground
              </span>
            </>
          )}
        </h1>
        <p className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto leading-relaxed">
          {isAr 
            ? 'منصة "تأسيس" تساعدك في استخراج خارطة طريق التراخيص القانونية، وصياغة عقود التأسيس، وفهم المتطلبات الحكومية في مصر والعالم العربي في دقائق.'
            : 'Ta\'asis helps you generate legal roadmap licenses, draft incorporation contracts, and understand government requirements in Egypt and the Arab world in minutes.'}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={onStart}
            className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transform hover:-translate-y-1 text-lg"
          >
            {isAr ? 'ابدأ رحلة التأسيس الآن' : 'Start Incorporation Journey'}
          </button>
          <a href="#features" className="px-8 py-4 bg-transparent border border-emerald-700 text-emerald-100 rounded-xl hover:bg-emerald-800/30 transition-colors">
            {isAr ? 'كيف نعمل؟' : 'How it works?'}
          </a>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-emerald-200/60 text-sm font-semibold">
          <div>{isAr ? 'جمهورية مصر العربية' : 'Egypt'}</div>
          <div>{isAr ? 'المملكة العربية السعودية' : 'Saudi Arabia'}</div>
          <div>{isAr ? 'الإمارات العربية المتحدة' : 'UAE'}</div>
          <div>{isAr ? 'وباقي الدول العربية' : 'Rest of MENA'}</div>
        </div>
      </div>
    </div>
  );
};

export default Hero;