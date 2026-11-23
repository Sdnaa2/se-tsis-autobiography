import { BiographyDataset } from '../types/biography';
import { deepFreeze } from './deepFreeze';

/**
 * SINGLE AUTHORITATIVE BIOGRAPHY REGISTRY (AC-01 / FR-03)
 *
 * How to customize your personal autobiography:
 * 1. Edit any text below directly — no UI component code needs to be touched.
 * 2. Look for `isEditablePlaceholder: true` if you want to swap in future
 *    links (e.g., GitHub/LinkedIn) or expand personal stories later.
 * 3. `deepFreeze()` locks this dataset at runtime so the Q&A widget can only
 *    read facts and can never mutate them.
 */
const RAW_BIOGRAPHY_DATA: BiographyDataset = {
  profile: {
    fullName: 'Kalenuly Bekzat',
    headline: 'Year 3 Computer Systems & Software Student at KBTU · Aspiring Backend Engineer',
    location: 'Almaty, Kazakhstan',
    hometown: 'Kyzylorda, Kazakhstan',
    university: 'Kazakh-British Technical University (KBTU)',
    program: 'Computer Systems and Software (CSS), Year 3',
    highSchool: 'Nazarbayev Intellectual School (NIS), Kyzylorda',
    languages: ['Kazakh (Native)', 'Russian (Fluent)', 'English (C1)'],
    careerFocus: 'Backend Software Engineering, Systems & Linux Infrastructure',
    shortSummary:
      'Born and raised in the cozy city of Kyzylorda, I first got hooked on technology at age eight the moment I launched my first PC. From unforgettable high school years with my classmates at NIS Kyzylorda to studying Computer Systems and Software at KBTU in Almaty, I am building my engineering foundation from first principles.',
    interests: [
      'Anime, Manga & Light Novels',
      'Listening to Music',
      'Linux & Systems Exploration (openEuler)',
      'Backend Architecture & First-Principles CS',
    ],
    personalQuote: {
      value:
        "If it was all a dream, I'd say 'what a nice dream,' stretch, and live out today in a good mood, no doubt.",
      isEditablePlaceholder: false,
      editHint: 'Personal motto provided by Bekzat; edit anytime.',
    },
    contactLinks: [
      {
        label: 'kalenuli.nis@gmail.com',
        href: 'mailto:kalenuli.nis@gmail.com',
        isEditablePlaceholder: false,
      },
      {
        label: 'GitHub (@Sdnaa2)',
        href: 'https://github.com/Sdnaa2/se-tsis-autobiography',
        isEditablePlaceholder: true,
      },
    ],
  },
  milestones: [
    {
      id: 'ms-01-kyzylorda-spark',
      period: 'Early Childhood · Age 8',
      sortOrder: 1,
      title: 'First Spark at the Keyboard',
      institutionOrPlace: 'Kyzylorda, Kazakhstan',
      category: 'personal',
      summary:
        'Growing up in a cozy hometown atmosphere, curiosity took over the moment I launched a PC for the very first time at age eight.',
      details: [
        'That first experience turning on a desktop computer sparked a lasting curiosity about how software works beneath the screen.',
        'Growing up in Kyzylorda shaped a calm, steady mindset that still anchors how I approach difficult problems today.',
      ],
      tags: ['Kyzylorda', 'Curiosity', 'Early Tech'],
      isEditablePlaceholder: false,
    },
    {
      id: 'ms-02-nis-kyzylorda',
      period: 'High School Years',
      sortOrder: 2,
      title: 'Nazarbayev Intellectual School (NIS)',
      institutionOrPlace: 'NIS Kyzylorda',
      category: 'education',
      summary:
        'High school at NIS Kyzylorda gave me both strong academic discipline and my warmest memories with a close circle of classmates.',
      details: [
        'What stands out most from NIS is not just the coursework, but the everyday moments, shared challenges, and friendships built alongside my classmates.',
        'Developed structured analytical thinking and trilingual fluency across Kazakh, Russian, and C1 English.',
      ],
      tags: ['NIS Kyzylorda', 'Classmates', 'Trilingual'],
      isEditablePlaceholder: false,
    },
    {
      id: 'ms-03-kbtu-almaty',
      period: 'University · Years 1–3',
      sortOrder: 3,
      title: 'Computer Systems & Software at KBTU',
      institutionOrPlace: 'KBTU, Almaty',
      category: 'education',
      summary:
        'Moved to Almaty to study Computer Systems and Software (CSS) at KBTU, focusing on rebuilding core CS concepts from first principles.',
      details: [
        'Coursework spans Software Engineering, Computer Architecture, Operating Systems (Huawei openEuler), Differential Equations, and Electrical Engineering.',
        'Transitioned from writing small programs to reasoning about system boundaries, Linux internals, and engineering discipline.',
      ],
      tags: ['KBTU', 'Almaty', 'CSS Year 3'],
      isEditablePlaceholder: false,
    },
    {
      id: 'ms-04-se-systems-practice',
      period: 'Fall 2026 · 5th Semester',
      sortOrder: 4,
      title: 'Software Engineering & Linux Systems Practice',
      institutionOrPlace: 'KBTU — SE & openEuler Labs',
      category: 'technical',
      summary:
        'Applied spec-driven development, PlantUML modeling, automated testing, and Linux administration across semester coursework.',
      details: [
        'Software Engineering (CSCI 202609): Practiced RePPIT workflows, PlantUML architecture/sequence modeling, Vitest unit testing, and AI trust-boundary verification.',
        'OS Huawei openEuler (CSCI 1209): Hands-on Linux CLI, systemd services, RPM/DNF, firewalld, storage/LVM, and bash scripting.',
        'Looking ahead: Preparing to build backend services with Java, Node.js, PostgreSQL, and Docker.',
      ],
      tags: ['Software Engineering', 'TypeScript', 'openEuler', 'Backend Path'],
      isEditablePlaceholder: false,
    },
    {
      id: 'ms-05-personal-worlds',
      period: 'Beyond Code · Everyday Life',
      sortOrder: 5,
      title: 'Stories, Soundtracks & Mindset',
      institutionOrPlace: 'Personal Interests',
      category: 'personal',
      summary:
        'Outside of university labs and terminal windows, I unwind with anime, manga, light novels, and music.',
      details: [
        'Drawn to well-crafted world-building and character journeys in anime, manga, and light novels.',
        'Music keeps me grounded during late-night study sessions and long coding sprints.',
        'Personal motto: "If it was all a dream, I\'d say \'what a nice dream,\' stretch, and live out today in a good mood, no doubt."',
      ],
      tags: ['Anime & Manga', 'Light Novels', 'Music', 'Mindset'],
      isEditablePlaceholder: false,
    },
  ],
  coreValues: [
    'First-principles understanding over surface memorization',
    'Calm resilience and keeping a good mood under pressure',
    'Transparent engineering: verify every claim, test every boundary',
  ],
};

export const BIOGRAPHY_DATA: BiographyDataset = deepFreeze(RAW_BIOGRAPHY_DATA);
