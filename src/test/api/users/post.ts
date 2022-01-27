process.env.NODE_ENV = 'test';

import { expect } from "chai";
import * as request from "supertest";

import app from "../../../index";
import { dbConnect, dbClose } from "../../../db/index";


describe('POST /users', async () => {
   before(async () => {
     try {
       await dbConnect();
     } catch (err) {
       console.log("catch block", err);
     }
   });

   after(async () => {
     try {
       await dbClose();
     } catch (err) {
       console.log("catch block", err);
     }
   });

  it("OK, creating a new user works", () => {
    request(app)
      .post("/users")
      .send({
        name: "test1",
        phone: "999999999",
        password: "test1"
      })
      .then((res) => {
        expect(res.body.success).to.equal(true);
      })
      .catch((err) => console.log("catch block this", err));
  });

  it("Fail, name fiels is required", () => {
    request(app)
      .post("/users")
      .send({
        name: "test1",
        phone: "999999999",
        password: "test1"
      })
      .then((res) => {
        expect(res.body.message).to.equal(
          "User validation failed: name: Path `name` is required."
        );
      })
      .catch((err) => console.log("catch block this", err));
  });

})



