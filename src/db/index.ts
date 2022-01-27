import * as mongoose from "mongoose";
import { PORT, MONGO_DEBUG, MONGO_URL } from "../config/index";
import { Mockgoose } from "mockgoose";

export const dbConnect = async () => {
  if (process.env.NODE_ENV === "test") {
    const mockgoose = new Mockgoose(mongoose);
    await mockgoose
      .prepareStorage()
      .then(() => {
        mongoose.connect(MONGO_URL);
        mongoose.connection.on("connected", () => {
          // console.log('db connection is now open');
        });
      })
      .catch((err) => console.log("moch db error", err));
  } else {
    mongoose
      .connect(MONGO_URL, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
      .then(() => console.log("connected"))
      .catch((err) => console.log("error ", err));

    console.log(MONGO_DEBUG, typeof MONGO_DEBUG);
    mongoose.set("debug", eval(MONGO_DEBUG));
  }
};

export const dbClose = () => {
  return mongoose.disconnect();
};
