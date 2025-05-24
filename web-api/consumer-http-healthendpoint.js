const server = require('fastify')();
const fetch = require('node-fetch');
const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 3000;
const TARGET = process.env.TARGET || 'localhost:4000';


server.get('/', async () => {
    const req = await fetch(`http://${TARGET}/recipes/42`);
    const producer_data = await req.json();

    return {
        consumer_id: process.pid,
        producer_data
    }
});

server.get('/health', async () => {
    console.log('Health check');
    return 'OK';
})

server.listen(PORT, HOST, () => {
    console.log(`Consumer running at https://${HOST}:${PORT}/`);
});