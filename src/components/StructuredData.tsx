import React from 'react';

interface StructuredDataProps {
  type: 'Person' | 'BlogPosting' | 'WebSite';
  data: Record<string, string | string[] | Record<string, string>[] | undefined>;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  let schema = {};

  if (type === 'Person') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: data.name || 'Thrilok M',
      jobTitle: data.jobTitle || 'Data Scientist & Quantum Developer',
      alumniOf: [
        {
          '@type': 'EducationalOrganization',
          name: "St. Joseph's University",
        },
        {
          '@type': 'EducationalOrganization',
          name: 'Christ University',
        },
      ],
      knowsAbout: [
        'Data Science',
        'Machine Learning',
        'Artificial Intelligence',
        'Quantum Computing',
        'MLOps',
        'Full-Stack Development',
      ],
      sameAs: [
        'https://github.com/thrilokmanjunath',
        'https://www.linkedin.com/in/thrilokmanjunath',
      ],
      ...data,
    };
  } else if (type === 'BlogPosting') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: data.title,
      description: data.description,
      datePublished: data.date,
      author: {
        '@type': 'Person',
        name: 'Thrilok M',
      },
      ...data,
    };
  } else if (type === 'WebSite') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: data.name || 'Thrilok M Portfolio',
      url: data.url || 'https://thrilok.dev',
      ...data,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
