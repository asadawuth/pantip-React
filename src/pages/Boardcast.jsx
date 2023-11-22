import "./boardcast.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Post from "../component/Post";
import { removeAccessToken } from "../utils/local-storage";
import { useAuth } from "../hook/use-auth";
import axios from "../config/axios";
// import { logout } from "../context/Authcontext";
// import { useNavigate } from "react-router-dom";

export default function Broadcast() {
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState({
    // 1 ตั้ง useState เพื่อเตรียมรับค่า
    title: "",
    contentString: "",
  });
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    // console.log(logout);
    logout();
    navigate("/");
  };

  // เปิดหน้ามา จะยิงข้อมูลมาจาก data base ที่ user เคยเขียนไว้
  useEffect(() => {
    const run = async () => {
      const res = await axios.get("http://localhost:8888/blogs/all");
      setPosts(res.data.blogs);
    };
    run();
  }, []); //ทำงานต่อเมื่อทุกอย่าง(หน้าในเว็ปโหลดเสร็จ) โหลดเสร็จแล้วจะทำงาน 1 ครั้ง เหมือนโชวการทำงานหรือสิ่งที่เกิดขึ้นจากหน้านั้นทั้งหมด
  // const hdl_input = (e) => {
  //   setInput({ ...input, [e.target.name]: e.target.value });
  // };
  const handle_submit = () => {
    axios.post("/blogs", input); // <= input คือค่าที่เรา ต้องการจะส่งไป หลังบ้าน
  }; //2 ยิงไป / ของหลังบ้าน จะส่งข้อมูลอะไรไปบ้าง

  return (
    <>
      <div className="sreen">
        <header className="Headbd">
          <div className="logobd">
            <div className="logo-text1bd">Q & A</div>
          </div>
          <div>
            <span>
              <a className="now"> Broadcast Room </a> &nbsp; &nbsp; &nbsp;
              <a> Register</a> &nbsp; &nbsp; &nbsp;
              <a> Login</a> &nbsp; &nbsp; &nbsp;
              <button onClick={handleLogout}>Logout</button> &nbsp; &nbsp;
              &nbsp;
            </span>
          </div>
        </header>
        <main className="mainbd">
          <h1 className="bdh1">Broadcast Room</h1>
          <div className="flexRow">
            <div>
              {posts.map((el) => (
                <Post
                  key={el.id}
                  id={el.id} // ต้องเขียนไอดี
                  title={el.title}
                  userId={el.userId}
                  contentString={el.contentString}
                  postObj={el}
                />
                // [<Post/>, <Post/>]
              ))}
            </div>
            <form className="frompost" onSubmit={handle_submit}>
              {" "}
              {/* 1. event listener จับข้อมูล เมื่อเราพิมข้อมูลครบ กดปุ๋มโพสหรือ Enter onSubmit จะทำงาน */}
              <div className="classtitle">Title:</div>
              <textarea
                name="title"
                onChange={(event) => {
                  setInput({ ...input, title: event.target.value });
                  {
                    /* 2 ฟอมที่เราตัวอักษร ของค่าที่พิมใช้ onChange รับ  */
                  }
                }}
                className="textarea"
                rows="1"
                placeholder="Type your title"
                id="title"
              ></textarea>
              <div className="Description">Description:</div>
              <textarea
                onChange={(event) => {
                  setInput({ ...input, contentString: event.target.value });
                  {
                    /* 2 ฟอมที่เราตัวอักษร ของค่าที่พิมใช้ onChange รับ  */
                  }
                }}
                className="textarea2"
                rows="4"
                placeholder="Input your description"
                id="description"
              ></textarea>
              <br />
              <button className="buttonpost">Post</button>
            </form>
          </div>
        </main>
        <footer className="footer1">
          <h6 className="texth61">Copyright @2023</h6>
        </footer>
      </div>
    </>
  );
}
