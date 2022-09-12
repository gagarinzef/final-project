import logo from "./logo.svg";
import "./App.css";
import FooterComponent from "./components/FooterComponent";
import NavBar from "./components/NavBar";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import { Routes, Route } from "react-router-dom";
import TablePage from "./views/TablePage";
import ProjectList from "./views/ProjectList";
import ModalComponent from "./components/ModalComponent";

function App() {
  return (
    <div className="App">
      <NavBar />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div> */}
      {/* <LoginPage /> */}
      {/* <RegisterPage /> */}
      <Routes>
        <Route path="/modal" element={<ModalComponent />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/table/:projectId" element={<TablePage />} />
        <Route path="/home" element={<ProjectList />} />
      </Routes>
      <FooterComponent />
    </div>
  );
}

export default App;
