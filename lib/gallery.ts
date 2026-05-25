import fs from 'fs'
import path from 'path'

const GALLERY_DIR = path.join(process.cwd(), 'public/images/gallery')

export interface GalleryImage {
  id: string
  src: string
  alt: string
}

export function getGalleryImages(): GalleryImage[] {
  try {
    // Return empty array if directory doesn't exist or is empty
    if (!fs.existsSync(GALLERY_DIR)) {
      return []
    }

    const files = fs.readdirSync(GALLERY_DIR)
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp']

    const images: GalleryImage[] = files
      .filter((file) => imageExtensions.some((ext) => file.toLowerCase().endsWith(ext)))
      .sort() // Sort alphabetically for consistent ordering
      .map((file, index) => ({
        id: `gallery-${index + 1}`,
        src: `/images/gallery/${file}`,
        alt: `Amravati Marathon Gallery Image ${index + 1}`,
      }))

    return images
  } catch (error) {
    console.error('Error reading gallery directory:', error)
    return []
  }
}
