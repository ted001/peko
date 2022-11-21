import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

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
      console.log(email, "in fu");
      let res = await colname.findOne({
        email,
      });
      if (!res) {
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

  myDB.getuser = async (collectionName, email) => {
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
        return [];
      }
      return res;
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

      return res;
    } catch (e) {
      console.log(e);
    } finally {
      await connection.close();
    }
    return false;
  };

  myDB.deleteuser = async (collectionName, data) => {
    const connection = new MongoClient(url);
    await connection.connect();
    const db = connection.db(DB_NAME);
    const colname = db.collection(collectionName);
    try {
      await colname.deleteOne(data);
      console.log("deleting");
      return true;
    } catch (e) {
      console.log(e);
    } finally {
      await connection.close();
    }
    return false;
  };

  myDB.updateuser = async (collectionName, data) => {
    const connection = new MongoClient(url);
    await connection.connect();
    const db = connection.db(DB_NAME);
    const colname = db.collection(collectionName);
    try {
      console.log(data);
      if (data.password) {
        let res = await colname.updateOne(
          { email: data.email },
          {
            $set: {
              FirstName: data.fname,
              LastName: data.lname,
              password: data.password,
              Address: data.address,
              Phoneno: data.phone,
            },
          }
        );
        return true;
      } else {
        let res = await colname.updateOne(
          { email: data.email },
          {
            $set: {
              FirstName: data.fname,
              LastName: data.lname,
              Address: data.address,
              Phoneno: data.phone,
            },
          }
        );
        return true;
      }
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
