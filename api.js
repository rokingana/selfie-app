/* server */

const express = require('express');
const Datastore = require('nedb');
const { request, response } = require('express');

const app = express();
const logHistory = new Datastore('logHistory.db');
logHistory.loadDatabase();

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening at : ${port}`));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}))

app.get('/api', (request, response) => {
    logHistory.find({}, (err, data)=> {
        if(err){
            console.log(err);
            response.end();
            return;
        } 
        response.json(data);      
    });
});

app.post('/api', (request, response) => {
    const timeStamp = Date.now();
    const data = request.body;
    data.timeStamp = timeStamp;
    response.json(data);
    logHistory.insert(data);    

    
});