const express = require("express");
const BugModel = require("../Model/bug.model");
const auth = require("../Middleware/Auth");


const bugRouter = express.Router();

bugRouter.get("/bugs",  async (req, res) => {
    try {
        const bugs = await BugModel.find(req.query);
        return res.status(200).send(bugs);
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
});
bugRouter.get("/bugs/:id", async (req, res) => {
    const { id } = req.params;

    try {

        const singleBug = await BugModel.findOne({ _id: id });
        return res.status(200).send(singleBug)
    } catch (error) {
        return res.status(400).send({ error: error.message })

    }
});

bugRouter.post("/bugs",auth, async (req, res) => {
    // const { title, description, source, severity } = req.body;
    try {
        const newBug = BugModel({
         ...req.body, created_at: Date.now()
        })
        await newBug.save();

        return res.status(201).json({ success: true, data: newBug })
    } catch (error) {
        return res.status(400).send({ error: error.message })

    }
});

bugRouter.patch("/bugs/:id", async(req,res)=>{
    const { title, description, source, severity ,updated_at} = req.body;
    const {id} = req.params;
    try {
         await BugModel.findByIdAndUpdate({_id:id},{
            title, 
            description, 
            source, 
            severity,
            updated_at:Date.now()
         });

         return res.status(200).send(`${id} has been updated`)
    } catch (error) {
        return res.status(400).send({ error: error.message })
        
    }
});

bugRouter.delete("/bugs/:id", async (req,res)=>{
    const {id} = req.params
    try {
        await BugModel.findByIdAndDelete({_id:id});
        return res.status(200).send(`${id} has been deleted`)

    } catch (error) {
        return res.status(400).send({ error: error.message })
        
    }
})
module.exports = bugRouter;