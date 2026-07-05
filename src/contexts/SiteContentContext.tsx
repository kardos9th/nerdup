import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import {
  defaultSiteContent,
  ManagedCourse,
  ManagedLesson,
  ManagedResource,
  ManagedSubject,
  ManagedTeacher,
  SiteContent,
} from "@/data/siteContent";

const STORAGE_KEY = "nerdup:site-content";

interface SiteContentContextValue {
  content: SiteContent;
  resetContent: () => void;
  addSubject: (subject: Omit<ManagedSubject, "id">) => void;
  updateSubject: (id: string, updates: Partial<ManagedSubject>) => void;
  deleteSubject: (id: string) => void;
  addTeacher: (teacher: Omit<ManagedTeacher, "id" | "rating" | "reviewCount" | "studentCount" | "image"> & { image?: string }) => void;
  updateTeacher: (id: string, updates: Partial<ManagedTeacher>) => void;
  deleteTeacher: (id: string) => void;
  addCourse: (course: Omit<ManagedCourse, "id" | "lessons" | "resources">) => void;
  updateCourse: (id: string, updates: Partial<ManagedCourse>) => void;
  deleteCourse: (id: string) => void;
  addLesson: (courseId: string, lesson: Omit<ManagedLesson, "id">) => void;
  deleteLesson: (courseId: string, lessonId: string) => void;
  addResource: (courseId: string, resource: Omit<ManagedResource, "id">) => void;
  deleteResource: (courseId: string, resourceId: string) => void;
}

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const readStoredContent = (): SiteContent => {
  if (typeof window === "undefined") {
    return defaultSiteContent;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? { ...defaultSiteContent, ...JSON.parse(stored) } : defaultSiteContent;
  } catch {
    return defaultSiteContent;
  }
};

export const SiteContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<SiteContent>(readStoredContent);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  }, [content]);

  const value = useMemo<SiteContentContextValue>(
    () => ({
      content,
      resetContent: () => setContent(defaultSiteContent),
      addSubject: (subject) =>
        setContent((current) => ({
          ...current,
          subjects: [...current.subjects, { ...subject, id: createId() }],
        })),
      updateSubject: (id, updates) =>
        setContent((current) => ({
          ...current,
          subjects: current.subjects.map((subject) => (subject.id === id ? { ...subject, ...updates } : subject)),
        })),
      deleteSubject: (id) =>
        setContent((current) => ({
          ...current,
          subjects: current.subjects.filter((subject) => subject.id !== id),
        })),
      addTeacher: (teacher) =>
        setContent((current) => ({
          ...current,
          teachers: [
            ...current.teachers,
            {
              ...teacher,
              id: createId(),
              rating: 5,
              reviewCount: 0,
              studentCount: 0,
              image: teacher.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(teacher.name)}`,
            },
          ],
        })),
      updateTeacher: (id, updates) =>
        setContent((current) => ({
          ...current,
          teachers: current.teachers.map((teacher) => (teacher.id === id ? { ...teacher, ...updates } : teacher)),
        })),
      deleteTeacher: (id) =>
        setContent((current) => ({
          ...current,
          teachers: current.teachers.filter((teacher) => teacher.id !== id),
          courses: current.courses.filter((course) => course.teacherId !== id),
        })),
      addCourse: (course) =>
        setContent((current) => ({
          ...current,
          courses: [...current.courses, { ...course, id: createId(), lessons: [], resources: [] }],
        })),
      updateCourse: (id, updates) =>
        setContent((current) => ({
          ...current,
          courses: current.courses.map((course) => (course.id === id ? { ...course, ...updates } : course)),
        })),
      deleteCourse: (id) =>
        setContent((current) => ({
          ...current,
          courses: current.courses.filter((course) => course.id !== id),
        })),
      addLesson: (courseId, lesson) =>
        setContent((current) => ({
          ...current,
          courses: current.courses.map((course) =>
            course.id === courseId
              ? { ...course, lessons: [...course.lessons, { ...lesson, id: createId() }] }
              : course,
          ),
        })),
      deleteLesson: (courseId, lessonId) =>
        setContent((current) => ({
          ...current,
          courses: current.courses.map((course) =>
            course.id === courseId
              ? { ...course, lessons: course.lessons.filter((lesson) => lesson.id !== lessonId) }
              : course,
          ),
        })),
      addResource: (courseId, resource) =>
        setContent((current) => ({
          ...current,
          courses: current.courses.map((course) =>
            course.id === courseId
              ? { ...course, resources: [...course.resources, { ...resource, id: createId() }] }
              : course,
          ),
        })),
      deleteResource: (courseId, resourceId) =>
        setContent((current) => ({
          ...current,
          courses: current.courses.map((course) =>
            course.id === courseId
              ? { ...course, resources: course.resources.filter((resource) => resource.id !== resourceId) }
              : course,
          ),
        })),
    }),
    [content],
  );

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
};

export const useSiteContent = () => {
  const context = useContext(SiteContentContext);

  if (!context) {
    throw new Error("useSiteContent must be used within SiteContentProvider");
  }

  return context;
};
