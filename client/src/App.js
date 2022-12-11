import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Account/Login";
import Register from "./pages/Account/Register";
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
    const authContext = AuthConsumer();
    return authContext.auth ? <Outlet /> : <Navigate to="/login" />;
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
                                    <Route
                                        path="join"
                                        element={<JoinEvent />}
                                    />
                                </Route>
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
