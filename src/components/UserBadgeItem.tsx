import { CloseIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import React from "react";

function UserBadgeItem({ user, handleFun }: any) {
  return (
    <Box
      px={2}
      py={1}
      borderRadius={"lg"}
      m={1}
      mb={2}
      fontSize={12}
      w={"fit-content"}
      bg="purple"
      color={"white"}
      cursor={"pointer"}
      onClick={handleFun}
    >
      {user.username}
      <CloseIcon pl={1} />
    </Box>
  );
}

export default UserBadgeItem;
