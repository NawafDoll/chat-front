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
  const [pic, setPic] = useState<any>(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAAB8CAMAAACcwCSMAAAAMFBMVEXBx9D///+9w83g4+fJztbz9PbQ1Nvp6+7FytP4+fr8/P3a3ePd4OXu8PLj5unM0dlzI2nQAAAFBUlEQVRogcWbWZKEIBBEERUQUe9/23HtZifLhpj8m4genyAUVQmwji49ynWexaDYLjWIeV7lqF88iBG5Sy8OJGeOzj9FvxDfgAIfV6G4h3VfQYl1bAGf+s1vb/wFtn6qDJdbrskenwtZD657BZNvvuqRz1+GT4YGfmTK+BJc9+/Qh4qtL8DlQOxwW3wofPssfBI/oE+8yI78HLz/EX3i+1fwaavA3ulbuvFJuERCCkRnyS+fgs91yJdmGvzXkeaKCwJcq5roQyo65WPwsTZ6F4+tdhF4C/auBYE3YjMWtj2AN2NH6D5ct2Mz5o86H159nNsa8nBBeBS/RfgXkYMb9EmcDcLIZRwXacQAR2Ju0nCJtkAZO0/Xo4G/lkzBJ/D1YzkCnHXYa5wNHzD2GqIPgau/PegsOPTB+ZZMzDSUANif/QufoH9NrY6nZugR347/wqFZZmJMYud959sHLpFaqMDG2s4/4/WBa2S0JXICW0j/Dc+weeDIWFVlNhSfPxntDUemeDQfCDQin31y4Eg9lh3oXyHpn7HhmvC6JUGdqC04Ug2CDcfGXG/BkXUB9jugXOgLR+a4nwhkBMzaa64zsKPK8eUrJM6JB45EdR7JfFNakOdNNxxaDGGLCRzv/Q3fgB8PBH8PCtXbBYdG54azsdYcs2eHr7R1EBAy04+EiIELeXX48UQG1sP14XvVzKCJ0QK+T14GZp3VR/sx2RhaIVHmOVZCiB2OsWtHuEMdQ2tiSmwHH6nZAv6y7qp2amFwcVh3PT8k2Qr+Ml+r2ILqlkMrw63GijncpZkAB5tOeCDDjZCKefslwdChycABT3keI9hPyJijuNU05yu7bXCKtDlBtN1SlsgjdN6+VDbKwjP8pbhIezL0HQKq35ncMoHjtIUmTI0H/5MPZ2kgBBkLr3on4Iwrdaf3lHgFv7zXdRl3LSvBe3VFie3BC9BdZx/eeGrmtOLJRH1JOI1qoAVOIBtIo6lzCx1FQ+OAnJSAy6X6OsslyEEhC3jmgpTIfBCz6UkysyjG+rNELpkY86sDX50eC7FzK9oiheMeeWUPm9y2SK68IdSmMWXCJx8LVhjFEYgr7RPcVlhyssXPGhDpieH8MQET9idWoZSUevhjfyackWKSjinu5X+M37jlDW3nIIp1vGV5xxYXDp7mKyvatO4Lj3RNjdF2KTbm7G2OcIMndajnjcJY42zwhAZSqSqjKAyhztZW6GVQfLeSwnXT3dQLAk2dSX7JNyv87cwgDraEBxu5/oRoCA+3sP0w1xAe2bz3gnA7ePTYgrsX1wweP7DhuljN4ImjKs5krznPHXjqkI6T9ahqTdf2UE4eT/I+e6W2aytL82zEzJG0Oj2vbcckeyTNXfkp29YpOXHdz0+CY4jOtEibbqCcJYOXjiG6WTxXP+Uz3lnt4gHMvaOYg5/fN94rGYCjp34F87rxfrEUmbrAceN39Zp/cAI8bhymfHR871Xo8cILPWIuCAFvMp4lSTpi3sWs801CQ08vIjBiiYfrY9UtV3PxWtZohtASIV8r2DsvYmxwJWT688s5Yj7z4cWFii510odzYby7cXqUvWBRG+jlVZIu72scpveh7TC8d2z8Rd9foulKGwg8uLLn9fgv14e6/704tWt6tx3ATTkwYZflqPsYvNxqFL5Liv+6JnjqHy9InipeDeVqa3M19NJ0X4qNqe2l2Ed6Ca8DU7mn/gCjpDDFaYkmzAAAAABJRU5ErkJggg=="
  );
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
    // const formData = new FormData();
    // formData.append("username", username);
    // formData.append("email", email);
    // formData.append("phone", phone);
    // formData.append("password", password);
    // formData.append("rePassword", rePassword);
    // formData.append("pic", pic);
    axios
      .post("https://chatback-api.onrender.com/user/register", {
        username: username,
        email: email,
        phone: phone,
        password: password,
        rePassword: rePassword,
        pic: pic || "",
      })
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

  const handlerPic = (e: any) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };

  const setFileToBase = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPic(reader.result);
    };
  };

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
                  placeholder="XX@gmail.com"
                  type="file"
                  name="pic"
                  // value={userData.email}
                  onChange={handlerPic}
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
