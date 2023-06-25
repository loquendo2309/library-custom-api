const express = require('express');
const redis = require('redis');
const app = express();
const port = process.env.PORT || 4000;

const client = redis.createClient({
    host: 'redis-server',
    port: 6379
});

client.set('hello', 'Hello, World from Redis!');

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/redis', (req, res) => {
    client.get('hello', (err, reply) => {
        res.send(reply);
    });
});

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`)
});
