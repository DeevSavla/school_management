import mysql from 'mysql'
import express from 'express'
import { configDotenv } from 'dotenv'

configDotenv()

const app = express()

const connection = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.user,
    password:process.env.PASSWORD
})

connection.connect(error=>{
    if(error){
        console.log('Error while connecting to MySQL:',error)
        return
    }
    console.log('Connected to MySQL')

    connection.query(`CREATE DATABASE IF NOT EXISTS school_management`,(error)=>{
        if(error){
            console.log('Error while creating database:',error)
            return
        }
        console.log('Database created')
    })

    connection.changeUser({database:'school_management'},(error)=>{
        if(error){
            console.log('Error switching to database:',error)
            return
        }
        console.log('Switched to the database')
    })
})

app.get('/',(req,res)=>{
    res.send('Hello Welcome')
})

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
