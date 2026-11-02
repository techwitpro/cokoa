import fs from 'fs';

// Let's inspect the PNG chunk data or create an HTML file that displays the user image side-by-side with our current footer!
const html = `
<!DOCTYPE html>
<html>
<head>
<style>
body { margin: 0; background: #222; color: #fff; font-family: sans-serif; padding: 20px; }
.row { display: flex; flex-direction: column; gap: 20px; }
img { max-width: 100%; border: 1px solid #444; }
</style>
</head>
<body>
  <h2>User Uploaded Image (Figma reference):</h2>
  <img src="/user_img.png" />
  <h2>Current Rendered Wordmark SVG:</h2>
  <img src="/images/vector_6829_1328.svg" style="background:#100B14;" />
</body>
</html>
`;
fs.writeFileSync('scratch/compare.html', html);
console.log('compare.html written');

