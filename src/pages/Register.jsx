import "./register.css"; // css ในไฟล์ที่เราสร้างเอง
import { Link, useNavigate } from "react-router-dom"; //เรียกใช้ Link เชื่อมต่อหน้า
import { useState } from "react"; // เรียกใช้  useState
import Joi from "joi";
import axios from "../config/axios";
import { ToastContainer, toast } from "react-toastify";

const schema = Joi.object({
  username: Joi.string().min(4).max(88).required(),
  password: Joi.string().min(6).alphanum().required(),
  confirmpassword: Joi.string().valid(Joi.ref("password")).trim().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
}); // confirm password :Joi.string().vaild(Joi.ref('password')) ลืม

export default function Register() {
  const [username, setUsername] = useState(""); // destructuring
  const [password, setPassword] = useState(""); // destructuring
  const [confirmpassword, setconfirmpassword] = useState("");
  const [email, setEmail] = useState(""); // destructuring
  const navigate = useNavigate();
  const [error, setError] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleSubmitForm = (event) => {
    event.preventDefault(); // มีไว้เพื่อไม่ให้ เว็ปถูก Refresh ทั้งหน้า
    const { value, error } = schema.validate(
      { username, password, confirmpassword, email },
      { abortEarly: false } //ถ้าเจอ error ตัวเดียว Return เลย
    ); // <<<แบบย่อ >>> เขียนแบบเต็ม username:username,password:password,email:email
    // ใส่abortEarly:false มันจะทำการ validation ทุกตัวให้เรา
    if (error) {
      console.dir(error);
      const nextError = { username: "", password: "", email: "" };
      for (let item of error.details) {
        nextError[item.path[0]] = item.message;
        //username = 'message error' <= สิ่งที่ได้ออกมา
        //password = 'message error' <= สิ่งที่ได้ออกมา
        //email = 'message error' <= สิ่งที่ได้ออกมา
      }
      return setError(nextError);
    }
    setError({
      username: "",
      password: "",
      email: "",
    });
    axios
      .post("/auth/register", { username, password, email })
      .then((res) => {
        toast.success("Success");
        navigate("/login"); //สมัคร สำเสร็จจะส่งไปที่/login
      })
      .catch((err) => {
        toast.error("error");
      }); //ค่าย200ได้ ค่าย400/500 จะเกิด error
  };

  // console.log("error", error); log ดูสิ่งที่เกิดขึ้น

  return (
    <>
      <header className="Head">
        <div className="logo">
          <div className="logo-text">Q & A</div>
        </div>
        <div>
          <span>
            <a>Broadcast Room</a> &nbsp; &nbsp; &nbsp;
            <Link to="/Register" className="Now">
              Register
            </Link>{" "}
            &nbsp; &nbsp; &nbsp;
            <Link to="/login">Login</Link> &nbsp; &nbsp; &nbsp;
            <a>Logout</a> &nbsp; &nbsp; &nbsp;
          </span>
        </div>
      </header>
      <main className="main">
        <h1 className="texth1">Exchange ideas</h1>
        <div className="login">
          <h2 className="texth2">Register</h2>
          <form className="login-form" onSubmit={handleSubmitForm}>
            <input
              className={error.username ? "error" : null}
              type="text"
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)} //cb => browser execute  cb(event)
            />
            {error.username && (
              <span className="texterror">{error.username}</span>
            )}
            <input
              className={error.password ? "error" : null}
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)} //cb => browser execute  cb(event)
            />
            {error.password && (
              <span className="texterror">{error.password}</span>
            )}
            <input
              className={error.confirmpassword ? "error" : null}
              type="password"
              placeholder="confirmPassword"
              value={confirmpassword}
              onChange={(event) => setconfirmpassword(event.target.value)} //cb => browser execute  cb(event)
            />
            {error.confirmpassword && (
              <span className="texterror">{error.confirmpassword}</span>
            )}
            <input
              className={error.email ? "error" : null}
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)} //cb => browser execute  cb(event)
            />
            {error.email && <span className="texterror">{error.email}</span>}
            <button className="button">Register</button>
          </form>
        </div>
      </main>
      <footer>
        <h6 className="texth6">Copyright @2023</h6>
      </footer>
    </>
  );
}
