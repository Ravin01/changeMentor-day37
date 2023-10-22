import Express from "express";
import { mentorModel } from "../db/models.js";
import {  v4 } from "uuid";

// Router
export const mentorRoute = Express.Router();

// to get all mentors
mentorRoute.get("/", async (req, res) => {
  const mentors = await mentorModel.find(
    {},
    {
      mentorId: 1,
      mentorName: 1,
      program: 1,
      _id: 0,
      Experience: 1,
      students: 1,
    }
  );
  res.send(mentors);
});

// to create a new mentor
mentorRoute.post("/", async (req, res) => {
  const data = req.body
  console.log(data)
  try {
    const newMentor = await mentorModel.findOne({ mentorEmail : data.mentorEmail}, {_id :0, mentorEmail : 1})
    if(newMentor){
      res.status(401).send('Mentor already registered')
    }
    else{
      const mentor = await mentorModel.create({...data, mentorId: v4()})
      if(mentor){
        res.send('Mentor created successfully')
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("error while creating mentor");
  }
});


// to update a mentor
mentorRoute.put("/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const updateMentor = await mentorModel.findOneAndUpdate(
      { mentorEmail: email },
      req.body,
      { new: true }
    );
    if (updateMentor) {
      res.send("Mentor updated successfully");
    } else {
      res.send("mentor not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error while updating");
  }
});

// to delete a mentor
mentorRoute.delete("/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const deleteMentor = await mentorModel.deleteOne({ mentorEmail: email });
    if (deleteMentor) {
      res.send("Mentor deleted successfully");
    } else {
      res.send("Mentor not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error while deleting");
  }
});
