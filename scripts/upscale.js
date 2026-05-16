const sharp = require('sharp');
sharp('assets/images/icon.png')
  .resize(1024, 1024, { fit: 'contain', background: '#3E2723' })
  .png()
  .toFile('assets/images/icon-1024.png')
  .then((info) => console.log('✓ Upscaled:', info.width, 'x', info.height, info.size, 'bytes'))
  .catch((err) => console.error('ERROR:', err.message));
