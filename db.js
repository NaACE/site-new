const {
  MongoClient,
  ObjectId
} = require('mongodb');

const uri = "mongodb+srv://admin:admin@cluster0.k9a0j.mongodb.net?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

client.connect((err, c) => {
  //const collection = c.db("games").collection("users");
  // perform actions on the collection object
  if (err) {
    console.error(err);
    c.close();
    return;
  }
  //console.log("Ok");
  c.close();
});

module.exports = {
    client: client,
    registration: (user, callback) => {
      console.log("Try registration user", user);
      const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      client.connect((err, c) => {
        const collectionUsers = c.db("games").collection("users");
        // perform actions on the collection object
        if (err) {
          console.error(err);
          c.close();
          return;
        }
        console.log("insert")
        collectionUsers.insertOne(user, (err, res) => {
          callback(err, res);
          c.close();
        });
      });
    },
    login: (user, callback) => {
      //console.log("Try registration user", user);
      const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      client.connect((err, c) => {
        const collectionUsers = c.db("games").collection("users");
        // perform actions on the collection object
        if (err) {
          console.error(err);
          c.close();
          return;
        }
        console.log("look for ", user)
        collectionUsers.findOne(user, (err, res) => {
          callback(err, res);
          c.close();
        });
      });
    },
    findById: (id, callback) => {
      const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      client.connect((err, c) => {
          const collectionUsers = c.db("games").collection("users");
          // perform actions on the collection object
          if (err) {
            console.error(err);
            c.close();
            return;
          }
          console.log("look for user by id", id);
          collectionUsers.findOne({_id: new ObjectId(id)}, (err, res) => {
            callback(err, res);
            c.close();
          });
        })
      }

    };