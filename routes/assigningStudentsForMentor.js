import Express from "express";
import { mentorModel } from "../db/models.js";

// Router
export const assigningStudentsForMentor = Express.Router();




// post call for assigning students for mentor
assigningStudentsForMentor.post('/',async(req,res)=>{
    const payload = req.body
    try{
        const checkMentor = await mentorModel.findOne({mentorEmail : payload.mentorEmail})
        if(checkMentor){
            const updatingStudents = [...checkMentor.students, ...payload.studentsEmail]
            const mentor = await mentorModel.findOneAndUpdate({mentorEmail : payload.mentorEmail}, {students : updatingStudents})
            if(mentor){
                console.log(mentor)
                res.send('Student added successfully')
            }
        }else{
            res.send('mentor not found')
        }
    }catch(err){
        console.error(err);
        res.status(500).send('error while student assign to mentor')
    }
});






