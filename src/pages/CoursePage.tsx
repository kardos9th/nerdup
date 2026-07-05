import { FormEvent, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BookmarkPlus, Check, ChevronLeft, Download, ExternalLink, Youtube } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import YouTubeEmbed, { getYouTubeWatchUrl } from "@/components/YouTubeEmbed";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { useAdmin } from "@/hooks/use-admin";

const CoursePage = () => {
  const { courseId } = useParams();
  const { isAdmin } = useAdmin();
  const { content, addLesson, deleteLesson, addResource, deleteResource } = useSiteContent();
  const [savedCourse, setSavedCourse] = useState(false);
  const course = content.courses.find((item) => item.id === courseId) ?? content.courses[0];
  const teacher = content.teachers.find((item) => item.id === course.teacherId);
  const lessons = course.lessons;
  const [activeLessonId, setActiveLessonId] = useState(lessons[0]?.id || "");
  const activeLesson = useMemo(
    () => lessons.find((lesson) => lesson.id === activeLessonId) ?? lessons[0],
    [activeLessonId, lessons],
  );
  const watchUrl = activeLesson
    ? getYouTubeWatchUrl(activeLesson.youtubeId, course.youtubePlaylistId)
    : "#";

  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonDuration, setLessonDuration] = useState("");
  const [lessonYoutube, setLessonYoutube] = useState("");
  const [resourceTitle, setResourceTitle] = useState("");
  const [resourceUrl, setResourceUrl] = useState("");
  const [resourceSize, setResourceSize] = useState("");

  const handleAddLesson = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!lessonTitle.trim() || !lessonYoutube.trim()) return;

    addLesson(course.id, {
      title: lessonTitle.trim(),
      duration: lessonDuration.trim() || "غير محدد",
      youtubeId: lessonYoutube.trim(),
      description: "درس جديد داخل الحصة.",
    });
    setLessonTitle("");
    setLessonDuration("");
    setLessonYoutube("");
  };

  const handleAddResource = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!resourceTitle.trim() || !resourceUrl.trim()) return;

    addResource(course.id, {
      title: resourceTitle.trim(),
      type: "PDF",
      size: resourceSize.trim() || "غير محدد",
      url: resourceUrl.trim(),
    });
    setResourceTitle("");
    setResourceUrl("");
    setResourceSize("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">الرئيسية</Link>
            <span>/</span>
            <Link to={`/subject/${encodeURIComponent(course.subject)}`} className="hover:text-primary">{course.subject}</Link>
            {teacher && (
              <>
                <span>/</span>
                <Link to={`/teacher/${teacher.id}`} className="hover:text-primary">{teacher.name}</Link>
              </>
            )}
            <span>/</span>
            <span className="truncate">{course.title}</span>
          </div>

          {isAdmin && (
            <Card className="mb-8 border-primary/30 bg-primary/5">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h2 className="text-xl font-bold">إدارة محتوى الحصة</h2>
                  <p className="text-sm text-muted-foreground">
                    أضف دروس يوتيوب وملفات PDF تظهر مباشرة للطلاب.
                  </p>
                </div>

                <form className="grid gap-3 md:grid-cols-[1fr_140px_1fr_auto]" onSubmit={handleAddLesson}>
                  <Input value={lessonTitle} onChange={(event) => setLessonTitle(event.target.value)} placeholder="عنوان الدرس" />
                  <Input value={lessonDuration} onChange={(event) => setLessonDuration(event.target.value)} placeholder="المدة" />
                  <Input value={lessonYoutube} onChange={(event) => setLessonYoutube(event.target.value)} placeholder="YouTube ID أو رابط الفيديو" dir="ltr" />
                  <Button type="submit">إضافة درس</Button>
                </form>

                <form className="grid gap-3 md:grid-cols-[1fr_1fr_120px_auto]" onSubmit={handleAddResource}>
                  <Input value={resourceTitle} onChange={(event) => setResourceTitle(event.target.value)} placeholder="عنوان ملف PDF" />
                  <Input value={resourceUrl} onChange={(event) => setResourceUrl(event.target.value)} placeholder="رابط ملف PDF" dir="ltr" />
                  <Input value={resourceSize} onChange={(event) => setResourceSize(event.target.value)} placeholder="الحجم" />
                  <Button type="submit">إضافة PDF</Button>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardContent className="p-0">
                  {activeLesson ? (
                    <YouTubeEmbed
                      url={activeLesson.youtubeId}
                      title={activeLesson.title}
                      playlistId={course.youtubePlaylistId}
                      className="rounded-b-none"
                    />
                  ) : (
                    <div className="aspect-video rounded-t-lg bg-muted flex items-center justify-center text-muted-foreground">
                      لا توجد دروس بعد
                    </div>
                  )}
                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <h1 className="text-2xl md:text-3xl font-bold">{activeLesson?.title || course.title}</h1>
                      <p className="text-muted-foreground">{activeLesson?.description || course.description}</p>
                    </div>

                    <div className="flex items-center gap-4 flex-wrap">
                      {teacher && (
                        <Link to={`/teacher/${teacher.id}`} className="text-primary hover:underline font-medium">
                          {teacher.name}
                        </Link>
                      )}
                      <Badge variant="secondary">{course.subject}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {course.students} طالب مسجل
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {activeLesson && (
                        <Button variant="outline" asChild>
                          <a href={watchUrl} target="_blank" rel="noopener noreferrer">
                            <Youtube className="h-4 w-4 ml-2" />
                            مشاهدة على يوتيوب
                            <ExternalLink className="h-3.5 w-3.5 mr-2" />
                          </a>
                        </Button>
                      )}
                      <Button onClick={() => setSavedCourse(!savedCourse)}>
                        <BookmarkPlus className="h-4 w-4 ml-2" />
                        {savedCourse ? "تم الحفظ" : "احفظ الحصة"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">المواد التعليمية</h2>
                  <div className="space-y-3">
                    {course.resources.map((resource) => (
                      <div
                        key={resource.id}
                        className="flex items-center justify-between gap-4 p-4 rounded-lg border hover:border-primary transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Download className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{resource.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {resource.type} • {resource.size}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" asChild>
                            <a href={resource.url} target="_blank" rel="noopener noreferrer">
                              <Download className="h-4 w-4" />
                            </a>
                          </Button>
                          {isAdmin && (
                            <Button variant="outline" size="sm" onClick={() => deleteResource(course.id, resource.id)}>
                              حذف
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold mb-2">قائمة تشغيل الحصة</h2>
                    <p className="text-sm text-muted-foreground">
                      {lessons.length} درس • {course.duration}
                    </p>
                  </div>

                  <ScrollArea className="h-[600px] -mx-2 px-2">
                    <div className="space-y-2">
                      {lessons.map((lesson, index) => {
                        const isActive = lesson.id === activeLesson?.id;
                        return (
                          <button
                            key={lesson.id}
                            onClick={() => setActiveLessonId(lesson.id)}
                            className={`w-full text-right p-4 rounded-lg border transition-colors ${
                              isActive ? "border-primary bg-primary/5" : "hover:border-primary"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 mt-1">
                                <div className="w-6 h-6 rounded-full border-2 border-muted flex items-center justify-center">
                                  {isActive ? <Check className="h-4 w-4 text-primary" /> : <span className="text-xs text-muted-foreground">{index + 1}</span>}
                                </div>
                              </div>
                              <div className="flex-1 text-sm">
                                <p className="font-medium mb-1">{lesson.title}</p>
                                <p className="text-muted-foreground">{lesson.duration}</p>
                                {isAdmin && (
                                  <span
                                    className="mt-2 inline-block text-xs text-destructive"
                                    onClick={(event) => {
                                      event.stopPropagation();
                                      deleteLesson(course.id, lesson.id);
                                    }}
                                  >
                                    حذف الدرس
                                  </span>
                                )}
                              </div>
                              <ChevronLeft className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CoursePage;
