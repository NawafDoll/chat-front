import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Background from "./components/Background";
import NavBar from "./components/NavBar";
import ChatPage from "./pages/ChatPage";
import ChatProvider from "./components/context/ChatProvider";
const ENDPOINT = "http://localhost:5000";
let socket, selectChatCompare;
export const App = () => (
  <ChatProvider>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route element={<Background />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* <Route path="/forgetpass" element={<ForgetPass />} /> */}
            {/* <Route path="/user/editpass/:id/:token" element={<EditPaa />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </ChatProvider>
);
