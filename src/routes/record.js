const express = require('express');
const Joi = require('joi');

const createRequestSchema = Joi.object( {
    activityName: Joi.string().required(),
    timestamp: Joi.string().required(),
    duration: Joi.number().min(0).required(),
    calories: Joi.number().min(0),
    description: Joi.string().allow(''),
})

const router = express.Router()

const records = [
    {
        __id: 'record-1',
        activityName: 'Running',
        timestamp: new Date(),
        duration: 4000,
        calories: 200,
        description: '',
    },
    {
        __id: 'record-2',
        activityName: 'Running',
        timestamp: new Date(),
        duration: 4000,
        calories: 200,
        description: '',
    },
    {
        __id: 'record-3',
        activityName: 'Running',
        timestamp: new Date(),
        duration: 4000,
        calories: 200,
        description: '',
    },
]


router.get('/', (req, res, next)=> {
    res.send(records);
});
router.post('/', (req, res, next)=> {
    const body = req.body;
    // Validate
    const validResult = createRequestSchema.validate(body);
    if (validResult.error) {
        const errorMessage = validResult.error.details.map( er => {return er.message})
        return res.status(400).send(errorMessage.toString());
    }
    // if (!(typeof body.activityName === 'string' && body.activityName.length > 0)) {
    //     return res.status(400).send('Invalid activity name');
    // };
    const newRecord = {
        __id: Math.floor(Math.random() * 100000).toString(),
        ...body,
    };
    records.push(newRecord);
    return res.status(201).send(newRecord);
});
router.get('/:recordId', (req, res, next)=> {
    const recordID = req.params.recordId;
    const index = records.findIndex((record) => record.__id === recordID);
    const foundRecord = records[index];
    if (!(foundRecord)) {
        return res.status(404).send('Record not found');
    }
    return res.send(foundRecord);
});
router.put('/:recordId', (req, res, next)=> {});
router.delete('/:recordId', (req, res, next)=> {});

module.exports = router;