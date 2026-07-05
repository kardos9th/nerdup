import { curriculum } from "@/data/curriculum";

export interface ManagedSubject {
  id: string;
  gradeId: number;
  streamId?: string;
  name: string;
  countsTowardsTotal: boolean;
}

export interface ManagedTeacher {
  id: string;
  name: string;
  subject: string;
  rating: number;
  reviewCount: number;
  studentCount: number;
  image: string;
  bio: string;
  featured: boolean;
}

export interface ManagedLesson {
  id: string;
  title: string;
  duration: string;
  youtubeId: string;
  description: string;
}

export interface ManagedResource {
  id: string;
  title: string;
  type: string;
  size: string;
  url: string;
}

export interface ManagedCourse {
  id: string;
  teacherId: string;
  title: string;
  subject: string;
  description: string;
  duration: string;
  students: number;
  youtubePlaylistId: string;
  lessons: ManagedLesson[];
  resources: ManagedResource[];
}

export interface SiteContent {
  subjects: ManagedSubject[];
  teachers: ManagedTeacher[];
  courses: ManagedCourse[];
}

const flattenCurriculumSubjects = (): ManagedSubject[] => {
  const subjects: ManagedSubject[] = [];
  const seen = new Set<string>();

  curriculum.forEach((grade) => {
    grade.subjects?.forEach((subject) => {
      const id = `${grade.id}-${subject.name}`;
      if (!seen.has(id)) {
        seen.add(id);
        subjects.push({
          id,
          gradeId: grade.id,
          name: subject.name,
          countsTowardsTotal: subject.countsTowardsTotal,
        });
      }
    });

    grade.streams?.forEach((stream) => {
      stream.subjects.forEach((subject) => {
        const id = `${grade.id}-${stream.id}-${subject.name}`;
        if (!seen.has(id)) {
          seen.add(id);
          subjects.push({
            id,
            gradeId: grade.id,
            streamId: stream.id,
            name: subject.name,
            countsTowardsTotal: subject.countsTowardsTotal,
          });
        }
      });
    });
  });

  return subjects;
};

export const defaultSiteContent: SiteContent = {
  subjects: flattenCurriculumSubjects(),
  teachers: [
    {
      id: "1",
      name: "أ. محمد أحمد",
      subject: "الرياضيات",
      rating: 4.8,
      reviewCount: 245,
      studentCount: 1250,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=mohamed",
      bio: "معلم رياضيات متخصص بخبرة 15 عاماً في تدريس الثانوية العامة. حاصل على درجة الماجستير في التربية الرياضية.",
      featured: true,
    },
    {
      id: "2",
      name: "د. سارة حسن",
      subject: "الرياضيات",
      rating: 4.9,
      reviewCount: 312,
      studentCount: 1680,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=sara",
      bio: "مدرسة متخصصة في تبسيط المسائل الرياضية وربطها بالتطبيقات العملية.",
      featured: true,
    },
    {
      id: "3",
      name: "أ. أحمد علي",
      subject: "الرياضيات",
      rating: 4.7,
      reviewCount: 198,
      studentCount: 980,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=ahmed",
      bio: "خبرة قوية في مراجعات الثانوية العامة وبناء خطط مذاكرة واضحة للطلاب.",
      featured: false,
    },
    {
      id: "4",
      name: "د. فاطمة محمود",
      subject: "الرياضيات",
      rating: 4.9,
      reviewCount: 287,
      studentCount: 1420,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=fatma",
      bio: "مدرسة متميزة في شرح الجبر والتفاضل بطريقة منظمة وسهلة المتابعة.",
      featured: true,
    },
  ],
  courses: [
    {
      id: "1",
      teacherId: "1",
      title: "الجبر المتقدم - الصف الثالث الثانوي",
      subject: "الرياضيات",
      description: "حصة شاملة تغطي جميع أجزاء الجبر المتقدم للصف الثالث الثانوي مع شرح مفصل وأمثلة تطبيقية",
      duration: "5 ساعات",
      students: 450,
      youtubePlaylistId: "PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf",
      lessons: [
        {
          id: "1",
          title: "مقدمة في الجبر المتقدم",
          duration: "45 دقيقة",
          youtubeId: "dQw4w9WgXcQ",
          description: "نظرة عامة على المنهج وأهم المفاهيم الأساسية في الجبر المتقدم.",
        },
        {
          id: "2",
          title: "المصفوفات والعمليات عليها",
          duration: "52 دقيقة",
          youtubeId: "kJQP7kiw5Fk",
          description: "تعريف المصفوفة، الجمع، الطرح، والضرب مع أمثلة محلولة.",
        },
      ],
      resources: [
        {
          id: "1",
          title: "ملخص الجبر المتقدم",
          type: "PDF",
          size: "2.5 MB",
          url: "#",
        },
      ],
    },
  ],
};
