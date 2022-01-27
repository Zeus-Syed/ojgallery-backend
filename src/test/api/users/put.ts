process.env.NODE_ENV = 'test';

import { expect } from "chai";
import * as request from "supertest";

import app from "../../../index";
import { dbConnect, dbClose } from "../../../db/index";


describe('PUT /users/:userId', async () => {
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

  it("ok, user updated", () => {
    request(app)
      .post("/users")
      .send({
        name: "test1",
        phone: "999999999",
        password: "test1"
      })
      .then((res) => {
        console.log("creta", res.body)
        console.log("creta", res.body.userId)
        request(app)
        .put(`/users/${res.body.userId}`)
        .send({
          name: "test1",
          phone: "999999999",
          })
        .then((res) => {
            console.log("update", res.body)
          expect(res.body.success).to.equal(false);
        })
        .catch((err) => console.log("catch block this", err));
      })
      .catch((err) => console.log("catch block this", err));
  });

})



