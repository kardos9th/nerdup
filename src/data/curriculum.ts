import { Calculator, FlaskConical, Atom, TrendingUp, Languages, Globe, BookOpen, History, MapPin, Brain, Book, FileText, Dumbbell, Flag, Cross } from "lucide-react";

export interface Subject {
  name: string;
  icon: any;
  countsTowardsTotal: boolean;
  color: string;
  bgColor: string;
}

export interface Stream {
  id: string;
  name: string;
  subjects: Subject[];
}

export interface Grade {
  id: number;
  name: string;
  hasStreams: boolean;
  subjects?: Subject[];
  streams?: Stream[];
}

// Grade 10 subjects
const grade10Subjects: Subject[] = [
  { name: "اللغة العربية", icon: Languages, countsTowardsTotal: true, color: "text-orange-600", bgColor: "bg-orange-50 dark:bg-orange-950" },
  { name: "الرياضيات", icon: Calculator, countsTowardsTotal: true, color: "text-blue-600", bgColor: "bg-blue-50 dark:bg-blue-950" },
  { name: "التاريخ", icon: History, countsTowardsTotal: true, color: "text-amber-600", bgColor: "bg-amber-50 dark:bg-amber-950" },
  { name: "اللغة الأجنبية الأولى", icon: Globe, countsTowardsTotal: true, color: "text-indigo-600", bgColor: "bg-indigo-50 dark:bg-indigo-950" },
  { name: "الفلسفة والمنطق", icon: Brain, countsTowardsTotal: true, color: "text-purple-600", bgColor: "bg-purple-50 dark:bg-purple-950" },
  { name: "العلوم المتكاملة", icon: Atom, countsTowardsTotal: true, color: "text-cyan-600", bgColor: "bg-cyan-50 dark:bg-cyan-950" },
  { name: "التربية الدينية", icon: Cross, countsTowardsTotal: false, color: "text-emerald-600", bgColor: "bg-emerald-50 dark:bg-emerald-950" },
  { name: "اللغة الأجنبية الثانية", icon: Book, countsTowardsTotal: false, color: "text-pink-600", bgColor: "bg-pink-50 dark:bg-pink-950" },
  { name: "البرمجة وعلوم الحاسب", icon: FileText, countsTowardsTotal: false, color: "text-violet-600", bgColor: "bg-violet-50 dark:bg-violet-950" },
];

