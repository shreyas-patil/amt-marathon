import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

function loadJSON<T>(filename: string): T | null {
  try {
    const filePath = path.join(DATA_DIR, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error loading ${filename}:`, error);
    return null;
  }
}

export interface Category {
  id: string;
  name: string;
  distance: string;
  description: string;
  ageGroup: string;
  fees: {
    earlyBird: number;
    standard: number;
    currency: string;
    earlyBirdDeadline: string;
  };
}

export interface Hotel {
  id: number;
  name: string;
  city: string;
  contactNumbers: string[];
}

export interface Organizer {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface Results {
  year: number;
  eventDate: string;
  status: 'pending' | 'completed';
  message: string;
  results: Array<{
    rank: number;
    name: string;
    category: string;
    time: string;
    prize: number;
  }>;
}

export function getCategories(): Category[] {
  const data = loadJSON<{ categories: Category[] }>('categories.json');
  return data?.categories || [];
}

export function getHotels(): Hotel[] {
  const data = loadJSON<{ hotels: Hotel[] }>('hotels.json');
  return data?.hotels || [];
}

export function getOrganizers(): Organizer[] {
  const data = loadJSON<{ organizers: Organizer[] }>('organizers.json');
  return data?.organizers || [];
}

export function getResults(): Results {
  const data = loadJSON<Results>('results-2026.json');
  return (
    data || {
      year: 2026,
      eventDate: '',
      status: 'pending',
      message: 'Results coming soon',
      results: [],
    }
  );
}
