let client = require("../dbConnect");
let projectCollection;

setTimeout(() => {
    projectCollection = client.db().collection("Flowers");
}, 2000)

//insert project....
const insertProjects = (project,callback) => {
    projectCollection.insert(project,callback);
}

// get project..
const getprojects = (callback) => {
    projectCollection.find({}).toArray(callback);
}
 module.exports = {
    insertProjects, getprojects
 }