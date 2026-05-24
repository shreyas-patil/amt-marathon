import fs from 'fs';
import path from 'path';

const SPONSORS_DIR = path.join(process.cwd(), 'public/images/sponsors');

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
}

export function getSponsors(): Sponsor[] {
  try {
    // Return empty array if directory doesn't exist or is empty
    if (!fs.existsSync(SPONSORS_DIR)) {
      return [];
    }

    const files = fs.readdirSync(SPONSORS_DIR);
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.svg', '.webp'];

    const sponsors: Sponsor[] = files
      .filter((file) =>
        imageExtensions.some((ext) => file.toLowerCase().endsWith(ext))
      )
      .map((file, index) => ({
        id: `sponsor-${index + 1}`,
        name: file.replace(/\.[^/.]+$/, ''), // Remove extension
        logo: `/images/sponsors/${file}`,
      }));

    return sponsors;
  } catch (error) {
    console.error('Error reading sponsors directory:', error);
    return [];
  }
}
