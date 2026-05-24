export const siteConfig = {
  name: 'Amravati Half Marathon',
  shortName: 'Amravati Marathon',
  description:
    'Join us for the annual Amravati Half Marathon 2026 - a running event in Amravati, Maharashtra',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://runamravati.com',
  domain: 'runamravati.com',
  ogImage: '/og-image.jpg',
  twitter: '@amravatimarathon', // Update as needed
  author: 'Amravati Marathon Team',
  email: 'info@runamravati.com',
};

export const eventConfig = {
  year: 2026,
  name: 'Amravati Half Marathon 2026',
  date: '2026-10-25',
  location: 'Amravati, Maharashtra, India',
  registrationUrl:
    process.env.NEXT_PUBLIC_TOWNSCRIPT_URL ||
    'https://www.townscript.com/e/amravati-half-marathon2026-221331',
  maxParticipants: 200,
};

export const seoKeywords = [
  'Amravati Half Marathon',
  'Amravati Marathon',
  'Half Marathon Maharashtra',
  'Running Event Amravati',
  '21.1 km Marathon',
  '10 km Power Run',
  'Marathon Registration',
  'Amravati Sports Event',
];

export const navigationLinks = [
  { label: 'Home', href: '/' },
  { label: 'Categories', href: '/#categories' },
  { label: 'Prizes', href: '/prizes' },
  { label: 'Sponsors', href: '/#sponsors' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Results', href: '/results' },
  { label: 'Contact', href: '/#contact' },
];
