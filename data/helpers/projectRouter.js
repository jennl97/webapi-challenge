const express = require('express');
const router = express.Router();
const Project = require('./projectModel');

router.get('/', (req,res) => {
    Project.get(req.query)
    .then(projects => {
        console.log("Project call is working");
        res.status(200).json(projects);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: "This did not work"
        })
    })
})

router.get('/:id', (req,res) => {
    const {id} = req.params
    Project.get(id)
    .then(projects => {
        console.log("Project ID call working");
        if(projects){
            req.projects = projects;
            res.status(200).json(projects)
        } else {
            res.status(404).json({
                message: "Project ID not found"
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
    const projectBody = req.body
    Project.insert(projectBody)
    .then(project => {
        console.log("Project post call is working")
        if(project.length === 0){
            res.status(400).json({
                message: "You gotta give me something to work with here"
            })
        } else if (!project.name){
            res.status(400).json({
                message: "A name is required"
            })
        } else if(!project.description){
            res.status(400).json({
                message: "A description is required"
            })
        } else {
            res.status(200).json(project);
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
    Project.update(id, body)
    .then(project => {
        console.log("Update Project call is working");
        if(!project.id){
            res.status(400).json({
                message: "A project ID is required"
            })
        } else if(project.length === 0){
            res.status(400).json({
                message: "You gotta give me something to work with here"
            })
        } else if (!project.name){
            res.status(400).json({
                message: "A name is required"
            })
        } else if(!project.description){
            res.status(400).json({
                message: "A description is required"
            })
        } else {
            req.project = project;
            res.status(200).json(project);
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
    Project.remove(id)
    .then(project => {
        if(project){
            res.status(201).json({
                message: "Project has been removed"
            })
        } else {
            res.status(400).json({
                message: "Project ID not found"
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
