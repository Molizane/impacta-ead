import express from 'express';
import { insert, update, exclude, getById } from '../db/TipoContaDb.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        logger.info(`POST /tipoConta - ${JSON.stringify(req.body)}`);
        const result = await insert(req.body);
        res.send(result);
        logger.info(`POST /tipoConta - ${JSON.stringify(result)}`);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        logger.info(`PUT /tipoConta - ${JSON.stringify(req.body)}`);
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
        if (!isNaN(req.params.id)) {
            logger.info(`GET /tipoConta/${req.params.id} `);
        }
        else {
            logger.info('GET /tipoConta');
        }

        const result = await getById(req.params.id);

        if (result.msg) {
            res.status(550).send(result);
        }
        else {
            res.send(result);
        }
    } catch (err) {
        next(err);
    }
});

// router.use((err, req, res) => {
//     console.log('ERRO router');
//     console.log(err);
//     console.log(req);
//     console.log(res);
//     logger.error(`${req.method} ${req.originalUrl} - ${err.message.trim()} `);
//     res.status(500).send({ error: 1, message: err.message.trim() });
// });

export default router;
