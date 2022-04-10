const express = require('express');
const Joi = require('joi');

const RecordModel = require('../models/record');
const UserModel = require('../models/userModel');

// const userId = '624c1385419c27f8b3217645';

// const createRequestSchema = Joi.object( {
//     activityName: Joi.string().required(),
//     timestamp: Joi.string().required(),
//     duration: Joi.number().min(0).required(),
//     calories: Joi.number().min(0),
//     description: Joi.string().allow(''),
// });

const router = express.Router()

// const records = [
//     {
//         __id: 'record-1',
//         activityName: 'Running',
//         timestamp: new Date(),
//         duration: 4000,
//         calories: 200,
//         description: '',
//     },
//     {
//         __id: 'record-2',
//         activityName: 'Running',
//         timestamp: new Date(),
//         duration: 4000,
//         calories: 200,
//         description: '',
//     },
//     {
//         __id: 'record-3',
//         activityName: 'Running',
//         timestamp: new Date(),
//         duration: 4000,
//         calories: 200,
//         description: '',
//     },
// ]

router.use('/:recordId', async (req, res, next) => { 
    const userId = req.user.id;
    const user = await UserModel.findById(userId);
    const checkedRecords = user.records.filter((record) => {
        return record._id.toString() === req.params.recordId
    });
    if (!(checkedRecords.length === 1)) {
        return res.status(404).send('Record not found');
    };

    // const foundRecord = RecordModel.findById(req.params.recordId);   
    // if (!foundRecord) {
    //   return res.status(404).send('Record not found');
    // };
    // req.record = foundRecord;
    return next();
});


router.get('/', async (req, res, next)=> {
    // const records = await RecordModel.find({});
    // res.send(records);
    const user = await UserModel.findById(userId);
    res.send(user.records);
});

router.post('/', async (req, res, next)=> {
    const userId = req.user.id;
    const body = req.body;
    // Validate
    // const validResult = createRequestSchema.validate(body);
    // if (validResult.error) {
    //     const errorMessage = validResult.error.details.map( er => {return er.message})
    //     return res.status(400).send(errorMessage.toString());
    // }
    // if (!(typeof body.activityName === 'string' && body.activityName.length > 0)) {
    //     return res.status(400).send('Invalid activity name');
    // };
    // const newRecord = {
    //     __id: Math.floor(Math.random() * 100000).toString(),
    //     ...body,
    // };

        // const newRecord = new RecordModel({
        //     ...body
        // });

        // const errors = await newRecord.validateSync();
        // if(errors) {
        //     const errorFieldNames= Object.keys(errors.errors);
        //     if (errorFieldNames.length > 0) {
        //         return res.status(400).send(errors.errors[errorFieldNames[0]].message);
        //     }
        // };

        // await newRecord.save();
    // records.push(newRecord);
    const user = await UserModel.findById(userId);
    user.records.push(body);

    const errors = await user.validateSync();
    if(errors) {
        const errorFieldNames= Object.keys(errors.errors);
        if (errorFieldNames.length > 0) {
            return res.status(400).send(errors.errors[errorFieldNames[0]].message);
        }
    };

    await user.save();

    return res.status(201).send(user.records);
});
// router.get('/:recordId', (req, res, next)=> {
//     const recordID = req.params.recordId;
//     const index = records.findIndex((record) => record.__id === recordID);
//     const foundRecord = records[index];
//     if (!(foundRecord)) {
//         return res.status(404).send('Record not found');
//     }
//     return res.send(foundRecord);
// });
router.put('/:recordId', async (req, res, next)=> {
    const body = req.body;

    // // validate
    // const validateResult = updateRequestSchema.validate(body);
    // if (validateResult.error) {
    //   // failed validation
    //   return res.status(400).send('Invalid request');
    // }
  
    // const updatedRecord = {
    //   ...req.record,
    //   ...body,
    // };
    // records[req.recordIndex] = updatedRecord;

    const user = await UserModel.findById(userId);
    console.log(body);
    const updatedRecord = await user.records.map((record) => {
        if(record._id.toString() === req.params.recordId) {
            return record = body
        };
        return record
    });
    console.log(updatedRecord); 
    user.records = updatedRecord;
    await user.save();
    return res.status(201).send(updatedRecord.records);
});
router.delete('/:recordId', async (req, res, next)=> {
    // await RecordModel.deleteOne({__id: req.params.recordId})
    const user = await UserModel.findById(userId);
    // console.log(req.params.recordId);
    const updateRecords = user.records.filter((record) => {
        console.log(record._id.toString() !== req.params.recordId);
        return record._id.toString() !== req.params.recordId
    });
    user.records = updateRecords;
    console.log(user.records);
    await user.save();
    return res.status(204).send(user.records);
});

module.exports = router;