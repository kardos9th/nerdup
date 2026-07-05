import { useMemo } from "react";
import { BarChart3, BookOpen, Eye, GraduationCap, Users } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { readAnalytics } from "@/hooks/use-analytics";
import { useAdmin } from "@/hooks/use-admin";
import { Link } from "react-router-dom";

const StatsPage = () => {
  const { isAdmin } = useAdmin();
  const { content } = useSiteContent();
  const analytics = readAnalytics();

  const topPaths = useMemo(
    () =>
      Object.entries(analytics.paths)
        .sort(([, viewsA], [, viewsB]) => viewsB - viewsA)
        .slice(0, 6),
    [analytics.paths],
  );

  const stats = [
    { label: "إجمالي الزيارات", value: analytics.totalViews, icon: Eye },
    { label: "جلسات مميزة", value: analytics.uniqueSessions, icon: Users },
    { label: "عدد المواد", value: content.subjects.length, icon: BookOpen },
    { label: "عدد المدرسين", value: content.teachers.length, icon: GraduationCap },
    { label: "عدد الحصص", value: content.courses.length, icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {!isAdmin ? (
          <section className="container mx-auto px-4 py-16">
            <Card className="mx-auto max-w-md">
              <CardContent className="p-8 text-center space-y-4">
                <h1 className="text-2xl font-bold">هذه الصفحة للأدمن فقط</h1>
                <p className="text-muted-foreground">سجّل الدخول بحساب الأدمن لعرض الإحصائيات.</p>
                <Button asChild>
                  <Link to="/login">تسجيل الدخول</Link>
                </Button>
              </CardContent>
            </Card>
          </section>
        ) : (
        <>
        <section className="border-b bg-gradient-to-b from-primary/5 to-background py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <Badge className="mb-4">لوحة الأدمن</Badge>
              <h1 className="text-4xl font-bold mb-3">إحصائيات NerdUp</h1>
              <p className="text-muted-foreground">
                نظرة سريعة على نشاط الموقع والمحتوى المتاح حاليًا.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-10 space-y-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {stats.map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-5">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardContent className="p-6">
              <h2 className="mb-5 text-2xl font-bold">أكثر الصفحات زيارة</h2>
              <div className="space-y-3">
                {topPaths.length > 0 ? (
                  topPaths.map(([path, views]) => (
                    <div key={path} className="flex items-center justify-between rounded-lg border p-4">
                      <span className="font-medium" dir="ltr">{path}</span>
                      <Badge variant="secondary">{views} زيارة</Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">لا توجد زيارات مسجلة بعد.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </section>
        </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default StatsPage;
