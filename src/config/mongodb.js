// Username : 2121050868
// Password : cLdqL2oYoDvilHWo
import { MongoClient, ServerApiVersion } from "mongodb";
import { env } from "~/config/environment";
let Trello_Database = null;

// Khởi tạo một đối tượng Client để kết nối (connect) tới MongoDB
const mongoClient = new MongoClient(env.MONGODB_URI, {
  // Chỉ định một cái Stable API Version của MongoDB
  // resources : https://www.mongodb.com/docs/drivers/node/current/fundamentals/stable-api/
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});
export const connectToCluster = async () => {
  try {
    // Gọi kết nối tới MongoDB Atlas với URI đã khai báo trong thân của mongoClient
    await mongoClient.connect();
    Trello_Database = mongoClient.db("Trello-Database");
    console.log("2. Connection has been established seccessfully ✅");
  } catch (error) {
    console.log("2. Untale to connect to the database 📴");
    throw new Error("Untale to connect to the database 📴");
  }
};

// Get Data
export const GET_DB = () => {
  if (!Trello_Database) {
    throw new Error("3. No Database");
  }
  return Trello_Database;
};

// Close DB
export const STOP_DB = async () => {
  await mongoClient.close();
};
