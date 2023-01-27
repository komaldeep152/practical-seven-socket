var express = require("express")
var app = express()
var cors = require('cors')
//let projectCollection;
let dbConnect = require("./dbConnect");
let projectRoutes = require("./routes/projectRoutes");

let http = require('http').createServer(app);
let io =require('socket.io')(http);

app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use('/api/projects', projectRoutes)

app.get('/addTwoNumbers/:firstNumber/:secondNumber', function(req,res,next){
    var firstNumber = parseInt(req.params.firstNumber) 
    var secondNumber = parseInt(req.params.secondNumber)
    var result = firstNumber + secondNumber || null
    if(result == null) {
      res.json({result: result, statusCode: 400}).status(400)
    }
    else { res.json({result: result, statusCode: 200}).status(200) } 
  })

  io.on('connection', (socket) => {
   console.log('a user connected');
   socket.on('disconnect', () => {
       console.log('user disconnected');
   });
   setInterval (() => {
       socket.emit('number', parseInt(Math.random()*10));
    }, 1000);
    });
//mongodb connection...
//const MongoClient = require('mongodb').MongoClient;
//const uri = 'mongodb+srv://komaldeep:komal@cluster0.zgzyjib.mongodb.net/?retryWrites=true&w=majority'
//const client = new MongoClient(uri, {useNewUrlParser: true})

//const createCollection = (collectionName) => {
    //client.connect((err,db) => {
       // projectCollection = client.db().collection(collectionName);
       // if(!err){
          //  console.log('MongoDb Connected')
       // }
       // else{
          //  console.log("DB Error:", err);
          //  process.exit(1);
        //}
    //})
//}

//insert project....
//const insertProjects = (project,callback) => {
    //projectCollection.insert(project,callback);
//}

//post api.....
//app.post('/api/projects',(req,res) => {
     //console.log("New Project added", req.body)
     //var newProject = req.body;
    // insertProjects(newProject,(err,result) => {
        //if(err) {
            //res.json({statusCode: 400, message: err})
        //}
        //else {
            //res.json({statusCode:200, message:"Project Successfully added", data:result})
        //}
    // })
//})



//const cardList = [
   // {
       // title: "Flower 2",
       // image: "images/flower2.jpg",
        //link: "About flower 2",
        //desciption: "Demo desciption about flower 2"
    //},
    //{
       // title: "Flower 3",
       // image: "images/flower3.jpg",
       // link: "About flower 3",
       // desciption: "Demo desciption about flower 3"
    //}
//]


// get project..
//const getprojects = (callback) => {
    //projectCollection.find({}).toArray(callback);
//}

//app.get('/api/projects',(req,res) => {
   // getprojects((err,result) => {
        //if(err) {
           // res.json({statusCode: 400, message:err})
        //}
        //else{
           // res.json({statusCode: 200, message: "Success", data: result})
        //}
    //})
//})

var port = process.env.port || 8000;
http.listen(port,()=>{
    console.log("App listening to http://localhost:"+port)
    //createCollection('Flowers')
})


