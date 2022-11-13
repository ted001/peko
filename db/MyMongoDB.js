const { MongoClient } = require("mongodb");

function MyMongoDB() {
  const myDB = {};
  const url = process.env.DB_URL || "mongodb://localhost:27017";
  const DB_NAME = "quick-food-ordering-db";

  myDB.read = async (collectionName, query) => {
    let client;

    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      console.log("Connecting to the db");
      await client.connect();
      console.log("Connected!");
      const db = client.db(DB_NAME);
      const collection = db.collection(collectionName);
      let res = await collection.find(query).toArray();
      console.log("read dishes", res);
      return res;
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };

  return myDB;
}

module.exports = MyMongoDB();
