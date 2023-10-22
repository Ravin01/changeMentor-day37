import  Express from "express";
import { mentorModel, studentModel } from "../db/models.js";

// Router
export const showAllStudents = Express.Router();

// to get all students for mentor
showAllStudents.get('/', async(req,res)=>{
    const allStudents = await mentorModel.find({},{mentorName:1, _id:0,students:1, program:1, mentorEmail:1})
    res.send(allStudents)
})

// to get all students for a specific mentor
showAllStudents.get('/:email', async(req,res)=>{
    const {email} = req.params
    try{
        const mentor = await mentorModel.findOne({mentorEmail: email},{_id:0,students:1})
        if(mentor){
            res.send(mentor)
        }else{
            res.send('Mentor is not found')
        }
    }catch(err){
        res.status(500).send("Error while find mentor")
    }
})