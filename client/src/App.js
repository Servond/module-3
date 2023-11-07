import { Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
// import { useSelector } from "react-redux";
import Auth from "./components/Auth";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
function App() {
  // const { user, isLogin } = useSelector((state) => state.AuthReducer);

  return (
    <Box>
      <Auth>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnHover={false}
          draggable={true}
          progress={undefined}
          theme="light"
        />
      </Auth>
    </Box>
  );
}

export default App;
