import React, { useState } from 'react';
import { StartupData, Language } from '../types';

interface StartupFormProps {
  onSubmit: (data: StartupData) => void;
  isLoading: boolean;
  lang: Language;
}

const StartupForm: React.FC<StartupFormProps> = ({ onSubmit, isLoading, lang }) => {
  const [formData, setFormData] = useState<StartupData>({
    companyName: '',
    industry: '',
    country: 'Egypt',
    foundersCount: 1,
    capital: '',
    description: ''
  });

  const isAr = lang === 'ar';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center transition-colors duration-300">
      <div className="max-w-2xl w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 border border-slate-100 dark:border-slate-800 transition-colors duration-300">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            {isAr ? 'بيانات المشروع' : 'Project Details'}
          </h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            {isAr ? 'أدخل تفاصيل شركتك لنقوم بتجهيز المستندات المناسبة' : 'Enter your company details to generate the appropriate documents'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {isAr ? 'اسم الشركة المقترح' : 'Proposed Company Name'}
              </label>
              <input
                type="text"
                name="companyName"
                id="companyName"
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder-slate-400 dark:placeholder-slate-500"
                placeholder={isAr ? "مثال: نايل تك" : "e.g. Nile Tech"}
                value={formData.companyName}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {isAr ? 'دولة التأسيس' : 'Incorporation Country'}
              </label>
              <select
                name="country"
                id="country"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                value={formData.country}
                onChange={handleChange}
              >
                <option value="Egypt">{isAr ? 'مصر (Egypt)' : 'Egypt'}</option>
                <option value="Saudi Arabia">{isAr ? 'السعودية (KSA)' : 'Saudi Arabia (KSA)'}</option>
                <option value="UAE">{isAr ? 'الإمارات (UAE)' : 'UAE'}</option>
                <option value="Jordan">{isAr ? 'الأردن (Jordan)' : 'Jordan'}</option>
                <option value="Kuwait">{isAr ? 'الكويت (Kuwait)' : 'Kuwait'}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {isAr ? 'مجال العمل' : 'Industry'}
              </label>
              <select
                name="industry"
                id="industry"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                value={formData.industry}
                onChange={handleChange}
              >
                <option value="">{isAr ? 'اختر المجال...' : 'Select industry...'}</option>
                <option value="Technology">{isAr ? 'تقنية معلومات / برمجيات' : 'Technology / Software'}</option>
                <option value="E-commerce">{isAr ? 'تجارة إلكترونية' : 'E-commerce'}</option>
                <option value="Manufacturing">{isAr ? 'تصنيع / صناعة' : 'Manufacturing'}</option>
                <option value="Services">{isAr ? 'خدمات استشارية' : 'Consulting Services'}</option>
                <option value="Food & Beverage">{isAr ? 'أغذية ومشروبات' : 'Food & Beverage'}</option>
                <option value="Fintech">{isAr ? 'تكنولوجيا مالية (Fintech)' : 'Fintech'}</option>
              </select>
            </div>

            <div>
              <label htmlFor="foundersCount" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {isAr ? 'عدد الشركاء/المؤسسين' : 'Number of Founders'}
              </label>
              <input
                type="number"
                name="foundersCount"
                id="foundersCount"
                min="1"
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                value={formData.foundersCount}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
             <label htmlFor="capital" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
               {isAr ? 'رأس المال المبدئي (اختياري)' : 'Initial Capital (Optional)'}
             </label>
             <input
                type="text"
                name="capital"
                id="capital"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder-slate-400 dark:placeholder-slate-500"
                placeholder={isAr ? "مثال: 50,000 جنيه مصري" : "e.g. 50,000 EGP"}
                value={formData.capital}
                onChange={handleChange}
              />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {isAr ? 'وصف مختصر للنشاط' : 'Business Description'}
            </label>
            <textarea
              name="description"
              id="description"
              rows={4}
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none placeholder-slate-400 dark:placeholder-slate-500"
              placeholder={isAr ? "صف نشاط شركتك بالتفصيل..." : "Describe your business activity in detail..."}
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg shadow-lg transition-all transform hover:-translate-y-1 ${
              isLoading 
                ? 'bg-slate-400 dark:bg-slate-600 cursor-not-allowed' 
                : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-200 dark:shadow-none'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isAr ? 'جاري المعالجة والبحث...' : 'Processing and Searching...'}
              </span>
            ) : (
              isAr ? 'إنشاء خارطة الطريق والمستندات' : 'Generate Roadmap & Documents'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StartupForm;