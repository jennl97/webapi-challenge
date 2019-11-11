const express = require('express');
const router = express.Router();

const Action = require('./actionModel');

router.get('/', (req,res) => {
    Action.get(req.body)
    .then(actions => {
        console.log("Action call is working");
        res.status(200).json(actions);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: "Did not work"
        })
    })
})

router.get('/:id', (req, res) => {
    const {id} = req.params
    Action.get(id)
    .then(actions => {
        console.log("Action ID call working");
        if(actions){
            req.actions = actions;
            res.status(200).json(actions)
        } else {
            res.status(404).json({
                message: "Actions not found"
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: "Houston, we have a problem"
        })
    })
})

router.post('/', (req,res) => {
    const actionBody = req.body
    Action.insert(actionBody)
    .then(action => {
        console.log("Action post call is working")
        if(action.length === 0){
            res.status(400).json({
                message: "You gotta give me something to work with here"
            })
        } else if (!action.action_id){
            res.status(400).json({
                message: "A valid action ID is required"
            })
        } else if(!action.description){
            res.status(400).json({
                message: "A description is required"
            })
        } else if (!action.notes) {
            res.status(400).json({
                message: "Notes are required"
            })

        } else {
            res.status(200).json(action);
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: "Houston, we have a problem"
        })
    })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body;
    Action.update(id, body)
    .then(action => {
        console.log("Update action call is working");
        if(!action.id){
            res.status(400).json({
                message: "A action ID is required"
            })
        } else if(action.length === 0){
            res.status(400).json({
                message: "You gotta give me something to work with here"
            })
        } else if (!action.project.id){
            res.status(400).json({
                message: "A valid action ID is required"
            })
        } else if(!action.description){
            res.status(400).json({
                message: "A description is required"
            })
        } else if (!action.notes) {
            res.status(400).json({
                message: "Notes are required"
            })

        } else {
            
            res.status(200).json(action);
        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: "Houston, we have a problem"
        })
    })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Action.remove(id)
    .then(action => {
        if(action){
            res.status(201).json({
                message: "Action has been removed"
            })
        } else {
            res.status(404).json({
                message: "Actions not found"
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: "Houston, we have a problem"
        })
    })
})

module.exports = router;