process.env.NODE_ENV = 'test';

import { expect } from "chai";
import * as request from "supertest";

import app from "../../../index";
import { dbConnect, dbClose } from "../../../db/index";


describe('GET /users', async () => {
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

  it("OK, there are no users", () => {
    request(app)
      .get("/users/")
      .then((res) => {
        expect(res.body.data.length).to.equal(0);
      })
      .catch((err) => console.log("catch block this", err));
  });

  it("ok, there is 1 user", () => {
    request(app)
      .post("/users/")
      .send({
        name: "test1",
        phone: "999999999",
        password: "test1"
      })
      .then((res) => {
        request(app)
        .get("/users")
        .then((res) => {
          expect(res.body.data.length).to.equal(1);
        })
        .catch((err) => console.log("catch block this", err));
      })
      .catch((err) => console.log("catch block this", err));
  });

})



