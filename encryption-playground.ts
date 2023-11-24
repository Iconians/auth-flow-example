import jwt from "jsonwebtoken";
import { createAuthTokenForUser } from "./src/auth-utils";
// import bcrypt from "bcrypt";

// const password = "password";
// console.log("starting");
// bcrypt.hash(password, 11).then((result) => {
//   console.log({ result });
// });

// bcrypt
//   .compare(
//     password,
//     "$2b$11$.GssSN3pOrqQFbhn2zGtVOy7.iGuVCYzQLOof1XQSum/7z1T7/V5."
//   )
//   .then((result) => {
//     console.log({ result: result });
//   });

// const actualJwt =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9uIiwiaWF0IjoxNzAwNzgxODU5fQ.AFXFU6I6LQSQuYLK2ebqXfT7241ZUy378OCMe8xbtUY";

// const editedJwt =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obm55J3MiLCJpYXQiOjE3MDA3ODE4NTl9.giASNvmDj2FeSK5Qhk23EjeUHEzHkvVOtfAUTk-UCHA";

// const editedJwtWithSecret =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obm55J3MiLCJpYXQiOjE3MDA3ODE4NTl9.XQutYZwel-Y_z31TSaM3t6mA2AxVIFmKl2YU24kCVpA";
// const data = {
//   name: "Jon",
// };

// const myJwt = jwt.sign(data, "supersecret");

// const jwtData = jwt.verify(editedJwtWithSecret, "supersecret");
// console.log({ jwtData });

// console.log({ myJwt });
