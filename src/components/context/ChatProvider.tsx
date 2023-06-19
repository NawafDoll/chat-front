import {
  useCallback,
  useEffect,
  createContext,
  useContext,
  useState,
} from "react";
// import {useHistory} from 'react-router-dom'
export const ChatContext = createContext<any>(null);
interface userData {
  pic: string;
  username: string;
  email: string;
  id: string;
}
const ChatProvider = ({ children }: any) => {
  const [user, setUser] = useState<userData>({
    pic: "",
    username: "",
    email: "",
    id: "",
  });
  const [selectChat, setSelectChat] = useState();
  const [chats, setChats] = useState([]);
  const [token, setToken] = useState<any>();
  useEffect(() => {
    setUser({
      pic: String(localStorage.getItem("pic")),
      username: String(localStorage.getItem("username")),
      email: String(localStorage.getItem("email")),
      id: String(localStorage.getItem("id")),
    });
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectChat,
        setSelectChat,
        chats,
        setChats,
        token,
        setToken,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
