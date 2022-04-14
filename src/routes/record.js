const express = require('express');

const Checker = require('../middlewares/Checker');
const recordController = require('../controllers/recordController');

const router = express.Router()

router.use(Checker.checkSession);
router.use('/:recordId', Checker.checkRecord);


router.get('/', recordController.getRecords);
router.post('/', recordController.postRecord);
router.put('/:recordId', recordController.updateRecord);
router.delete('/:recordId', recordController.deleteRecord);
// router.get('/:recordId', (req, res, next)=> {
//     const recordID = req.params.recordId;
//     const index = records.findIndex((record) => record.__id === recordID);
//     const foundRecord = records[index];
//     if (!(foundRecord)) {
//         return res.status(404).send('Record not found');
//     }
//     return res.send(foundRecord);
// });

module.exports = router;