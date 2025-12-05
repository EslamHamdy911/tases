import { StartupData, LicenseResponse, Language } from "../types";

// Removed GoogleGenAI import to eliminate AI dependency

export const generateLicenseRoadmap = async (data: StartupData, lang: Language): Promise<LicenseResponse> => {
  // Simulate a brief processing delay to give the user a sense of "generation"
  await new Promise(resolve => setTimeout(resolve, 1500));

  const isAr = lang === 'ar';
  
  let markdown = "";

  if (isAr) {
    markdown = `
# تقرير تأسيس شركة: ${data.companyName}
**الدولة:** ${data.country} | **المجال:** ${data.industry} | **رأس المال:** ${data.capital || 'غير محدد'}

---

## 1. التراخيص والمستندات الحكومية المطلوبة
بناءً على القواعد العامة للأعمال في ${data.country} لمجال **${data.industry}**، فيما يلي القائمة المتوقعة للمستندات:

*   **السجل التجاري:** الوثيقة الأساسية التي تثبت وجود الشركة قانونياً.
*   **البطاقة الضريبية:** للتسجيل لدى مصلحة الضرائب وفتح ملف ضريبي.
*   **شهادة عدم التباس الاسم التجاري:** لضمان أن اسم "${data.companyName}" غير مستخدم من قبل.
*   **عقد التأسيس والنظام الأساسي:** يوثق حقوق والتزامات الـ ${data.foundersCount} شركاء.
*   **شهادة إيداع بنكية:** تفيد بإيداع رأس المال (مطلوبة لبعض أنواع الشركات مثل المساهمة).
${data.industry === 'Food & Beverage' ? '*   **تراخيص الصحة والسلامة:** موافقة الجهات الصحية وتراخيص الحماية المدنية.' : ''}
${data.industry === 'Technology' ? '*   **تسجيل حقوق الملكية الفكرية:** (اختياري ولكنه موصى به) لحماية البرمجيات والعلامة التجارية.' : ''}
${data.industry === 'Manufacturing' ? '*   **رخصة التشغيل الصناعي:** وموافقات البيئة للمصنع.' : ''}

## 2. خارطة طريق التأسيس (خطوة بخطوة)
1.  **حجز الاسم التجاري:** التوجه لمكتب السجل التجاري أو البوابة الإلكترونية الحكومية في ${data.country} للاستعلام عن الاسم وحجزه.
2.  **صياغة وتوثيق العقد:** كتابة عقد التأسيس وتوثيقه أمام الجهة المختصة (مثل هيئة الاستثمار أو كاتب العدل).
3.  **سداد رسوم التأسيس:** دفع الرسوم المقررة في الغرفة التجارية والجهات المعنية.
4.  **القيد في السجل التجاري:** تقديم العقد الموثق والإيصالات لاستخراج السجل التجاري.
5.  **استخراج البطاقة الضريبية:** التسجيل في الضرائب خلال المدة القانونية (غالباً 30 يوماً من التأسيس).
6.  **فتح ملف تأميني:** تسجيل الشركة والموظفين في التأمينات الاجتماعية.

## 3. مقترح لهيكل عقد الشراكة (MoU)
بما أن الشركة تضم **${data.foundersCount}** من المؤسسين، يقترح تضمين البنود التالية في العقد الداخلي:

### أ. توزيع الحصص والملكية
*   يتم تحديد نسبة ملكية كل شريك بناءً على مساهمته (المالية أو المجهود).
*   **رأس المال:** ${data.capital || 'يحدد لاحقاً'}.

### ب. الإدارة والتوقيع
*   تعيين **مدير تنفيذي** للشركة وله حق التوقيع وتمثيل الشركة أمام البنوك والجهات الحكومية.
*   تحديد القرارات التي تتطلب موافقة بالإجماع (مثل بيع الأصول، الاقتراض، أو حل الشركة).

### ج. آليات التخارج (Exit Strategy)
*   **حق الشفعة (Right of First Refusal):** في حال رغبة أحد الشركاء في بيع حصته، يجب عرضها أولاً على الشركاء الحاليين قبل أي طرف خارجي.
*   **فترة الحظر (Vesting Period):** (موصى به للشركات الناشئة) تحديد مدة زمنية (مثلاً 4 سنوات) لاكتساب الأسهم كاملة لضمان استمرار المؤسسين.

## 4. نصائح إضافية لمجال ${data.industry}
*   **الحساب البنكي:** سارع بفتح حساب بنكي باسم الشركة فور استلام السجل التجاري.
*   **المحاسب القانوني:** تعيين محاسب قانوني أمر ضروري لتقديم الإقرارات الضريبية الشهرية والسنوية وتجنب الغرامات.
*   **العقود:** جهز نماذج عقود عمل للموظفين وعقود عدم إفصاح (NDA) لحماية أسرار العمل.
`;
  } else {
    markdown = `
# Incorporation Report: ${data.companyName}
**Country:** ${data.country} | **Industry:** ${data.industry} | **Capital:** ${data.capital || 'N/A'}

---

## 1. Required Licenses & Government Documents
Based on standard business regulations in ${data.country} for the **${data.industry}** sector, here is what you typically need:

*   **Commercial Register:** The official document proving the legal existence of your entity.
*   **Tax Registration Card:** Mandatory for tax filing and compliance.
*   **Trade Name Clearance:** Certificate ensuring the name "${data.companyName}" is unique.
*   **Articles of Incorporation:** Defines the relationship between the ${data.foundersCount} founders.
*   **Bank Deposit Certificate:** Proof of capital deposit (required for certain company structures).
${data.industry === 'Food & Beverage' ? '*   **Health & Safety Permits:** Approval from health authorities and civil defense.' : ''}
${data.industry === 'Technology' ? '*   **IP Registration:** (Recommended) To protect your source code and trademarks.' : ''}
${data.industry === 'Manufacturing' ? '*   **Industrial Operating License:** And environmental approvals for factories.' : ''}

## 2. Incorporation Roadmap (Step-by-Step)
1.  **Name Reservation:** Query and reserve the trade name at the Commercial Registry or government portal in ${data.country}.
2.  **Drafting & Notarization:** Draft the Articles of Association and notarize them at the Investment Authority or Notary Public.
3.  **Fee Payment:** Pay incorporation fees at the Chamber of Commerce and relevant bodies.
4.  **Commercial Registration:** Submit notarized docs to obtain the Commercial Register.
5.  **Tax Registration:** Register with the Tax Authority within the legal timeframe (usually 30 days).
6.  **Social Insurance:** Open a file for the company and employees at the Social Insurance Authority.

## 3. Draft Partnership Structure (MoU)
Since there are **${data.foundersCount}** founders, consider including the following clauses in your shareholders' agreement:

### A. Equity & Ownership
*   Equity split based on contribution (capital or effort).
*   **Initial Capital:** ${data.capital || 'TBD'}.

### B. Management & Signing Rights
*   Appoint a **CEO/Manager** with signing authority for banks and government entities.
*   Define "Reserved Matters" that require unanimous vote (e.g., selling assets, taking loans, liquidation).

### C. Exit Strategy
*   **Right of First Refusal:** If a founder wants to sell shares, they must offer them to existing partners first.
*   **Vesting Schedule:** (Recommended for Startups) Shares are earned over time (e.g., 4 years) to ensure founder commitment.

## 4. Additional Tips for ${data.industry}
*   **Bank Account:** Open a corporate bank account immediately after receiving the Commercial Register.
*   **Auditor:** Hiring a chartered accountant is crucial for filing monthly/annual tax returns.
*   **Contracts:** Prepare standard employment contracts and Non-Disclosure Agreements (NDAs).
`;
  }

  return {
    markdown,
    groundingSources: [] // Static generation does not include live search sources
  };
};