import { FormEvent, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Award, BookOpen, Star, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { useAdmin } from "@/hooks/use-admin";

const TeacherPage = () => {
  const { teacherId } = useParams();
  const { isAdmin } = useAdmin();
  const { content, addCourse, updateCourse, deleteCourse } = useSiteContent();
  const teacher = content.teachers.find((item) => item.id === teacherId) ?? content.teachers[0];
  const courses = content.courses.filter((course) => course.teacherId === teacher.id);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [courseDescription, setCourseDescription] = useState("");

  const handleAddCourse = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!courseTitle.trim()) return;

    addCourse({
      teacherId: teacher.id,
      title: courseTitle.trim(),
      subject: teacher.subject,
      description: courseDescription.trim() || "حصة جديدة على منصة NerdUp.",
      duration: courseDuration.trim() || "غير محدد",
      students: 0,
      youtubePlaylistId: "",
    });
    setCourseTitle("");
    setCourseDuration("");
    setCourseDescription("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        <section className="bg-gradient-to-b from-primary/5 to-background py-12 border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link to="/" className="hover:text-primary">الرئيسية</Link>
              <span>/</span>
              <Link to={`/subject/${encodeURIComponent(teacher.subject)}`} className="hover:text-primary">
                {teacher.subject}
              </Link>
              <span>/</span>
              <span>{teacher.name}</span>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              <img
                src={teacher.image}
                alt={teacher.name}
                className="w-32 h-32 rounded-2xl bg-muted object-cover"
              />

              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{teacher.name}</h1>
                  <p className="text-xl text-muted-foreground">{teacher.subject}</p>
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <= Math.round(teacher.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-lg">{teacher.rating}</span>
                    <span className="text-muted-foreground">({teacher.reviewCount} تقييم)</span>
                  </div>
                  {teacher.featured && (
                    <Badge className="bg-accent text-accent-foreground">
                      <Award className="h-4 w-4 ml-1" />
                      معلم متميز
                    </Badge>
                  )}
                </div>

                <div className="flex gap-6 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <span>{teacher.studentCount.toLocaleString()} طالب</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-muted-foreground" />
                    <span>{courses.length} حصص</span>
                  </div>
                </div>

                <p className="text-muted-foreground">{teacher.bio}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 container mx-auto px-4">
          {isAdmin && (
            <Card className="mb-8 border-primary/30 bg-primary/5">
              <CardContent className="p-6 space-y-5">
                <div>
                  <h2 className="text-xl font-bold">إدارة حصص {teacher.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    أضف حصة جديدة أو عدّل العنوان والمدة والوصف للحصص الحالية.
                  </p>
                </div>

                <form className="grid gap-3 md:grid-cols-[1fr_160px_1fr_auto]" onSubmit={handleAddCourse}>
                  <Input value={courseTitle} onChange={(event) => setCourseTitle(event.target.value)} placeholder="عنوان الحصة" />
                  <Input value={courseDuration} onChange={(event) => setCourseDuration(event.target.value)} placeholder="المدة" />
                  <Input value={courseDescription} onChange={(event) => setCourseDescription(event.target.value)} placeholder="وصف مختصر" />
                  <Button type="submit">إضافة حصة</Button>
                </form>

                <div className="grid gap-3 md:grid-cols-2">
                  {courses.map((course) => (
                    <div key={course.id} className="space-y-2 rounded-md border bg-background p-3">
                      <Input value={course.title} onChange={(event) => updateCourse(course.id, { title: event.target.value })} />
                      <Input value={course.duration} onChange={(event) => updateCourse(course.id, { duration: event.target.value })} />
                      <Button variant="outline" size="sm" onClick={() => deleteCourse(course.id)}>
                        حذف الحصة
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <h2 className="text-3xl font-bold mb-8">الحصص المتاحة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Link key={course.id} to={`/course/${course.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-lg flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-primary" />
                    </div>
                    <div className="p-6 space-y-3">
                      <h3 className="text-lg font-semibold line-clamp-2">{course.title}</h3>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>{course.lessons.length} درس</span>
                        <span>•</span>
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4" />
                        <span>{course.students} طالب</span>
                      </div>
                      <Button className="w-full">عرض الحصة</Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TeacherPage;
