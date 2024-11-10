const express=require ('express')
const app=express()
const mysql=require('mysql')
const cors=require('cors')
require('dotenv').config()

const port=process.env.port || 5000

app.use(express.json())
app.use(cors())


const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'students',
    port:4306
})

app.get('/',(req,res)=>{
    db.query(`SELECT * FROM student_table`,(err,result)=>{

        if(err)
        return res.status(400).json({message:err})

        res.status(200).json(result)
    })
})


app.post('/add',(req,res)=>{
    const{name,age,email,mobile}=req.body
    db.query(`INSERT INTO student_table (name,age,email,mobile) VALUES('${name}','${age}','${email}','${mobile}')`,(err,result)=>{

        if(err)
        return res.status(400).json({message:err})

        res.status(200).json({message:"Profile Added"})
    })
})

app.put('/update/:id',(req,res)=>{
    const{name,age,email,mobile}=req.body
    const{id}=req.params
    db.query(`UPDATE student_table  SET name='${name}' ,age='${age}',email='${email}',mobile='${mobile}' WHERE id='${id}'`,(err,result)=>{

        if(err)
        return res.status(400).json({message:err})

        res.status(200).json({message:"Profile Updated"})
    })
})

app.delete('/delete/:id',(req,res)=>{
    const {id}=req.params
      db.query(`DELETE  FROM student_table WHERE id=${id}`,(err,result)=>{
        if(err) return res.status(400).json({message:err})
      })
       return res.status(200).json({message:"Profile Deleted"})
  })

app.listen(port,()=>{
    console.log("port running ");
    
})