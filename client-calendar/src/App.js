import CalendarPage from "./components/CalendarPage";
import RegisterPage from "./components/RegisterPage";
import ProtectedRoutesLogin from "./components/ProtectedRoutesLogin";
import ProtectedRoutesHome from "./components/ProtectedRoutesHome";
import VerifPage from "./components/VerifPage";
import ConfirmPage from "./components/ConfirmPage";
import LoginPage from "./components/LoginPage";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
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
          path="/login"
          element={
            <ProtectedRoutesHome>
              <LoginPage />
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
          path="/verified/:token"
          element={
            <ProtectedRoutesHome>
              <VerifPage />
            </ProtectedRoutesHome>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
