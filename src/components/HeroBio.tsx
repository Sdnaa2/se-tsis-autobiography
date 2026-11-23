import {
  Compass,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { BiographyProfile } from '../types/biography';

interface HeroBioProps {
  profile: BiographyProfile;
  coreValues: readonly string[];
}

export function HeroBio({ profile, coreValues }: HeroBioProps) {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="scroll-mt-20 border-b border-stone-200 dark:border-stone-800 pb-12 pt-10"
    >
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-300/80 dark:border-amber-700/60 bg-amber-50/80 dark:bg-amber-950/40 px-3 py-1 font-mono text-xs text-amber-900 dark:text-amber-300">
        <Compass className="h-3.5 w-3.5" aria-hidden="true" />
        <span>Personal Autobiography · KBTU SE TSIS</span>
      </div>

      <h1
        id="hero-heading"
        className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-stone-900 dark:text-stone-50"
      >
        {profile.fullName}
      </h1>

      <p className="mt-3 text-lg sm:text-xl font-medium text-stone-700 dark:text-stone-300">
        {profile.headline}
      </p>

      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-700 dark:text-stone-300">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-4 w-4 shrink-0 text-amber-700 dark:text-amber-400" aria-hidden="true" />
          {profile.hometown} → {profile.location}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <GraduationCap className="h-4 w-4 shrink-0 text-amber-700 dark:text-amber-400" aria-hidden="true" />
          {profile.highSchool} → {profile.university}
        </span>
      </div>

      <p className="mt-6 max-w-3xl text-base leading-relaxed text-stone-700 dark:text-stone-300">
        {profile.shortSummary}
      </p>

      <blockquote className="mt-6 border-l-2 border-amber-600 dark:border-amber-500 pl-4 italic font-serif text-lg text-stone-800 dark:text-stone-200">
        “{profile.personalQuote.value}”
      </blockquote>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/60 p-5">
          <h2 className="font-mono text-xs uppercase tracking-wider text-stone-600 dark:text-stone-400">
            Languages &amp; Direction
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {profile.languages.map((lang) => (
              <span
                key={lang}
                className="rounded-md bg-stone-100 dark:bg-stone-800 px-2.5 py-1 text-xs font-medium text-stone-800 dark:text-stone-200"
              >
                {lang}
              </span>
            ))}
          </div>
          <p className="mt-3 text-sm text-stone-700 dark:text-stone-300">
            <strong className="font-medium text-stone-900 dark:text-stone-100">
              Focus:
            </strong>{' '}
            {profile.careerFocus}
          </p>
        </div>

        <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/60 p-5">
          <h2 className="font-mono text-xs uppercase tracking-wider text-stone-600 dark:text-stone-400">
            Interests &amp; Core Values
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {profile.interests.map((interest) => (
              <span
                key={interest}
                className="inline-flex items-center gap-1 rounded-md bg-amber-50 dark:bg-amber-950/50 px-2.5 py-1 text-xs font-medium text-amber-900 dark:text-amber-300"
              >
                <Sparkles className="h-3 w-3 shrink-0" aria-hidden="true" />
                {interest}
              </span>
            ))}
          </div>
          <ul className="mt-3 space-y-1 text-xs text-stone-700 dark:text-stone-300">
            {coreValues.map((value) => (
              <li key={value}>• {value}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {profile.contactLinks.map((link) => {
          const isExternal = link.href.startsWith('http');
          return (
            <a
              key={link.label}
              href={link.href}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noreferrer noopener' : undefined}
              className="inline-flex items-center gap-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 px-3.5 py-2 text-sm font-medium text-stone-800 dark:text-stone-200 hover:border-amber-600 dark:hover:border-amber-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 transition-colors"
            >
              {isExternal ? (
                <ExternalLink
                  className="h-4 w-4 text-amber-700 dark:text-amber-400"
                  aria-hidden="true"
                />
              ) : (
                <Mail
                  className="h-4 w-4 text-amber-700 dark:text-amber-400"
                  aria-hidden="true"
                />
              )}
              <span>{link.label}</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
