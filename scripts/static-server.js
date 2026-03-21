const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const port = Number(process.env.PORT || 4181);

const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.webm': 'video/webm',
    '.mp4': 'video/mp4',
    '.ico': 'image/x-icon'
};

function sendFile(filePath, response) {
    fs.readFile(filePath, (error, content) => {
        if (error) {
            response.writeHead(error.code === 'ENOENT' ? 404 : 500, { 'Content-Type': 'text/plain; charset=utf-8' });
            response.end(error.code === 'ENOENT' ? 'Not found' : 'Server error');
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        response.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
        response.end(content);
    });
}

http.createServer((request, response) => {
    const requestPath = decodeURIComponent(request.url.split('?')[0]);
    const safePath = path.normalize(requestPath).replace(/^(\.\.[/\\])+/, '');
    let filePath = path.join(root, safePath === '/' ? 'index.html' : safePath);

    if (!filePath.startsWith(root)) {
        response.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.end('Forbidden');
        return;
    }

    fs.stat(filePath, (error, stats) => {
        if (!error && stats.isDirectory()) {
            filePath = path.join(filePath, 'index.html');
        }
        sendFile(filePath, response);
    });
}).listen(port, () => {
    console.log(`Static server running at http://127.0.0.1:${port}`);
});
