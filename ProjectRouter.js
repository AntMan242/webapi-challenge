const express = require("express");
const router = express.Router();

const dbProject = require('./data/helpers/projectModel');
router.use(express.json());

router.get('/', async(req, res) => {
  try {
      const projects = await dbProject.get(res.body);
      res.status(200).json(projects);
  } catch (error) {
      console.log(error);
      res.status(500).json({
          message: 'Cannot process this at this time'
      });
  }

});

router.get('/:id', async (req, res) => {
  try {
    const project = await dbProject.get(res.params.id);
    if (project) {
      res.status(200).json();
    } else {
      res.status(404).json({ message: 'ID not found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Cannot find by this ID',
    });
  }
});

router.post('/', async (req, res) => {
  //   const project = req.body;
  try {
    const project= await dbProject.insert(req.body);
    res.status(201).json(project);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Sorry cannot add this id',
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const count = await dbProject.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: 'The id has been remove' });
    } else {
      res.status(404).json({ message: 'Cannot find id' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error removing this id',
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const project  = await dbProject.update(req.params.id, req.body);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: 'This id could not be found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error updating this id',
    });
  }
});

// /api//:id/messages
router.get('/:id/projects', (req, res) => {
  dbProject.get(req.params.id)
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;