import beachSvg from '../assets/defaults/beach.svg';
import mountainSvg from '../assets/defaults/mountain.svg';
import citySvg from '../assets/defaults/city.svg';
import templeSvg from '../assets/defaults/temple.svg';
import forestSvg from '../assets/defaults/forest.svg';

/**
 * Curated destination presets with bundled SVG assets resolved by Vite.
 */
export const PRESET_IMAGES = [
  { id: 'beach', name: 'Beach', src: beachSvg },
  { id: 'mountain', name: 'Mountain', src: mountainSvg },
  { id: 'city', name: 'City', src: citySvg },
  { id: 'temple', name: 'Temple', src: templeSvg },
  { id: 'forest', name: 'Forest', src: forestSvg }
];

export const DEFAULT_IMAGE = beachSvg;

/**
 * Resolves an image source reliably whether it is a bundled Vite asset,
 * a legacy saved path string, or a custom user base64 upload.
 *
 * @param {string} imageSrc - The image source string from trip data
 * @returns {string} - The valid displayable image URL or data URI
 */
export function resolveImage(imageSrc) {
  if (!imageSrc) return DEFAULT_IMAGE;

  // Custom user uploads (base64 data URL) or external URLs
  if (
    imageSrc.startsWith('data:') ||
    imageSrc.startsWith('http:') ||
    imageSrc.startsWith('https:') ||
    imageSrc.startsWith('blob:')
  ) {
    return imageSrc;
  }

  // Preset mappings (handles both bundled paths and saved path strings)
  const lower = imageSrc.toLowerCase();
  if (lower.includes('beach')) return beachSvg;
  if (lower.includes('mountain')) return mountainSvg;
  if (lower.includes('city')) return citySvg;
  if (lower.includes('temple')) return templeSvg;
  if (lower.includes('forest')) return forestSvg;

  return imageSrc || DEFAULT_IMAGE;
}
