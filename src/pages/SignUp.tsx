import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, WarningTwoIcon } from "@chakra-ui/icons";
import { useState } from "react";
import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
interface userData {
  username: string;
  email: string;
  phone: string;
  password: string;
  rePassword: string;
  pic: string;
}
function Signup() {
  const navigate = useNavigate();
  const toast = useToast();
  const [err, seterr] = useState("");
  const [pic, setPic] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // const [userData, setUserData] = useState<userData>({
  //   username: "",
  //   email: "",
  //   phone: "",
  //   password: "",
  //   rePassword: "",
  //   pic: pic,
  // });
  const handlerSignup = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("rePassword", rePassword);
    formData.append("pic", pic);
    axios
      .post("https://chatback-api.onrender.com/user/register", formData)
      .then((res) => {
        alert(res.data.message);
        if (res.status >= 200 && res.status < 300) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        seterr(err.response.data.message);
      });
  };
  // const handlerChange = (e: any) => {
  //   let value = e.target.value;
  //   setUserData({ ...userData, [e.target.name]: value });
  // };
  return (
    <Flex
      //   minH={"50vh"}
      position={"relative"}
      zIndex={2000000}
      top={"192px"}
      mt={"0"}
      height={"10vh"}
      align={"center"}
      justify={"center"}
      width={"400px"}
      //   bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={3} mx={"auto"} py={0} width={"100%"}>
        <Stack align={"center"}>
          <Heading color={"white"} fontSize={"4xl"} textAlign={"center"}>
            ...أهلا بك
          </Heading>
          <Text color={"red"} fontSize={"2xl"} fontWeight={"bold"}>
            {err} {err !== "" ? <WarningTwoIcon /> : ""}
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={3}
          backgroundColor={"transparent"}
          color={"white"}
          shadow={"dark-lg"}
        >
          <form onSubmit={handlerSignup} encType="multipart/form-data">
            <Stack spacing={2}>
              <HStack alignContent={"right"}>
                <FormControl id="username" isRequired>
                  <FormLabel textAlign={"right"}>اسم المستخدم</FormLabel>
                  <Input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="MERN"
                  />
                </FormControl>
              </HStack>
              <FormControl id="phone" isRequired>
                <FormLabel textAlign={"right"}>رقم الجوال</FormLabel>
                <Input
                  type="text"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="05XXXXXXXX"
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel textAlign={"right"}>الايميل</FormLabel>
                <Input
                  placeholder="XX@gmail.com"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="pic">
                <FormLabel textAlign={"right"}>صورة شخصية</FormLabel>
                <Input
                  // type="file"
                  type="hidden"
                  name="pic"
                  // value={userData.email}
                  onChange={(e: any) => setPic(e.target.files[0])}
                />
              </FormControl>
              {/* <Text>يجب ان تحتوي كلمة المرور احرف صغيرة و كبيرة و ارقام</Text> */}
              <HStack justifyContent={"space-around"}>
                <FormControl isRequired width={"150px"}>
                  <FormLabel textAlign={"right"}>اعادة كلمة المرور</FormLabel>
                  <InputGroup>
                    <Input
                      width={"150px"}
                      name="rePassword"
                      value={rePassword}
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => setRePassword(e.target.value)}
                      placeholder="XXXXXXXX"
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        color="white"
                        _hover={{
                          backgroundColor: "blue.400",
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

                <FormControl isRequired width={"150px"} textAlign={"right"}>
                  <FormLabel textAlign={"right"}>كلمة المرور</FormLabel>
                  <InputGroup>
                    <Input
                      placeholder="XXXXXXXX"
                      width={"150px"}
                      name="password"
                      value={password}
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        color={"white"}
                        _hover={{
                          backgroundColor: "blue.400",
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
              </HStack>
              <Stack spacing={5} pt={2}>
                <Button
                  // onClick={handlerSignup}
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  تسجيل
                </Button>
              </Stack>

              <Stack pt={2}>
                <Text align={"center"}>
                  <Link to={"/login"}>
                    <Text
                      display={"inline"}
                      color={"blue.400"}
                      cursor={"pointer"}
                    >
                      تسجيل دخول
                    </Text>
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Signup;
