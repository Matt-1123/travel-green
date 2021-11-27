const express = require('express');
const router = express.Router();

// @route     GET api/actions
// @desc      Get all users actions
// @access    Private
router.get('/', (req, res) => {
  res.send('Get all actions')
})

// @route     POST api/actions
// @desc      Add new action
// @access    Private
router.post('/', (req, res) => {
  res.send('Post an action')
})

// @route     PUT api/actions/:id 
// @desc      Update action
// @access    Private
router.put('/:id', (req, res) => {
  res.send('Update an action')
})

// @route     DELETE api/actions/:id 
// @desc      Delete action
// @access    Private
router.delete('/:id', (req, res) => {
  res.send('Delete action')
})


module.exports = router;