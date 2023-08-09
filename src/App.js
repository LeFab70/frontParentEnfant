//import { useMemo, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import AuthRouter from "./components/auth/AuthRouter";
import AdminRouter from "./pages/Admin/AdminRouter";
import AuthRouter from "./pages/auth/AuthRouter";
//import PublicRouter from "./pages/public/PublicRouter";
import AuthGaurd from "./_helps/AuthGaurd";
//import { UserContext } from "./UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/public/Footer";

const App = () => {
  // const [user, setUser] = useState(null);
  //const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    // <Suspense fallback={null}>
    // <UserContext.Provider value={providerValue}>
    <>






    
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={
              <AuthGaurd>
                <AdminRouter />{" "}
              </AuthGaurd>
            }
          />

          <Route
            path="/admin/*"
            element={
              <AuthGaurd>
                <AdminRouter />{" "}
              </AuthGaurd>
            }
          />

          <Route path="/auth/*" element={<AuthRouter />} />
        </Routes>
      </BrowserRouter>
      <Footer />
      <ToastContainer />
      {/* // </UserContext.Provider> */}
      {/* // </Suspense> */}
    </>
  );
};

export default App;