// Grade 11 streams
const grade11Streams: Stream[] = [
  {
    id: "scientific",
    name: "علمي",
    subjects: [
      { name: "اللغة العربية", icon: Languages, countsTowardsTotal: true, color: "text-orange-600", bgColor: "bg-orange-50 dark:bg-orange-950" },
      { name: "اللغة الأجنبية الأولى", icon: Globe, countsTowardsTotal: true, color: "text-indigo-600", bgColor: "bg-indigo-50 dark:bg-indigo-950" },
      { name: "الرياضيات", icon: Calculator, countsTowardsTotal: true, color: "text-blue-600", bgColor: "bg-blue-50 dark:bg-blue-950" },
      { name: "التاريخ", icon: History, countsTowardsTotal: true, color: "text-amber-600", bgColor: "bg-amber-50 dark:bg-amber-950" },
      { name: "الكيمياء", icon: FlaskConical, countsTowardsTotal: true, color: "text-green-600", bgColor: "bg-green-50 dark:bg-green-950" },
      { name: "الفيزياء", icon: Atom, countsTowardsTotal: true, color: "text-purple-600", bgColor: "bg-purple-50 dark:bg-purple-950" },
      { name: "التربية الدينية", icon: Cross, countsTowardsTotal: false, color: "text-emerald-600", bgColor: "bg-emerald-50 dark:bg-emerald-950" },
      { name: "اللغة الأجنبية الثانية", icon: Book, countsTowardsTotal: false, color: "text-pink-600", bgColor: "bg-pink-50 dark:bg-pink-950" },
      { name: "التربية الوطنية", icon: Flag, countsTowardsTotal: false, color: "text-red-600", bgColor: "bg-red-50 dark:bg-red-950" },
      { name: "التربية الرياضية", icon: Dumbbell, countsTowardsTotal: false, color: "text-lime-600", bgColor: "bg-lime-50 dark:bg-lime-950" },
    ],
  },
  {
    id: "literary",
    name: "أدبي",
    subjects: [
      { name: "اللغة العربية", icon: Languages, countsTowardsTotal: true, color: "text-orange-600", bgColor: "bg-orange-50 dark:bg-orange-950" },
      { name: "اللغة الأجنبية الأولى", icon: Globe, countsTowardsTotal: true, color: "text-indigo-600", bgColor: "bg-indigo-50 dark:bg-indigo-950" },
      { name: "الجغرافيا", icon: MapPin, countsTowardsTotal: true, color: "text-cyan-600", bgColor: "bg-cyan-50 dark:bg-cyan-950" },
      { name: "التاريخ", icon: History, countsTowardsTotal: true, color: "text-amber-600", bgColor: "bg-amber-50 dark:bg-amber-950" },
      { name: "علم النفس والاجتماع", icon: Brain, countsTowardsTotal: true, color: "text-purple-600", bgColor: "bg-purple-50 dark:bg-purple-950" },
      { name: "الرياضيات", icon: Calculator, countsTowardsTotal: true, color: "text-blue-600", bgColor: "bg-blue-50 dark:bg-blue-950" },
      { name: "التربية الدينية", icon: Cross, countsTowardsTotal: false, color: "text-emerald-600", bgColor: "bg-emerald-50 dark:bg-emerald-950" },
      { name: "اللغة الأجنبية الثانية", icon: Book, countsTowardsTotal: false, color: "text-pink-600", bgColor: "bg-pink-50 dark:bg-pink-950" },
      { name: "التربية الوطنية", icon: Flag, countsTowardsTotal: false, color: "text-red-600", bgColor: "bg-red-50 dark:bg-red-950" },
      { name: "التربية الرياضية", icon: Dumbbell, countsTowardsTotal: false, color: "text-lime-600", bgColor: "bg-lime-50 dark:bg-lime-950" },
    ],
  },
];

