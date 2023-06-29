const express = require('express');
const redis = require('redis');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 4000;

// const client = redis.createClient({
//     host: 'garbage.redis.cache.windows.net',
//     port: 6379,
//     password: 'oWYXmCTwPoN9LxRv8e1OJGm3KO07RGjTzAzCaPlGaQw='
// });

const client = redis.createClient({
    url: `rediss://garbage.redis.cache.windows.net:6380`,
    password: 'oWYXmCTwPoN9LxRv8e1OJGm3KO07RGjTzAzCaPlGaQw='
});

fs.readFile('./book.json', 'utf8', (err, data) => {
    if (err) {
        console.log(`Error reading file from disk: ${err}`);
    } else {
        const jsonStr = JSON.stringify(JSON.parse(data));
        client.set('books', jsonStr);
    }
});


app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/reports', (req, res) => {
    client.get('books', (err, reply) => {
        if (err) {
            console.error(`Error fetching data from Redis: ${err}`);
            res.status(500).send('Error fetching data from Redis');
        } else {
            const jsonData = JSON.parse(reply); 
            res.json(jsonData);
        }
    });
});

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`)
});
