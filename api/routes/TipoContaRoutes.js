import express from 'express';
import { insert, update, exclude, getById } from '../db/TipoConta.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        logger.info(`POST /tipoConta - ${req.body}`);
        const result = await insert(req.body);
        res.send(result);
        logger.info(`POST /tipoConta - ${JSON.stringify(result)}`);
    } catch (err) {
        next(err);
    }
});

router.put('/', async (req, res, next) => {
    try {
        logger.info(`PUT /tipoConta - ${req.body}`);
        const result = await update(req.body);
        res.send(result);
        logger.info(`PUT /tipoConta - ${JSON.stringify(result)}`);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id?', async (req, res, next) => {
    try {
        logger.info(`DELETE /tipoConta/${req.params.id}`);
        const result = await exclude(req.params.id);
        res.send(result);
        logger.info(`DELETE /tipoConta/${req.params.id} - ${JSON.stringify(result)}`);
    } catch (err) {
        next(err);
    }
});

// :id é opcional
router.get('/:id?', async (req, res, next) => {
    try {
        console.log(req.params.id);
        const result = await getById(req.params.id);
        res.send(result);

        if (!isNaN(req.params.id)) {
            logger.info(`GET /tipoConta/${req.params.id} `);
            return;
        }

        logger.info('GET /tipoConta/');
    } catch (err) {
        next(err);
    }
});

router.use((err, req, res) => {
    logger.error(`${req.method} ${req.originalUrl} - ${err.message.trim()} `);
    res.status(400).send({ error: 1, message: err.message.trim() });
});

export default router;