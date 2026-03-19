/**
 * Utility to compress images using a hidden canvas
 * @param {string} dataUrl - The raw base64 data URL
 * @param {number} maxWidth - Maximum width for the compressed image
 * @param {number} quality - Quality (0 to 1)
 * @returns {Promise<string>} - Compressed data URL
 */
export const compressImage = (dataUrl, maxWidth = 800, quality = 0.7) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      // Calculate new dimensions
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      
      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
      resolve(compressedDataUrl);
    };
    img.onerror = (err) => reject(err);
  });
};
