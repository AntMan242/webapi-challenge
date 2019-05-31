const express = require('express');
const router = express.Router();
const dbProject = require('./data/helpers/projectModel')
router.use(express.json())

router.get('/', (req, res) => {
    dbProject.get()
        .then(project => {
            res.status(200).json(project);
        })
        .catch(error => {
            res.status(500).json({error:{message: 'Cant find data'}})
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    dbProject.getProjectActions(id)
    .then(projectActions => {
        res.status(200).json(projectActions)
    })
    .catch(error => {
        res.status(500).json({error:{message: 'Could not find data'}})
    })
})

router.post('/', (req, res) => {
    const newProject = req.body
    dbAction.insert(newProject)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(error => {
        res.status(500).json({error:{message: 'No'}})
    })
})

router.put('/:id', (req, res) => {
    const updateProject = req.body
    const id = req.params.id

    dbProject.update(id, updateProject)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(error => {
        res.status(500).json({error: error, message: 'Cant update data'})
    })
})

router.delete('/:id', (req, res) => {
    const projectId = req.params.id
    dbAction.remove(projectId)
    .then(project => {
        if(project){
            dbProject.remove(project).then(
                removeProject => {
                    res.status(201).json(removeProject)
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