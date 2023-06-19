import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { WarningTwoIcon } from "@chakra-ui/icons";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChatState } from "../components/context/ChatProvider";
interface UserData {
  email: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const { setToken } = ChatState();
  const [loading, setLoading] = useState(false);
  const [err, seterr] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });

  const login = () => {
    setLoading(true);
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    axios
      .post("https://chat-api-9h8t.onrender.com/user/login", userData, config)
      .then((res) => {
        // let t:any = localStorage.setItem(res.data.token)
        // setToken(
        // "sss"
        // JSON.stringify(
        //   String(localStorage.setItem("token", res.data.token)) || "{}"
        // );
        // );
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("pic", res.data.pic);
        localStorage.setItem("id", res.data.id);

        setLoading(false);
        if (res.status >= 200 || res.status < 300) {
          setLoading(false);
          navigate(`/`);
          document.location.reload();
        }
      })
      .catch((err) => {
        // console.log(err);
        setLoading(false);
        seterr(err.response.data.message);
      });
  };
  const handlerChange = (e: any) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  return (
    <Flex
      // minH={"100vh"}
      // backgroundColor={"#12132c"}
      width={"500px"}
      align={"center"}
      justify={"center"}
      // bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={8}
        mx={"auto"}
        maxW={"lg"}
        py={12}
        px={6}
        backgroundColor={"transparent"}
      >
        <Stack align={"center"} position={"relative"} bottom={"60px"}>
          <Heading fontSize={"4xl"} color={"white"}>
            تسجيل الدخول
          </Heading>
          <Text color={"red"} fontSize={"2xl"} fontWeight={"bold"}>
            {err} {err !== "" ? <WarningTwoIcon /> : ""}
          </Text>
        </Stack>
        <Box
          // shadow={"gray 0 0 13px 1px"}
          // dropShadow={"dark-lg"}
          // backgroundColor={}
          shadow={"dark-lg"}
          position={"relative"}
          zIndex={20000000}
          bottom={"80px"}
          rounded={"lg"}
          // bg={useColorModeValue("white", "gray.700")}
          // boxShadow={"lg"}
          p={8}
        >
          <Stack
            spacing={4}
            color={"white"}
            backgroundColor={"transparent"}
            // shadow={"dark-lg"}
          >
            <FormControl isRequired id="email">
              <FormLabel textAlign={"right"}>الايميل</FormLabel>
              <Input
                placeholder="XX@hotmail.com"
                type="email"
                value={userData.email}
                name={"email"}
                onChange={handlerChange}
              />
            </FormControl>

            <FormControl isRequired id="password">
              <FormLabel textAlign={"right"}>كلمة المرور</FormLabel>
              <InputGroup>
                <Input
                  placeholder="XXXXXXXXX"
                  // type="password"
                  type={showPassword ? "text" : "password"}
                  value={userData.password}
                  name={"password"}
                  onChange={handlerChange}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    _hover={{
                      color: "black",
                      backgroundColor: "white",
                    }}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                // align={"start"}
                justify={"right"}
              >
                <Link to={"/forgetpass"}>
                  <Text
                    cursor={"pointer"}
                    textAlign={"right"}
                    color={"blue.400"}
                  >
                    تغيير كلمة المرور؟
                  </Text>
                </Link>
              </Stack>
              <Button
                isLoading={loading}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={login}
              >
                تسجيل دخول
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
      {/* <UserId.provider val></UserId.provider> */}
    </Flex>
  );
}

export default Login;
