import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Account/Login";
import Register from "./pages/Account/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import PageNotFound from "./components/PageNotFound";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./assets/stylesheets/style.scss";
import Events from "./pages/PCEvents";
import { CreateEvent } from "./components/pcevent";
import { CssBaseline } from "@mui/material";
import EventsLanding from "./pages/PCEvents/EventsLanding";
function App() {
  return (
    <BrowserRouter>
      <CssBaseline enableColorScheme />
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="home" element={<Home />} />
            <Route path="events" element={<Events />}>
              <Route index element={<EventsLanding />} />
              <Route path="create" element={<CreateEvent />} />
            </Route>
            <Route path="aboutus" element={<AboutUs />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
