import { FormEvent, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { curriculum } from "@/data/curriculum";
import { useEffect } from "react";
import { useAdmin } from "@/hooks/use-admin";
import { useSiteContent } from "@/contexts/SiteContentContext";

const GradePage = () => {
  const { gradeId, streamId } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAdmin();
  const { content, addSubject, updateSubject, deleteSubject } = useSiteContent();
  const [newSubjectName, setNewSubjectName] = useState("");
  const [newSubjectCounts, setNewSubjectCounts] = useState(true);
  
  const grade = curriculum.find(g => g.id === parseInt(gradeId || "10"));

  useEffect(() => {
    // If this grade has streams but no streamId provided, redirect to stream selection
    if (grade && grade.hasStreams && !streamId) {
      navigate(`/grade/${gradeId}/streams`);
    }
  }, [grade, gradeId, streamId, navigate]);

  if (!grade) {
    return null;
  }

  // Get subjects based on grade structure
  let subjects = content.subjects
    .filter((subject) => subject.gradeId === grade.id && (subject.streamId || "") === (streamId || ""))
    .map((subject) => ({
      ...subject,
      icon: BookOpen,
      color: "text-primary",
      bgColor: "bg-primary/10",
    }));
  let streamName = "";
  
  if (grade.hasStreams && streamId && grade.streams) {
    const stream = grade.streams.find(s => s.id === streamId);
    if (stream) {
      streamName = stream.name;
    }
  }

  const handleAddSubject = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newSubjectName.trim()) return;

    addSubject({
      gradeId: grade.id,
      streamId,
      name: newSubjectName.trim(),
      countsTowardsTotal: newSubjectCounts,
    });
    setNewSubjectName("");
    setNewSubjectCounts(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-12 border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Link to="/" className="hover:text-primary">الرئيسية</Link>
                <span>/</span>
                <span>{grade.name}</span>
                {streamName && (
                  <>
                    <span>/</span>
                    <span>{streamName}</span>
                  </>
                )}
              </div>
              <h1 className="text-4xl font-bold mb-3">
                {grade.name}
                {streamName && <span className="text-primary"> - {streamName}</span>}
              </h1>
              <p className="text-lg text-muted-foreground">
                اختر المادة للوصول إلى أفضل المعلمين والحصص
              </p>
            </div>
          </div>
        </section>

        {/* Subjects Grid */}
        <section className="py-12 container mx-auto px-4">
          {isAdmin && (
            <Card className="mb-8 border-primary/30 bg-primary/5">
              <CardContent className="p-6 space-y-5">
                <div>
                  <h2 className="text-xl font-bold">إدارة مواد هذا الصف</h2>
                  <p className="text-sm text-muted-foreground">أضف مادة جديدة أو عدّل أسماء المواد المعروضة للطلاب.</p>
                </div>

                <form className="grid gap-3 md:grid-cols-[1fr_auto_auto]" onSubmit={handleAddSubject}>
                  <Input
                    value={newSubjectName}
                    onChange={(event) => setNewSubjectName(event.target.value)}
                    placeholder="اسم المادة"
                  />
                  <label className="flex items-center gap-2 rounded-md border bg-background px-3 text-sm">
                    <input
                      type="checkbox"
                      checked={newSubjectCounts}
                      onChange={(event) => setNewSubjectCounts(event.target.checked)}
                    />
                    تضاف للمجموع
                  </label>
                  <Button type="submit">إضافة مادة</Button>
                </form>

                <div className="grid gap-3 md:grid-cols-2">
                  {subjects.map((subject) => (
                    <div key={subject.id} className="flex gap-2 rounded-md border bg-background p-2">
                      <Input
                        value={subject.name}
                        onChange={(event) => updateSubject(subject.id, { name: event.target.value })}
                      />
                      <Button variant="outline" onClick={() => deleteSubject(subject.id)}>
                        حذف
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Subjects that count towards total */}
          <div className="mb-12">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">المواد الأساسية</h2>
              <p className="text-muted-foreground">هذه المواد تُضاف للمجموع</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {subjects.filter(s => s.countsTowardsTotal).map((subject) => (
                <Link key={subject.name} to={`/subject/${encodeURIComponent(subject.name)}`}>
                  <Card className="hover:shadow-lg transition-all cursor-pointer h-full border-2 hover:border-primary/50">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className={`w-14 h-14 rounded-xl ${subject.bgColor} flex items-center justify-center`}>
                          <subject.icon className={`h-7 w-7 ${subject.color}`} />
                        </div>
                        <Badge variant="default" className="text-xs">أساسي</Badge>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{subject.name}</h3>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Subjects that don't count towards total */}
          {subjects.filter(s => !s.countsTowardsTotal).length > 0 && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">المواد التكميلية</h2>
                <p className="text-muted-foreground">هذه المواد لا تُضاف للمجموع</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {subjects.filter(s => !s.countsTowardsTotal).map((subject) => (
                  <Link key={subject.name} to={`/subject/${encodeURIComponent(subject.name)}`}>
                    <Card className="hover:shadow-lg transition-all cursor-pointer h-full border-2 hover:border-muted">
                      <CardContent className="p-6 space-y-4">
                        <div className="flex justify-between items-start">
                          <div className={`w-14 h-14 rounded-xl ${subject.bgColor} flex items-center justify-center`}>
                            <subject.icon className={`h-7 w-7 ${subject.color}`} />
                          </div>
                          <Badge variant="secondary" className="text-xs">تكميلي</Badge>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{subject.name}</h3>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default GradePage;
