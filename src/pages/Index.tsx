import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useMemo, useState } from "react";
import { Search, BookOpen, Users, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { curriculum } from "@/data/curriculum";
import { useSiteContent } from "@/contexts/SiteContentContext";

const Index = () => {
  const navigate = useNavigate();
  const { content } = useSiteContent();
  const [searchQuery, setSearchQuery] = useState("");

  const normalizeSearchText = (value: string) =>
    value
      .trim()
      .toLowerCase()
      .replace(/[أإآ]/g, "ا")
      .replace(/ى/g, "ي")
      .replace(/ة/g, "ه")
      .replace(/[ً-ْ]/g, "");

  const searchResults = useMemo(() => {
    const query = normalizeSearchText(searchQuery);

    if (!query) {
      return [];
    }

    const results: Array<{ title: string; description: string; path: string }> = [];
    const seen = new Set<string>();

    const addResult = (title: string, description: string, path: string) => {
      const key = `${title}-${path}`;
      if (!seen.has(key)) {
        seen.add(key);
        results.push({ title, description, path });
      }
    };

    curriculum.forEach((grade) => {
      const gradePath = grade.hasStreams ? `/grade/${grade.id}/streams` : `/grade/${grade.id}`;

      if (normalizeSearchText(grade.name).includes(query)) {
        addResult(grade.name, "صف دراسي", gradePath);
      }

      grade.subjects?.forEach((subject) => {
        if (normalizeSearchText(subject.name).includes(query)) {
          addResult(subject.name, grade.name, `/subject/${encodeURIComponent(subject.name)}`);
        }
      });

      grade.streams?.forEach((stream) => {
        const streamPath = `/grade/${grade.id}/stream/${stream.id}`;

        if (normalizeSearchText(stream.name).includes(query)) {
          addResult(stream.name, grade.name, streamPath);
        }

        stream.subjects.forEach((subject) => {
          const searchableText = normalizeSearchText(`${subject.name} ${stream.name} ${grade.name}`);

          if (searchableText.includes(query)) {
            addResult(subject.name, `${grade.name} - ${stream.name}`, `/subject/${encodeURIComponent(subject.name)}`);
          }
        });
      });
    });

    content.teachers.forEach((teacher) => {
      if (normalizeSearchText(`${teacher.name} ${teacher.subject}`).includes(query)) {
        addResult(teacher.name, `مدرس ${teacher.subject}`, `/teacher/${teacher.id}`);
      }
    });

    content.courses.forEach((course) => {
      if (normalizeSearchText(`${course.title} ${course.subject}`).includes(query)) {
        addResult(course.title, `حصة ${course.subject}`, `/course/${course.id}`);
      }
    });

    return results.slice(0, 8);
  }, [content.courses, content.teachers, searchQuery]);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (searchResults[0]) {
      navigate(searchResults[0].path);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
          <img
            src="/nerdup-logo-bg.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute right-2 top-1/2 z-0 hidden h-[32rem] w-auto -translate-y-1/2 -rotate-12 select-none object-contain opacity-[0.07] dark:invert dark:opacity-[0.06] xl:block 2xl:right-12 2xl:h-[36rem]"
          />
          <div className="container relative z-10 mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                منصتك التعليمية المتكاملة
                <span className="block text-primary mt-2">للثانوية العامة</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                أفضل المعلمين، أقوى الحصص، وأحدث المناهج في مكان واحد
              </p>
              
              {/* Search Bar */}
              <form className="max-w-2xl mx-auto pt-6" onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    type="text"
                    dir="rtl"
                    placeholder="ابحث عن مادة، معلم، أو حصة..."
                    className="h-12 pr-12 pl-24 text-right text-lg text-foreground"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                  />
                  <Button type="submit" size="sm" className="absolute left-2 top-1/2 -translate-y-1/2">
                    بحث
                  </Button>

                  {searchQuery.trim() && (
                    <div className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-md border bg-background text-right shadow-lg">
                      {searchResults.length > 0 ? (
                        searchResults.map((result) => (
                          <Link
                            key={`${result.title}-${result.path}`}
                            to={result.path}
                            className="block border-b px-4 py-3 transition-colors last:border-b-0 hover:bg-muted"
                          >
                            <div className="font-medium">{result.title}</div>
                            <div className="text-sm text-muted-foreground">{result.description}</div>
                          </Link>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-sm text-muted-foreground">
                          لا توجد نتائج مطابقة
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </form>

            </div>
          </div>
        </section>

        {/* Grade Selection */}
        <section className="py-16 container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">اختر صفك الدراسي</h2>
            <p className="text-muted-foreground">ابدأ رحلتك التعليمية من هنا</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {curriculum.map((grade) => {
              const linkPath = grade.hasStreams 
                ? `/grade/${grade.id}/streams`
                : `/grade/${grade.id}`;
              
              return (
                <Link key={grade.id} to={linkPath}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary">
                    <CardContent className="p-8 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                        <GraduationCap className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">{grade.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {grade.hasStreams ? "علمي وأدبي" : `${grade.subjects?.length || 0} مادة`}
                      </p>
                      <Button className="w-full">
                        {grade.hasStreams ? "اختر الشعبة" : "استعرض المواد"}
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Features */}
        <section className="py-16 container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">لماذا منصتنا؟</h2>
            <p className="text-muted-foreground">مميزات تجعل التعلم أسهل وأفضل</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                <BookOpen className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">محتوى شامل</h3>
              <p className="text-muted-foreground text-sm">
                دروس فيديو، ملفات PDF، وشروحات تفصيلية لكل المواد
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">معلمون متميزون</h3>
              <p className="text-muted-foreground text-sm">
                نخبة من أفضل المعلمين بتقييمات عالية من الطلاب
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                <GraduationCap className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">تجربة مخصصة</h3>
              <p className="text-muted-foreground text-sm">
                احفظ حصصك المفضلة وتابع تقدمك الدراسي بسهولة
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
