import { createContext, useContext, useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { useAuthContext } from "./AuthContext";

const SocketContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [onlineUsers, setOnlineusers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (!authUser) {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      return;
    }

    if (!socketRef.current) {
      const socket = io("https://chat-app-xclo.onrender.com/", {
        query: {
          user_id: authUser._id,
        },
      });
      socketRef.current = socket;
      socket.on("getOnlineUsers", (users) => {
        console.log("users===>", users);
        setOnlineusers(users);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [authUser]);

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef,
        onlineUsers,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
