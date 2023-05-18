import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import Layout from "./container/layout/Layout";
import HomePage from "./container/pages/HomePage";
import LoginPage from "./container/pages/LoginPage";
import { PATHS } from "./utils/paths";
import ExplorePage from "./container/pages/ExplorePage";
import RoomDetails from "./container/pages/RoomDetails";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path={PATHS.base} element={<Layout />}>
          <Route path={PATHS.base} element={<HomePage />}></Route>
          <Route path={PATHS.explore} element={<ExplorePage />}></Route>
          <Route path={PATHS.roomDetails} element={<RoomDetails />}></Route>
        </Route>
        <Route path={PATHS.login} element={<LoginPage />}></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
