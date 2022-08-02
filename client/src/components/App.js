import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import Login from "../pages/Account/Login";
import Register from "../pages/Account/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import "../assets/stylesheets/style.css";
import EventsLanding from "../pages/PCEvents/EventsLanding";
import { CssBaseline } from "@mui/material";
function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <div className="App">
        <Layout>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/events" element={<EventsLanding />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
