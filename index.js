import express from 'express';
import path from 'path';
import fs from 'fs';
import router from './routes.js';
import config from './config.js';

const app = express();

app.use(express.json());
app.use('/api', router);

function startServer() {
    const port = 3000;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

function loadConfig() {
    const filePath = path.join(__dirname, 'config.json');
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath);
        return JSON.parse(data);
    }
    return {};
}

startServer();


//Just For Trying and Watching How it is 
