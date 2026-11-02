import fs from 'fs';

// Read the original paths from vector_6829_1328.svg
const rawSvg = fs.readFileSync('public/images/vector_6829_1328.svg', 'utf8');

// Extract the 4 paths:
// Path 1: C and first o
// Path 2: k
// Path 3: a
// Path 4: second o
const pathMatches = [...rawSvg.matchAll(/<path d="([^"]+)" fill="#F9A70A"\/>/g)].map(m => m[1]);
console.log('Found paths:', pathMatches.length);

// Let's create an HTML test page to preview SVG styling options
const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body {
    background: #100B14;
    color: white;
    font-family: sans-serif;
    margin: 0;
    padding: 40px;
  }
  .reference {
    border: 2px solid cyan;
    max-width: 1000px;
    margin-bottom: 40px;
  }
  .preview {
    border: 2px solid #F9A70A;
    max-width: 1000px;
    margin-bottom: 40px;
    background: #100B14;
    padding: 20px;
  }
  h2 { color: #D3F36A; }
</style>
</head>
<body>
  <h2>1. User Uploaded Reference (Figma Target):</h2>
  <img src="user_img.png" class="reference" style="width: 100%;" />

  <h2>2. Sharp Vector Wordmark with Soft Depth Shadow:</h2>
  <div class="preview">
    <svg width="100%" viewBox="0 0 1530 582" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Soft ambient back shadow matching the Figma puffy depth -->
        <filter id="softBackGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.75" />
        </filter>
        <!-- Inter-letter overlap shadow for 3D layered puffiness -->
        <filter id="letterOverlap" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="-8" dy="6" stdDeviation="12" flood-color="#000000" flood-opacity="0.85" />
        </filter>
        <!-- Warm ambient illumination under the logo -->
        <filter id="warmAmbient" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="35" result="blur" />
        </filter>
      </defs>

      <!-- Warm gold ambient bloom behind -->
      <g filter="url(#warmAmbient)" opacity="0.35">
        <path d="${pathMatches[0]}" fill="#F9A70A"/>
        <path d="${pathMatches[1]}" fill="#F9A70A"/>
        <path d="${pathMatches[3]}" fill="#F9A70A"/>
        <path d="${pathMatches[2]}" fill="#F9A70A"/>
      </g>

      <!-- Background letter: C and first o -->
      <g filter="url(#softBackGlow)">
        <path d="${pathMatches[0]}" fill="#F9A70A"/>
      </g>

      <!-- Background letter: second o -->
      <g filter="url(#softBackGlow)">
        <path d="${pathMatches[3]}" fill="#F9A70A"/>
      </g>

      <!-- Overlapping letter: k (overlaps first o and second o) -->
      <g filter="url(#letterOverlap)">
        <path d="${pathMatches[1]}" fill="#F9A70A"/>
      </g>

      <!-- Overlapping letter: a (overlaps second o) -->
      <g filter="url(#letterOverlap)">
        <path d="${pathMatches[2]}" fill="#F9A70A"/>
      </g>
    </svg>
  </div>
</body>
</html>
`;

fs.writeFileSync('scratch/test_svg_comparison.html', html);
console.log('Wrote scratch/test_svg_comparison.html');

