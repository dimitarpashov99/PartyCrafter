import Home from "./pages/home";
import AboutUs from "./pages/aboutus";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import {
    BrowserRouter,
    Outlet,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import PageNotFound from "./components/PageNotFound";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./assets/stylesheets/style.scss";
import Events from "./pages/PCEvents";
import CreateEvent from "./pages/PCEvents/CreateEvent";
import JoinEvent from "./pages/PCEvents/JoinEvent";

import { AuthProvider } from "./contexts/authContext";
import { AuthConsumer } from "./contexts/authContext";
const ProtectedRoutes = () => {
    const { auth } = AuthConsumer();
    return auth?.authenticated ? <Outlet /> : <Navigate to="/login" />;
};
function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route
                                index
                                element={<Navigate to="/home" replace />}
                            />
                            <Route path="home" element={<Home />} />
                            <Route path="events" element={<Events />}>
                                <Route element={<ProtectedRoutes />}>
                                    <Route
                                        path="create"
                                        element={<CreateEvent />}
                                    />
                                </Route>
                                <Route path="join" element={<JoinEvent />} />
                            </Route>
                            <Route path="aboutus" element={<AboutUs />} />
                            <Route path="login" element={<Login />} />
                            <Route path="register" element={<Register />} />
                            <Route path="*" element={<PageNotFound />} />
                        </Route>
                    </Routes>
                </AuthProvider>
            </div>
        </BrowserRouter>
    );
}

export default App;
