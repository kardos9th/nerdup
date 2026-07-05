import { BookOpen, Users, Award, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        <section className="bg-gradient-to-b from-primary/5 to-background py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">من نحن</h1>
              <p className="text-lg text-muted-foreground">
                منصة تعليمية رائدة تهدف إلى تطوير التعليم الثانوي في مصر
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">رؤيتنا</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                نسعى لتوفير تجربة تعليمية متميزة لطلاب الثانوية العامة من خلال توفير أفضل المحتوى التعليمي ونخبة من المعلمين المتميزين. نؤمن بأن التعليم الجيد حق للجميع ونعمل على جعله متاحاً وسهل الوصول.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6 space-y-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">هدفنا</h3>
                  <p className="text-muted-foreground">
                    مساعدة كل طالب على تحقيق أفضل النتائج من خلال محتوى تعليمي عالي الجودة
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-3">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Award className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold">قيمنا</h3>
                  <p className="text-muted-foreground">
                    الجودة، الشفافية، والالتزام بتقديم أفضل تجربة تعليمية ممكنة
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <div className="text-4xl font-bold text-primary">500+</div>
                <p className="text-muted-foreground">حصة تعليمية</p>
              </div>

              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div className="text-4xl font-bold text-primary">150+</div>
                <p className="text-muted-foreground">معلم متميز</p>
              </div>

              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <div className="text-4xl font-bold text-primary">10K+</div>
                <p className="text-muted-foreground">طالب نشط</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
