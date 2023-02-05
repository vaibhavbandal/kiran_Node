const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors')
app.use(cors());

const mongoose = require('mongoose');
mongoose.set('strictQuery',false);

mongoose.connect('mongodb://127.0.0.1:27017/kiran')
  .then(() => console.log('Connected!'));

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Student = mongoose.model('Student', new Schema({
    id:ObjectId,
    name:String,
    city:String
}));

function deleteAll(){
    Student.deleteMany({}).then(()=>console.log('deleted all'))
}

app.post('/student',async(req,res)=>{
    return res.send(await Student.create({...req.body}))
})

app.get('/student',async(req,res)=>{
    return res.send(await Student.find({}));
})

app.listen(9000);
