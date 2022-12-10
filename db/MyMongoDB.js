import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

function MyMongoDB() {
  const myDB = {};
  const url = DB_URL;
  const DB_NAME = "quick-food-ordering-db";

  //Jin: Meals functionality
  myDB.readMeals = async (collectionName, query) => {
    let client;

    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      console.log("Connecting to the db");
      await client.connect();
      console.log("Connected!");
      const db = client.db(DB_NAME);
      const collection = db.collection(collectionName);
      let res = await collection.find(query).toArray();
      return res;
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };

  //Akhila: User functionality
  myDB.insertuser = async (collectionName, data) => {
    const connection = new MongoClient(url);
    await connection.connect();
    const db = connection.db(DB_NAME);
    const colname = db.collection(collectionName);
    try {
      await colname.insertOne({
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
      let res = await colname.findOne({
        email: data.email,
      });
      console.log("in auth", res);

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
        await colname.updateOne(
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
        await colname.updateOne(
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
