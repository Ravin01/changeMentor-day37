import Express from "express";
// imported files
import { connectToDb } from "./db/mongooseConnection.js";
import { mentorRoute } from "./routes/mentor.js";
import { studentRouter } from "./routes/student.js";
import { showAllStudents } from "./routes/showStudentsForMentor.js";
import { nonAssignedStudents } from "./routes/nonassignedStudents.js";
import { changeMentor } from "./routes/changeMentor.js";
import { previousMentors } from "./routes/previousMentor.js";
import { assigningStudentsForMentor } from "./routes/assigningStudentsForMentor.js";

const app = Express();

const PORT = process.env.PORT || 5005


// DB connection
await connectToDb()


app.get('/',(req,res)=>{
    res.send("Mentor and Student Assigning task")
});


// middleWare
app.use(Express.json())

app.use('/mentor', mentorRoute)

app.use('/student', studentRouter)

app.use('/assignStudents', assigningStudentsForMentor)

app.use('/showStudents', showAllStudents)

app.use('/nonAssignedStudents', nonAssignedStudents)

app.use('/changeMentor', changeMentor)

app.use('/previousMentor', previousMentors)



// Server
app.listen(PORT, ()=> console.log('server is running on ',PORT))