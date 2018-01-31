const url: String = "mongodb://<public>:<pubpasswd>@ds221148.mlab.com:21148'"
const MongoClient = require('mongodb').MongoClient;

export default class MongoManager {
  async addEntry(object: Object) {
    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      var dbo = db.db("fiix-paint-db");
      dbo.collection("drawings").insertOne(object, (err, res) => {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
      });
    });
  }
};