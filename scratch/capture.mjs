import { spawn } from 'child_process';
import fs from 'fs';

async function capture() {
  const tmpDir = 'C:\\temp\\chrome-test-profile';
  if (!fs.existsSync('C:\\temp')) fs.mkdirSync('C:\\temp');
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

  const chromeProcess = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9223',
    '--user-data-dir=' + tmpDir,
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1440,900'
  ]);

  // wait 1.5 seconds for Chrome to start
  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch('http://127.0.0.1:9223/json');
    const targets = await listRes.json();
    const wsUrl = targets[0]?.webSocketDebuggerUrl;
    if (!wsUrl) throw new Error('No target found');

    const ws = new WebSocket(wsUrl);
    let msgId = 1;
    const callbacks = new Map();

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (callbacks.has(data.id)) {
        const { resolve, reject } = callbacks.get(data.id);
        callbacks.delete(data.id);
        if (data.error) reject(data.error);
        else resolve(data.result);
      }
    };

    await new Promise((resolve) => {
      ws.onopen = resolve;
    });

    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = msgId++;
        callbacks.set(id, { resolve, reject });
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await send('Page.enable');
    await send('Page.navigate', { url: 'http://localhost:3005' });
    await new Promise(r => setTimeout(r, 2000));

    // Scroll to footer
    await send('Runtime.evaluate', {
      expression: `
        const footer = document.querySelector('footer');
        if (footer) {
          footer.scrollIntoView({ behavior: 'instant' });
        }
      `
    });

    // Wait for animations
    await new Promise(r => setTimeout(r, 1500));

    // Take screenshot of viewport
    const screenshot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scratch/rendered_footer.png', Buffer.from(screenshot.data, 'base64'));
    console.log('Successfully saved scratch/rendered_footer.png');

    ws.close();
  } finally {
    chromeProcess.kill();
  }
}

capture().catch(console.error);
