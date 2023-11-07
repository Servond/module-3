import {
  Box,
  Button,
  Input,
  InputGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser, loginSuccess } from "../../redux/reducer/authReducer";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const login = async (email, password) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", res?.data?.data?.token);
      await dispatch(setUser(res?.data?.data?.user));
      await dispatch(loginSuccess());

      toast({
        position: "top",
        title: "Login Success",
        status: "success",
        isClosable: true,
      });
      navigate("/");
    } catch (err) {
      toast({
        position: "top",
        title: err?.response?.data || err?.message,
        status: "error",
        isClosable: true,
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      login(values.email, values.password);
    },
  });

  return (
    <Box w="full" p={8}>
      <Heading>Login</Heading>
      <form onSubmit={formik.handleSubmit}>
        <FormLabel>Email: </FormLabel>
        <FormControl
          isInvalid={formik.touched.email && formik.errors.email}
          mb={5}
        >
          <InputGroup>
            <Input
              size="lg"
              type="text"
              name="email"
              placeholder="Your email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </InputGroup>
          {formik.touched.email && formik.errors.email && (
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          )}
        </FormControl>
        <FormLabel>Password: </FormLabel>
        <FormControl
          isInvalid={formik.touched.password && formik.errors.password}
          mb={5}
        >
          <InputGroup>
            <Input
              size="lg"
              type="password"
              name="password"
              placeholder="Your password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </InputGroup>
          {formik.touched.password && formik.errors.password && (
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          )}
        </FormControl>
        <Button type="submit">Login</Button>
      </form>
    </Box>
  );
}

export default Login;
