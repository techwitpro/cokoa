import fs from 'fs';

const rawSvg = fs.readFileSync('public/images/vector_6829_1328.svg', 'utf8');
const pathMatches = [...rawSvg.matchAll(/<path d="([^"]+)" fill="#F9A70A"\/>/g)].map(m => m[1]);

// Path 0: C and first o
// Path 1: k
// Path 2: a
// Path 3: second o

const svgContent = `
<svg width="1442" height="494" viewBox="0 0 1530 582" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Multi-directional dark shadow cast by letter 'k' onto both left and right 'o' letters -->
    <filter id="kShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="-6" dy="2" stdDeviation="12" flood-color="#000000" flood-opacity="0.85" />
      <feDropShadow dx="6" dy="2" stdDeviation="12" flood-color="#000000" flood-opacity="0.85" />
    </filter>
    <!-- Leftward shadow cast by 'a' onto the second 'o' -->
    <filter id="aShadow" x="-25%" y="-25%" width="150%" height="150%">
      <feDropShadow dx="-8" dy="3" stdDeviation="12" flood-color="#000000" flood-opacity="0.85" />
    </filter>
    <!-- Soft background depth shadow -->
    <filter id="cShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000000" flood-opacity="0.4" />
    </filter>
  </defs>

  <!-- Base: C and first 'o' -->
  <g filter="url(#cShadow)">
    <path d="${pathMatches[0]}" fill="#F9A70A" />
  </g>

  <!-- Second 'o' -->
  <path d="${pathMatches[3]}" fill="#F9A70A" />

  <!-- 'k' (overlaps both first 'o' and second 'o') -->
  <g filter="url(#kShadow)">
    <path d="${pathMatches[1]}" fill="#F9A70A" />
  </g>

  <!-- 'a' (overlaps second 'o') -->
  <g filter="url(#aShadow)">
    <path d="${pathMatches[2]}" fill="#F9A70A" />
  </g>
</svg>
`;

fs.writeFileSync('public/images/cokoa_wordmark_perfect.svg', svgContent.trim());
console.log('Saved public/images/cokoa_wordmark_perfect.svg');

// Update test_svg_comparison.html
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
    padding: 20px;
  }
  .box {
    width: 1000px;
    margin: 0 auto 30px;
    background: #100B14;
    border: 1px solid #333;
    overflow: hidden;
  }
  img, svg { width: 100%; display: block; }
  h3 { margin: 10px 0; color: #D3F36A; font-family: monospace; }
</style>
</head>
<body>
  <div class="box">
    <h3>Target (User Reference Image):</h3>
    <img src="user_img.png" />
  </div>
  <div class="box" style="height: 380px;">
    <h3>Rendered SVG (Clipped at bottom to match):</h3>
    <div style="height: 340px; overflow: hidden; background: #100B14;">
      ${svgContent}
    </div>
  </div>
</body>
</html>
`;

fs.writeFileSync('scratch/test_svg_comparison.html', html);
