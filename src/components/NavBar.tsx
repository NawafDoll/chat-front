import React from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useDisclosure,
  VStack,
  HStack,
  Image,
  Avatar,
  MenuButton,
} from "@chakra-ui/react";
import "./app.css";
import { HamburgerIcon, CloseIcon, Search2Icon } from "@chakra-ui/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Slide } from "./Slide";
import { ChatState } from "./context/ChatProvider";
import ProfileUser from "./context/ProfileUser";

function NavBar(props: any) {
  const navigate = useNavigate();
  const [admin, setAdmin] = React.useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<any>();

  return (
    <Box
      backgroundColor={"blackAlpha.800"}
      shadow={"dark-lg"}
      position={"relative"}
      zIndex={20000}
    >
      <Flex
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 5 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("black", "gray.100")}
        align={"center"}
        justify={"space-between"}
      >
        {localStorage.getItem("token") && (
          <Flex justifyContent={"left"} marginRight={"50"}>
            <Button
              bg={""}
              border={"2px"}
              borderColor={"InactiveBorder"}
              ref={btnRef}
              onClick={onOpen}
              _hover={{ boxShadow: "dark-lg" }}
            >
              <HStack spacing={3}>
                <Search2Icon color={"white"} />
                <Text color={"white"}>البحث</Text>
              </HStack>
            </Button>
          </Flex>
        )}
        {!localStorage.getItem("token") && (
          <Flex justifyContent={"left"} marginRight={"50"}>
            <Text
              display={"flex"}
              justifyContent={"center"}
              textAlign={"left"}
              fontFamily={"heading"}
              color={"white"}
            >
              <Text>CHAT WEB</Text>
            </Text>
          </Flex>
        )}

        {!localStorage.getItem("token") && (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={2}
          >
            <Link to={"/login"}>
              <Button
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                border={"1px"}
                borderColor={"white"}
                bg={""}
                _hover={{
                  borderColor: "blue",
                }}
              >
                تسجيل الدخول
              </Button>
            </Link>
            <Link to={"/signup"}>
              <Button
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"blue.600"}
                _hover={{
                  bg: "blue.800",
                }}
              >
                التسجيل
              </Button>
            </Link>
          </Stack>
        )}
        {localStorage.getItem("token") && (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={2}
          >
            <ProfileUser />
          </Stack>
        )}
      </Flex>
      <Box>
        <Slide
          btnRef={btnRef}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
        />
      </Box>
    </Box>
  );
}

export default React.memo(NavBar);
