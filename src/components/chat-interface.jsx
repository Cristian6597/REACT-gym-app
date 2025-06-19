import { useEffect, useState } from "react";
import { Sidebar } from "./sidebar";
import { ChatArea } from "./chat-area";
import { useAxios } from "@/context/AxiosProvider";
import { useUser } from "@/context/UserProvider";

export default function ChatInterface() {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const axios = useAxios();
  const { user } = useUser();

  // Fetch client list on mount
  useEffect(() => {
    if (!user) return;
    axios.get("/api/messages/my-clients").then((res) => {
      const clients = res.data;
      const formatted = clients.map((client) => ({
        id: client.id,
        name: client.name,
        avatar: "/placeholder.svg?height=40&width=40",
        messages: [],
        lastMessage: "",
        timestamp: "",
        unread: 0,
      }));
      setConversations(formatted);
    });
  }, [user]);

  // Fetch messages for selected conversation
  const selectConversation = async (client) => {
    const res = await axios.get(`/api/messages/${client.id}`);
    const messages = res.data.map((msg) => ({
      id: msg.id,
      content: msg.content,
      sender: msg.sender_id === user.id ? "me" : "them",
      timestamp: new Date(msg.sent_at).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));
    const updated = { ...client, messages };
    setActiveConversation(updated);
  };

  const sendMessage = async (text) => {
    if (!activeConversation || !text) return;
    const res = await axios.post("/api/messages/send", {
      receiver_id: activeConversation.id,
      content: text,
    });

    const newMessage = {
      id: res.data.id,
      content: res.data.content,
      sender: "me",
      timestamp: new Date(res.data.sent_at).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setActiveConversation((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));
  };

  return (
    <div className="flex h-full overflow-hidden bg-background">
      <Sidebar
        conversations={conversations}
        activeConversationId={activeConversation?.id}
        onSelectConversation={selectConversation}
      />
      <ChatArea conversation={activeConversation} onSendMessage={sendMessage} />
    </div>
  );
}
