import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CalendarPage from "./components/CalendarPage";
import RegisterPage from "./views/RegisterPage";
import ProtectedRoutesLogin from "./components/ProtectedRoutesLogin";
import ProtectedRoutesHome from "./components/ProtectedRoutesHome";
import VerifPage from "./components/VerifPage";
import LoginPage from "./views/LoginPage";
import InvitationPage from "./components/InvitationPage";
import TablePage from "./views/TablePage";
import AssignPage from "./components/AssignPage";
import { Route, Routes } from "react-router-dom";
import ProjectList from "./views/ProjectList";
import FooterComponent from "./components/FooterComponent";
import TableTest from "./components/table/TableTest";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutesHome>
              <LoginPage />
            </ProtectedRoutesHome>
          }
        />

        <Route path="/test" element={<TableTest />} />

        <Route
          path="/calendar"
          element={
            <ProtectedRoutesLogin>
              <CalendarPage />
            </ProtectedRoutesLogin>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoutesHome>
              <RegisterPage />
            </ProtectedRoutesHome>
          }
        />

        <Route
          path="/projects"
          element={
            <ProtectedRoutesLogin>
              <ProjectList />
            </ProtectedRoutesLogin>
          }
        />

        <Route
          path="/table/:projectId"
          element={
            <ProtectedRoutesLogin>
              <TablePage />
            </ProtectedRoutesLogin>
          }
        />

        <Route
          path="/assign/:projectId"
          element={
            <ProtectedRoutesLogin>
              <AssignPage />
            </ProtectedRoutesLogin>
          }
        />

        <Route
          path="/verified/:token"
          element={
            <ProtectedRoutesHome>
              <VerifPage />
            </ProtectedRoutesHome>
          }
        />

        <Route
          path="/invitation"
          element={
              <InvitationPage />
          }
        />
      </Routes>
      <div>
        <FooterComponent />
      </div>
    </div>
  );
}

export default App;
