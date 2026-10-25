import React, { useRef } from 'react';
import './ImagePicker.css';

// Default presets mapping to assets in defaults folder
const PRESET_IMAGES = [
  { id: 'beach', name: 'Beach', src: './assets/defaults/beach.svg' },
  { id: 'mountain', name: 'Mountain', src: './assets/defaults/mountain.svg' },
  { id: 'city', name: 'City', src: './assets/defaults/city.svg' },
  { id: 'temple', name: 'Temple', src: './assets/defaults/temple.svg' },
  { id: 'forest', name: 'Forest', src: './assets/defaults/forest.svg' }
];

/**
 * ImagePicker — Allows selecting a curated destination preset or uploading a custom image.
 *
 * Props:
 *   selectedImage (string) - Current selected image path or base64 data URL
 *   onSelectImage (function) - Callback when image selection changes
 */
function ImagePicker({ selectedImage, onSelectImage }) {
  const fileInputRef = useRef(null);

  const handleCustomUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Read custom user image as a base64 Data URL for zero-dependency persistence
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onSelectImage(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const isCustomImage = selectedImage && !PRESET_IMAGES.some((p) => p.src === selectedImage);

  return (
    <div className="image-picker-container">
      <label className="form-label">Destination Cover Image</label>
      <p className="form-help-text">Choose a destination theme or upload your own photo:</p>

      <div className="preset-grid">
        {PRESET_IMAGES.map((preset) => {
          const isSelected = selectedImage === preset.src;
          return (
            <div
              key={preset.id}
              className={`preset-card ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectImage(preset.src)}
            >
              <img src={preset.src} alt={preset.name} className="preset-thumb" />
              <span className="preset-name">{preset.name}</span>
            </div>
          );
        })}
      </div>

      <div className="custom-upload-section">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleCustomUpload}
          accept="image/*"
          style={{ display: 'none' }}
        />
        <button
          type="button"
          className="btn btn-secondary upload-btn"
          onClick={() => fileInputRef.current?.click()}
        >
          📷 {isCustomImage ? 'Change Custom Photo' : 'Upload Custom Image'}
        </button>

        {isCustomImage && (
          <div className="custom-preview-wrapper">
            <img src={selectedImage} alt="Custom Destination" className="custom-preview-img" />
            <span className="custom-badge">✓ Custom photo loaded</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImagePicker;
export { PRESET_IMAGES };