// Grade 12 streams
const grade12Streams: Stream[] = [
  {
    id: "scientific-biology",
    name: "علمي علوم",
    subjects: [
      { name: "اللغة العربية", icon: Languages, countsTowardsTotal: true, color: "text-orange-600", bgColor: "bg-orange-50 dark:bg-orange-950" },
      { name: "اللغة الأجنبية الأولى", icon: Globe, countsTowardsTotal: true, color: "text-indigo-600", bgColor: "bg-indigo-50 dark:bg-indigo-950" },
      { name: "الأحياء", icon: TrendingUp, countsTowardsTotal: true, color: "text-emerald-600", bgColor: "bg-emerald-50 dark:bg-emerald-950" },
      { name: "الكيمياء", icon: FlaskConical, countsTowardsTotal: true, color: "text-green-600", bgColor: "bg-green-50 dark:bg-green-950" },
      { name: "الفيزياء", icon: Atom, countsTowardsTotal: true, color: "text-purple-600", bgColor: "bg-purple-50 dark:bg-purple-950" },
      { name: "التربية الدينية", icon: Cross, countsTowardsTotal: false, color: "text-emerald-600", bgColor: "bg-emerald-50 dark:bg-emerald-950" },
      { name: "اللغة الأجنبية الثانية", icon: Book, countsTowardsTotal: false, color: "text-pink-600", bgColor: "bg-pink-50 dark:bg-pink-950" },
      { name: "التربية الرياضية", icon: Dumbbell, countsTowardsTotal: false, color: "text-lime-600", bgColor: "bg-lime-50 dark:bg-lime-950" },
      { name: "التربية الوطنية", icon: Flag, countsTowardsTotal: false, color: "text-red-600", bgColor: "bg-red-50 dark:bg-red-950" },
    ],
  },
  {
    id: "scientific-math",
    name: "علمي رياضة",
    subjects: [
      { name: "اللغة العربية", icon: Languages, countsTowardsTotal: true, color: "text-orange-600", bgColor: "bg-orange-50 dark:bg-orange-950" },
      { name: "اللغة الأجنبية الأولى", icon: Globe, countsTowardsTotal: true, color: "text-indigo-600", bgColor: "bg-indigo-50 dark:bg-indigo-950" },
      { name: "الرياضيات", icon: Calculator, countsTowardsTotal: true, color: "text-blue-600", bgColor: "bg-blue-50 dark:bg-blue-950" },
      { name: "الكيمياء", icon: FlaskConical, countsTowardsTotal: true, color: "text-green-600", bgColor: "bg-green-50 dark:bg-green-950" },
      { name: "الفيزياء", icon: Atom, countsTowardsTotal: true, color: "text-purple-600", bgColor: "bg-purple-50 dark:bg-purple-950" },
      { name: "التربية الدينية", icon: Cross, countsTowardsTotal: false, color: "text-emerald-600", bgColor: "bg-emerald-50 dark:bg-emerald-950" },
      { name: "اللغة الأجنبية الثانية", icon: Book, countsTowardsTotal: false, color: "text-pink-600", bgColor: "bg-pink-50 dark:bg-pink-950" },
      { name: "التربية الرياضية", icon: Dumbbell, countsTowardsTotal: false, color: "text-lime-600", bgColor: "bg-lime-50 dark:bg-lime-950" },
      { name: "التربية الوطنية", icon: Flag, countsTowardsTotal: false, color: "text-red-600", bgColor: "bg-red-50 dark:bg-red-950" },
    ],
  },
  {
    id: "literary",
    name: "أدبي",
    subjects: [
      { name: "اللغة العربية", icon: Languages, countsTowardsTotal: true, color: "text-orange-600", bgColor: "bg-orange-50 dark:bg-orange-950" },
      { name: "اللغة الأجنبية الأولى", icon: Globe, countsTowardsTotal: true, color: "text-indigo-600", bgColor: "bg-indigo-50 dark:bg-indigo-950" },
      { name: "التاريخ", icon: History, countsTowardsTotal: true, color: "text-amber-600", bgColor: "bg-amber-50 dark:bg-amber-950" },
      { name: "الجغرافيا", icon: MapPin, countsTowardsTotal: true, color: "text-cyan-600", bgColor: "bg-cyan-50 dark:bg-cyan-950" },
      { name: "الإحصاء", icon: TrendingUp, countsTowardsTotal: true, color: "text-blue-600", bgColor: "bg-blue-50 dark:bg-blue-950" },
      { name: "التربية الدينية", icon: Cross, countsTowardsTotal: false, color: "text-emerald-600", bgColor: "bg-emerald-50 dark:bg-emerald-950" },
      { name: "اللغة الأجنبية الثانية", icon: Book, countsTowardsTotal: false, color: "text-pink-600", bgColor: "bg-pink-50 dark:bg-pink-950" },
      { name: "التربية الرياضية", icon: Dumbbell, countsTowardsTotal: false, color: "text-lime-600", bgColor: "bg-lime-50 dark:bg-lime-950" },
      { name: "التربية الوطنية", icon: Flag, countsTowardsTotal: false, color: "text-red-600", bgColor: "bg-red-50 dark:bg-red-950" },
    ],
  },
];

export const curriculum: Grade[] = [
  {
    id: 10,
    name: "أولى ثانوي",
    hasStreams: false,
    subjects: grade10Subjects,
  },
  {
    id: 11,
    name: "تانية ثانوي",
    hasStreams: true,
    streams: grade11Streams,
  },
  {
    id: 12,
    name: "تالتة ثانوي",
    hasStreams: true,
    streams: grade12Streams,
  },
];
