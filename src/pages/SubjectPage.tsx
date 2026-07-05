import { FormEvent, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BookOpen, Star, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { useAdmin } from "@/hooks/use-admin";

const SubjectPage = () => {
  const { subjectName } = useParams();
  const decodedSubjectName = decodeURIComponent(subjectName || "");
  const { isAdmin } = useAdmin();
  const { content, addTeacher, updateTeacher, deleteTeacher } = useSiteContent();
  const [teacherName, setTeacherName] = useState("");
  const [teacherBio, setTeacherBio] = useState("");
  const [teacherImage, setTeacherImage] = useState("");

  const teachers = content.teachers
    .filter((teacher) => teacher.subject === decodedSubjectName)
    .map((teacher) => ({
      ...teacher,
      courses: content.courses.filter((course) => course.teacherId === teacher.id).length,
    }));

  const handleAddTeacher = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!teacherName.trim()) return;

    addTeacher({
      name: teacherName.trim(),
      subject: decodedSubjectName,
      bio: teacherBio.trim() || "مدرس متخصص على منصة NerdUp.",
      image: teacherImage,
      featured: true,
    });
    setTeacherName("");
    setTeacherBio("");
    setTeacherImage("");
  };

  const handleTeacherImageChange = (file?: File) => {
    if (!file) {
      setTeacherImage("");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setTeacherImage(String(reader.result || ""));
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        <section className="bg-gradient-to-b from-primary/5 to-background py-12 border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Link to="/" className="hover:text-primary">الرئيسية</Link>
                <span>/</span>
                <span>{decodedSubjectName}</span>
              </div>
              <h1 className="text-4xl font-bold mb-3">معلمو {decodedSubjectName}</h1>
              <p className="text-lg text-muted-foreground">
                اختر من بين أفضل المعلمين المتخصصين
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 container mx-auto px-4">
          {isAdmin && (
            <Card className="mb-8 border-primary/30 bg-primary/5">
              <CardContent className="p-6 space-y-5">
                <div>
                  <h2 className="text-xl font-bold">إدارة مدرسي {decodedSubjectName}</h2>
                  <p className="text-sm text-muted-foreground">
                    أضف مدرسًا جديدًا أو عدّل بروفايل المدرسين الحاليين من نفس الصفحة.
                  </p>
                </div>

                <form className="grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto]" onSubmit={handleAddTeacher}>
                  <Input
                    value={teacherName}
                    onChange={(event) => setTeacherName(event.target.value)}
                    placeholder="اسم المدرس"
                  />
                  <Input
                    value={teacherBio}
                    onChange={(event) => setTeacherBio(event.target.value)}
                    placeholder="نبذة مختصرة"
                  />
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleTeacherImageChange(event.target.files?.[0])}
                  />
                  <Button type="submit">إضافة مدرس</Button>
                </form>

                {teacherImage && (
                  <div className="flex items-center gap-3 rounded-md border bg-background p-3">
                    <img src={teacherImage} alt="معاينة صورة المدرس" className="h-14 w-14 rounded-full object-cover" />
                    <div className="text-sm text-muted-foreground">معاينة الصورة المختارة</div>
                    <Button variant="outline" size="sm" onClick={() => setTeacherImage("")}>
                      إزالة الصورة
                    </Button>
                  </div>
                )}

                <div className="grid gap-3 md:grid-cols-2">
                  {teachers.map((teacher) => (
                    <div key={teacher.id} className="space-y-2 rounded-md border bg-background p-3">
                      <Input
                        value={teacher.name}
                        onChange={(event) => updateTeacher(teacher.id, { name: event.target.value })}
                      />
                      <Input
                        value={teacher.bio}
                        onChange={(event) => updateTeacher(teacher.id, { bio: event.target.value })}
                      />
                      <Button variant="outline" size="sm" onClick={() => deleteTeacher(teacher.id)}>
                        حذف المدرس
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachers.map((teacher) => (
              <Link key={teacher.id} to={`/teacher/${teacher.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start gap-4">
                      <img
                        src={teacher.image}
                        alt={teacher.name}
                        className="w-16 h-16 rounded-full bg-muted object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-1">{teacher.name}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{teacher.rating}</span>
                          <span className="text-sm text-muted-foreground">
                            ({teacher.reviewCount} تقييم)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{teacher.studentCount.toLocaleString()} طالب</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span>{teacher.courses} حصص</span>
                      </div>
                    </div>

                    {teacher.featured && (
                      <Badge className="bg-accent text-accent-foreground">معلم متميز</Badge>
                    )}
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

export default SubjectPage;
