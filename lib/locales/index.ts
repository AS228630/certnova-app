'use client';

import de from './de.json';
import fa from './fa.json';

export type Locale = 'de' | 'fa';

export interface LocaleData {
  common: Record<string, string>;
  lab: Record<string, any>;
  vocabulary: Record<string, any>;
}

const locales: Record<Locale, LocaleData> = {
  de,
  fa,
};

/**
 * Type-safe translation function
 * Usage: t('de', 'lab.title')
 */
export function t(locale: Locale, key: string): string {
  const keys = key.split('.');
  let value: any = locales[locale];

  for (const k of keys) {
    if (value === undefined) return key; // Fallback to key if not found
    value = value[k];
  }

  return typeof value === 'string' ? value : key;
}

/**
 * Get vocabulary definition for a term
 * Returns both the translated term and its definition
 */
export function getVocabularyTerm(locale: Locale, termKey: string) {
  const term = locales[locale].vocabulary?.[termKey];
  if (!term) return null;

  const langKey = locale === 'de' ? 'de' : 'fa';
  return {
    term: term[langKey],
    definition: term.definition,
    isGoldenWord: term.golden || false,
  };
}

/**
 * Get all Golden Words (technical terms with tooltips) for a locale
 */
export function getGoldenWords(locale: Locale) {
  const vocab = locales[locale].vocabulary || {};
  return Object.entries(vocab)
    .filter(([_, term]: [string, any]) => term.golden)
    .map(([key, term]: [string, any]) => ({
      key,
      term: locale === 'de' ? term.de : term.fa,
      definition: term.definition,
    }));
}

/**
 * Get complete locale data
 */
export function getLocaleData(locale: Locale): LocaleData {
  return locales[locale];
}

/**
 * Get lab-specific strings for a locale
 */
export function getLabStrings(locale: Locale) {
  return locales[locale].lab;
}

export default locales;
