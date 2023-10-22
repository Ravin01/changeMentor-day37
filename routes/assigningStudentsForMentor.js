import Express from "express";
import { mentorModel } from "../db/models.js";

// Router
export const assigningStudentsForMentor = Express.Router();



// input format
// {
//     "mentorEmail": "mentor01@gmail.com",
//     "program": "FSD",
//     "studentsEmail": ["student01@gmail.com","student02@gmail.com","student03@gmail.com"]
//   }
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






