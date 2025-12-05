import React from 'react';
import { Language } from '../types';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;

  const isAr = lang === 'ar';

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 dark:border-slate-700 transform transition-all scale-100 opacity-100">
        <div className="p-1 bg-gradient-to-r from-emerald-500 to-teal-400"></div>
        
        <div className="p-6 sm:p-8">
          <div className="text-center mb-6">
            <div className="mx-auto w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">🚀</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {isAr ? 'مرحباً بك في منصة "تأسيس"' : 'Welcome to Ta\'asis'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              {isAr 
                ? 'رفيقك الذكي لبناء الشركات الناشئة في العالم العربي.'
                : 'Your smart companion for building startups in the Arab world.'}
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <h3 className="font-bold text-sm text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              {isAr ? 'كيف تستفيد إلى أقصى حد؟' : 'How to get the most out of it?'}
            </h3>
            
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center text-xs font-bold mt-0.5">1</div>
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
                  {isAr ? 'كن دقيقاً في الوصف' : 'Be Specific'}
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {isAr 
                    ? 'كلما كان وصف نشاط الشركة مفصلاً، حصلت على بنود تعاقدية وتراخيص أكثر دقة.'
                    : 'The more detailed your business description, the more accurate the licenses and contract clauses will be.'}
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center text-xs font-bold mt-0.5">2</div>
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
                  {isAr ? 'راجع القوانين المحلية' : 'Local Laws Integration'}
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {isAr 
                    ? 'نستخدم البحث المتقدم للتحقق من الرسوم الحكومية، لكن يفضل دائماً مراجعة محامي مختص.'
                    : 'We use advanced search to verify government fees, but always consult with a specialized lawyer.'}
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center text-xs font-bold mt-0.5">3</div>
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
                  {isAr ? 'احفظ الخطة' : 'Save Your Roadmap'}
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {isAr 
                    ? 'استخدم زر الطباعة لحفظ التقرير كملف PDF والرجوع إليه لاحقاً أثناء التنفيذ.'
                    : 'Use the print button to save the report as a PDF for later reference during execution.'}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-200 dark:shadow-none transform hover:-translate-y-0.5"
          >
            {isAr ? 'فهمت، لنبدأ الآن!' : 'Got it, Let\'s Start!'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;