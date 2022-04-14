const UserModel = require('../models/userModel');

exports.getRecords = async (req, res)=> {
    const userId = req.user.id;
    const user = await UserModel.findById(userId);
    res.send(user.records);
};

exports.postRecord = async (req, res)=> {
    const userId = req.user.id;
    const body = req.body;
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
};

exports.updateRecord = async (req, res)=> {
    const userId = req.user.id;
    const body = req.body;
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
};

exports.deleteRecord = async (req, res)=> {
    const userId = req.user.id;
    const user = await UserModel.findById(userId);
    const updateRecords = user.records.filter((record) => {
        console.log(record._id.toString() !== req.params.recordId);
        return record._id.toString() !== req.params.recordId
    });
    user.records = updateRecords;
    console.log(user.records);
    await user.save();
    return res.status(204).send(user.records);
};