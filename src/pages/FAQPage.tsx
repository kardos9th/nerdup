import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const FAQPage = () => {
  const faqs = [
    {
      question: "كيف يمكنني التسجيل في المنصة؟",
      answer: "يمكنك التسجيل بسهولة من خلال النقر على زر 'إنشاء حساب' في الصفحة الرئيسية وإدخال بياناتك الأساسية."
    },
    {
      question: "هل المحتوى متاح لجميع الصفوف الدراسية؟",
      answer: "نعم، نوفر محتوى شامل لجميع صفوف المرحلة الثانوية (الأول والثاني والثالث الثانوي)."
    },
    {
      question: "هل يمكنني تحميل المحاضرات لمشاهدتها لاحقاً؟",
      answer: "نعم، يمكنك حفظ الحصص في حسابك والوصول إليها في أي وقت. كما يمكنك تحميل الملفات التعليمية المرفقة."
    },
    {
      question: "كيف أختار المعلم المناسب؟",
      answer: "يمكنك الاطلاع على تقييمات الطلاب السابقين لكل معلم وعدد الطلاب المسجلين لديه لمساعدتك في اتخاذ القرار."
    },
    {
      question: "هل المنصة متاحة على الهاتف المحمول؟",
      answer: "نعم، المنصة مصممة بشكل كامل لتعمل بكفاءة على جميع الأجهزة بما في ذلك الهواتف المحمولة والأجهزة اللوحية."
    },
    {
      question: "ماذا أفعل إذا واجهت مشكلة تقنية؟",
      answer: "يمكنك التواصل معنا من خلال صفحة 'تواصل معنا' وسنرد عليك في أقرب وقت ممكن."
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        <section className="bg-gradient-to-b from-primary/5 to-background py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">الأسئلة الشائعة</h1>
              <p className="text-lg text-muted-foreground">
                إجابات على أكثر الأسئلة شيوعاً
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border rounded-lg px-6"
                >
                  <AccordionTrigger className="text-right hover:no-underline py-6">
                    <span className="font-semibold text-lg">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQPage;
