import mongoose, { Schema } from "mongoose";

// Student schema
const studentSchema = new mongoose.Schema({
    studentId : {
        type : 'string',
        required : true
    },
    studentName : {
        type : 'string',
        required : true
    },
    studentEmail : {
        type : 'string',
        required : true
    },
    Batch:{
        type : 'string',
        required : true
    },
    program : {
        type : 'string',
        required : true
    }
})

// Student Model
export const studentModel = mongoose.model('students', studentSchema);


// Mentor Schema
const mentorSchema = new mongoose.Schema({
        mentorId : {
            type : 'string',
            required : true
        },
        mentorName : {
            type : 'string',
            required : true
        },
        mentorEmail : {
            type : 'string',
            required : true
        },
        program : {
            type : 'string',
            required : true
        },
        Experience : {
            type : 'string',
            required : true
        },
        students : {
            type : 'array',
            require : true
        },
        previousStudents : {
            type : 'array',
            required : true
        }
})

// Mentor Model
export const mentorModel = mongoose.model('mentors', mentorSchema);

