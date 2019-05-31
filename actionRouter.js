const express = require('express');
const router = express.Router();

const dbAction = require('./data/helpers/actionModel');

router.get('/', (req, res) => {
    dbAction.get()
        .then(project => {
            res.status(200).json(project);
        })
        .catch(error => {
            res.status(500).json({error:{message: 'Cant find data'}})
        })
})

router.post('/', (req, res) => {
    const newAction = req.body

    dbAction.insert(newAction)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(error => {
        res.status(500).json({error:{message: 'Cant find data'}})
    })
})

router.put('/:id', (req, res) => {
    const updateAction = req.body
    const id = req.params.id

    dbAction.update(id, updateAction)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(error => {
        res.status(500).json({error: error, message: 'Cant update data'})
    })
})

router.delete('/:id', (req, res) => {
    const actionId = req.params.id
    
    dbAction.remove(actionId)
    .then(action => {
        if(action){
            dbAction.remove(actionId).then(
                removeAction => {
                    res.status(201).json(removeAction)
                }
            )
        } else {
            res.status(404).json({error: err, message: 'User does not exist'})
        }
    })
    .catch(error => {
        res.status(500).json({error: error, message: 'User not removed'})
    })
})

module.exports = router;