import { MongoClient } from "mongodb";

function MyMongoDB() {
  const myDB = {};
  // const url = process.env.DB_URL || "mongodb://localhost:27017";
  const url = "mongodb+srv://admin-ted:Test123@cluster0.dz0wqq8.mongodb.net/";
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

  myDB.insertuser = async (collectionName, data) => {
    const connection = new MongoClient(url);
    await connection.connect();
    const db = connection.db(DB_NAME);
    const colname = db.collection(collectionName);
    try {
      // console.log(data);
      let res = await colname.insertOne({
        FirstName: data.fname,
        LastName: data.lname,
        email: data.email,
        password: data.password,
      });
      return true;
    } catch (e) {
      console.log(e);
    } finally {
      await connection.close();
    }
    return false;
  };

  myDB.finduser = async (collectionName, email) => {
    const connection = new MongoClient(url);
    await connection.connect();
    const db = connection.db(DB_NAME);
    const colname = db.collection(collectionName);
    try {
      // console.log(data);
      let res = await colname.findOne({
        email,
      });
      if (Object.keys(res).length === 0) {
        return false;
      }
      return true;
    } catch (e) {
      console.log(e);
    } finally {
      await connection.close();
    }
    return false;
  };

  myDB.authuser = async (collectionName, data) => {
    const connection = new MongoClient(url);
    await connection.connect();
    const db = connection.db(DB_NAME);
    const colname = db.collection(collectionName);
    try {
      // console.log(data);
      let res = await colname.findOne({
        email: data.email,
      });
      console.log("in suth", res, data);
      if (res.password === data.password) {
        console.log("in authuser success");
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
    } finally {
      await connection.close();
    }
    return false;
  };

  return myDB;
}

export const databaseManager = MyMongoDB();
