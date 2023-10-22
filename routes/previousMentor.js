import Express  from "express";
import { mentorModel } from "../db/models.js";

// Router
export const previousMentors = Express.Router();


// to get all previously assigned mentors
previousMentors.get('/', async(req,res)=>{
    try{
        const previous = await mentorModel.find({},{_id:0, mentorEmail:1, mentorName:1, previousStudents:1});
        if(previous){
            res.send(previous)
        }else{
            res.send('Not found')
        }
    }catch(err){
        console.log(err)
    }
})


// to get previously mentor for a specific student, single mentor only
previousMentors.get('/:email', async(req,res)=>{
    const {email} = req.params
    console.log(email)
    try{
        const getSingleMentor = await mentorModel.findOne({previousStudents: email},{_id:0, mentorName:1, mentorEmail:1})
        if(getSingleMentor){
            res.send(getSingleMentor)
        } else{
            res.send('there is no previous mentor for this student')
        }
    }catch(err){
        console.log(err)
    }
})