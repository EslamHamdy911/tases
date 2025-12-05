import React from 'react';
import ReactMarkdown from 'react-markdown';
import { LicenseResponse, Language } from '../types';

interface ResultsProps {
  data: LicenseResponse;
  onReset: () => void;
  lang: Language;
}

const Results: React.FC<ResultsProps> = ({ data, onReset, lang }) => {
  const isAr = lang === 'ar';
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex justify-between items-center mb-8">
          <h2 className={`text-3xl font-bold text-slate-900 dark:text-white ${isAr ? 'border-r-4 pr-4' : 'border-l-4 pl-4'} border-emerald-500`}>
            {isAr ? 'خارطة طريق تأسيس شركتك' : 'Your Incorporation Roadmap'}
          </h2>
          <button 
            onClick={onReset}
            className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors"
          >
            {isAr ? '← بدء مشروع جديد' : 'Start New Project →'}
          </button>
        </div>

        {/* Generated Content Area */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden mb-8 transition-colors duration-300">
          <div className="p-8 prose prose-lg prose-emerald max-w-none text-slate-700 dark:text-slate-300 dark:prose-invert">
            <ReactMarkdown
               components={{
                h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-emerald-800 dark:text-emerald-400 border-b dark:border-slate-700 pb-2 mb-4 mt-6" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-xl font-bold text-emerald-700 dark:text-emerald-500 mt-6 mb-3" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-4 mb-2" {...props} />,
                ul: ({node, ...props}) => <ul className={`list-disc list-outside space-y-2 mb-4 ${isAr ? 'mr-5' : 'ml-5'}`} {...props} />,
                ol: ({node, ...props}) => <ol className={`list-decimal list-outside space-y-2 mb-4 ${isAr ? 'mr-5' : 'ml-5'}`} {...props} />,
                li: ({node, ...props}) => <li className="pl-2" {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold text-slate-900 dark:text-white" {...props} />,
               }}
            >
              {data.markdown}
            </ReactMarkdown>
          </div>
          
          {/* Action Footer */}
          <div className="bg-slate-50 dark:bg-slate-900 px-8 py-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 transition-colors duration-300">
             <div className="text-xs text-slate-400 dark:text-slate-500">
               {isAr 
                 ? '* هذه المستندات استرشادية فقط ولا تغني عن الاستشارة القانونية الرسمية.'
                 : '* These documents are for guidance only and do not replace official legal advice.'}
             </div>
             <div className="flex gap-3">
               <button 
                 onClick={() => window.print()}
                 className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium transition-colors text-sm"
               >
                 {isAr ? 'طباعة / حفظ PDF' : 'Print / Save PDF'}
               </button>
               <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 font-medium transition-colors text-sm shadow-md shadow-emerald-200 dark:shadow-none">
                 {isAr ? 'نسخ النص' : 'Copy Text'}
               </button>
             </div>
          </div>
        </div>

        {/* Sources Section if available */}
        {data.groundingSources.length > 0 && (
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 transition-colors duration-300">
            <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">
              {isAr ? 'المصادر المستخدمة' : 'Sources Used'}
            </h3>
            <div className="grid gap-3">
              {data.groundingSources.map((source, idx) => (
                <a 
                  key={idx} 
                  href={source.uri}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="font-medium text-emerald-700 dark:text-emerald-400 group-hover:underline text-sm sm:text-base">
                      {source.title}
                    </div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 truncate max-w-[250px] sm:max-w-md">
                      {source.uri}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Results;