const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();

const PORT = 8000;
const MONGO_URL =  process.env.MONGODB_URL;

const server = http.createServer(app);

mongoose.connection.once('open',()=>{
    console.log('MongoDB connection is ready!');
});
mongoose.connection.on('error',(err)=>{
    console.error(err);
});

async function startServer() {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGO_URL);
        console.log('Connected to MongoDB');
        
        // Start the HTTP server
        server.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process if MongoDB connection fails
    }
}
startServer();