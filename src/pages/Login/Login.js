import { useState } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import {
  Flex,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useFormik } from "formik";
import validationSchema from '../../yup/signinValidation';
import { useUserContext } from "../../context/UserProvider";
import { signIn } from '../../firebase/firebase';
import { LOGIN } from "../../action_types/ActionTypes";
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { dispatch } = useUserContext();
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues:{
      email:'',
      password:'',
    },
    validationSchema,
    onSubmit: async(values) => {
      const emailAndPassword = {email:values.email, password:values.password};
      const data = await signIn(emailAndPassword);
      if(data){
        onAuthStateChanged(auth, (user) => {
          if(user){
            dispatch({
              type:LOGIN, 
              payload:{
                email:user.email,
              }
            })

            navigate('/', {
              replace:true
            })
    
          }
        });
      }
    },

  });

  

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="90vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" marginBottom={4} />
        <Box minW={{ base: "90%", md: "460px" }}>

          <form onSubmit={formik.handleSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
              borderRadius={3}
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input 
                  type="email" 
                  name="email"
                  placeholder="Email Address" 
                  value={formik.values.email} 
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur} 
                  isInvalid={formik.touched.email && formik.errors.email} />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formik.values.password} 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} 
                    isInvalid={formik.touched.password && formik.errors.password} 
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link>forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New to us?{" "}
        <Link to="/register" color="teal.500">
        <b style={{color:'#38B2AC'}}>Sign up</b>
        </Link>
      </Box>
    </Flex>
  );
};

export default Login;
