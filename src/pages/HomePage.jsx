import "./home.css";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <header className="Head1">
        <div className="logo1">
          <div className="logo-text1">Q & A</div>
        </div>
        <div>
          <span>
            <a> Broadcast Room </a> &nbsp; &nbsp; &nbsp;
            <Link to="/Register"> Register</Link> &nbsp; &nbsp; &nbsp;
            <Link to="/login"> Login</Link> &nbsp; &nbsp; &nbsp;
            <a>Logout</a> &nbsp; &nbsp; &nbsp;
          </span>
        </div>
      </header>
      <main className="main1">
        <h1 className="texth11">Exchange ideas</h1>
        <h2 className="texth21">welcome</h2>
      </main>
      <footer className="footer1">
        <h6 className="texth61">Copyright @2023</h6>
      </footer>
    </>
  );
}
