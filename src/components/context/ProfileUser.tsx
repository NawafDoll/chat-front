import {
  Avatar,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChatState } from "./ChatProvider";

function ProfileUser() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { token, user } = ChatState();
  const finalRef = React.useRef(null);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
    document.location.reload();
  };
  return (
    <>
      <Avatar
        size={"sm"}
        src={`https://chatback-api.onrender.com/${user.pic}`}
        cursor={"pointer"}
        onClick={onOpen}
      />
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <Avatar
                size={"2xl"}
                src={`https://chatback-api.onrender.com/${user.pic}`}
              />
              <Heading>{user.username}</Heading>
              <Text>{user.email}</Text>
            </VStack>
          </ModalBody>

          <ModalFooter display={"flex"} justifyContent={"center"}>
            <Link to={"/login"}>
              <Button
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"red"}
                _hover={{
                  bg: "blue.800",
                }}
                onClick={logout}
              >
                خروج
              </Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProfileUser;
