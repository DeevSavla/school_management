import express from 'express';
import sequelize from './db.js'; 
import School from './models/school.model.js';
import schoolRouter from './routes/school.route.js';

const app = express();

const initializeDatabase = async () => {
    try {
        // Authenticate the connection
        await sequelize.authenticate();
        console.log('Connected to MySQL using Sequelize');

        // Create database if it doesn't exist
        await sequelize.query('CREATE DATABASE IF NOT EXISTS school_management');
        console.log('Database created or already exists');

        // Reconnect to the correct database
        if (process.env.DB_NAME) {
            sequelize.options.database = process.env.DB_NAME;
            await sequelize.authenticate();
            console.log('Switched to the "school_management" database');
        }

        // creates the schools table
        await sequelize.sync({ force: false }); // { force: false } avoids dropping the table if it already exists
    
    } catch (error) {
        console.error('Error while connecting to MySQL:', error);
        process.exit(1); 
    }
};

initializeDatabase();

app.use('/api/v1/school',schoolRouter)

app.get('/', (req, res) => {
    res.send('Hello World');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});







/*
Connection and usage can be done in this if you do not use sequelize - ORM tool 

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
}) */
