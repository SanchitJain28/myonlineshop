import mongoose from "mongoose";
main().catch(err => console.log(err));

export async function main() {
  //cloud database
  await mongoose.connect('mongodb+srv://sanchitjain00028:szXreoaouPfKu53T@instacart.a2wox.mongodb.net/?retryWrites=true&w=majority&appName=instacart')
  //localhostdatabase
  // await mongoose.connect('mongodb://127.0.0.1:27017/myOnlineShop');
    console.log("Hey!!the myOnlineShop server is connected")
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
