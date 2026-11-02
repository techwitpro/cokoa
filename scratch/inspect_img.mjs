import fs from 'fs';

const path = 'C:/Users/Techwitpro/.gemini/antigravity/brain/ef2b5a98-4c0e-401c-acdb-5c921a217e37/.user_uploaded/media_1793445289445_3274f870.png';
const buf = fs.readFileSync(path);
// read PNG width and height from IHDR
const width = buf.readUInt32BE(16);
const height = buf.readUInt32BE(20);
console.log('PNG dimensions:', width, 'x', height);

