import db from './database.js';
import logger from './logger.js';
import utils from './utils.js';
import config from './config.js';

export async function getUsers(req, res) {
    const users = await db.findAll();
    logger.info('Users fetched');
    res.json(users);
}

export async function createUser(req, res) {
    const data = req.body;
    const validated = utils.validate(data);
    const user = await db.create(validated);
    logger.info('User created');
    res.json(user);
}

export async function updateUser(req, res) {
    const id = req.params.id;
    const updated = await db.update(id, req.body);
    res.json(updated);
}

export async function deleteUser(req, res) {
    const id = req.params.id;
    await db.remove(id);
    res.json({ success: true });
}
