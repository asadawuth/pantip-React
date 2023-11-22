import "./login.css"; //ดึง Css
import { Link, useNavigate } from "react-router-dom"; // Link
import { useState } from "react"; // useState
import { ToastContainer, toast } from "react-toastify"; //สำเสร็จให้แสดงไม่สำเสร็จให้แสดง
import axios from "../config/axios";
import { addAccessToken } from "../utils/local-storage";

export default function LoginPage() {
  //เก็บค่า Username password ตอนพิม      1
  const [loginInput, setLoginInput] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  // const login = async (credential) => {
  //   const res = await axios.post("/auth/login", credential);
  //   addAccessToken(res.data.accessToken);
  //   setAuthUser(res.data.user);
  // };

  //  เก็บค่าจากขั้นตอนที่ 1 ส่งไปหลังบ้าน                    2
  const onSubmit = async (idpass) => {
    idpass.preventDefault();
    // กดปุ๋มแล้ว อยากให้ทำไรต่อ
    const login = await axios
      .post("/auth/login", loginInput) // ชื่อ /path ที่เราจะส่งไปเก็บข้อมูลหลังบ้าน 3

      .then((e) => {
        toast.success("Success"); //แจ้งเตือนแบบเป้น ui ว่าสำเสร็จแล้ว
        navigate("/BroadcastRoom"); //ล็อคอินเสร็จไปหน้า  /BroadcastRoom
        addAccessToken(e.data.accessToken); // หน้าบ้านจะส่ง Token กลับบ้าน
      })
      .catch((err) => {
        toast.error(err.response.data.message); // ถ้าล็อคอินไม่สำเสร็จ   จะขึ้นหน้า ui ว่าไม่สำเสร็จ
      });
  };

  return (
    <>
      <header className="Head">
        <div className="logo">
          <div className="logo-text">Q & A</div>
        </div>
        <div>
          <span>
            <a> Broadcast Room </a> &nbsp; &nbsp; &nbsp;
            <Link to="/Register"> Register</Link> &nbsp; &nbsp; &nbsp;
            <Link to="/login" className="Now">
              Login
            </Link>{" "}
            &nbsp; &nbsp; &nbsp;
            <a>Logout</a> &nbsp; &nbsp; &nbsp;
          </span>
        </div>
      </header>
      <main className="main">
        <h1 className="texth1">Exchange ideas</h1>
        <div className="login">
          <h2 className="texth2">Login</h2>

          <form onSubmit={onSubmit} className="login-form">
            <input
              type="text"
              value={loginInput.username}
              onChange={
                (e) =>
                  setLoginInput({ ...loginInput, username: e.target.value }) // เก็บค่าเก่าทับค่าใหม่
              }
              placeholder="Username"
            />
            <input
              type="password"
              value={loginInput.password}
              onChange={(e) =>
                setLoginInput({ ...loginInput, password: e.target.value })
              }
              placeholder="Enter Password"
            />
            <button className="button">Login</button>
            <a className="forgot">forgot password?</a>
          </form>
        </div>
      </main>
      <footer className="footerlogin">
        <h6 className="texth6">Copyright @2023</h6>
      </footer>
    </>
  );
}
