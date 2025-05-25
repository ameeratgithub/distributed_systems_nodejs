const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 4000;

require('http').createServer((req, res) => {
    res.end('OK');
}).listen(PORT, HOST, () => {
    console.log(`Producer running at http://${HOST}:${PORT}`);
})