import CalendarPage from "./components/CalendarPage";
import RegisterPage from "./views/RegisterPage";
import ProtectedRoutesLogin from "./components/ProtectedRoutesLogin";
import ProtectedRoutesHome from "./components/ProtectedRoutesHome";
import VerifPage from "./components/VerifPage";
import ConfirmPage from "./components/ConfirmPage";
import LoginPage from "./views/LoginPage";
import Navbar from "./components/Navbar";
import InvitationPage from "./views/InvitationPage";
import TablePage from "./views/TablePage";
import { Route, Routes } from "react-router-dom";
import ProjectList from "./views/ProjectList";
import FooterComponent from "./components/FooterComponent";
import TableBaru from "./views/TableBaru";
import TableTest from "./components/TableTest";

function App() {
  return (
    <div className="App">
      <Navbar />
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
          path="/verify/:msg"
          element={
            <ProtectedRoutesHome>
              <ConfirmPage />
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
            <ProtectedRoutesLogin>
              <InvitationPage />
            </ProtectedRoutesLogin>
          }
        />
      </Routes>
      <FooterComponent />
    </div>
  );
}

export default App;
