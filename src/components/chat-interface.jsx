import { useState } from "react"
import { Sidebar } from "./sidebar"
import { ChatArea } from "./chat-area"

export default function ChatInterface() {
  const [activeConversation, setActiveConversation] = useState(null)

  const conversations = [
    {
      id: "1",
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Hey, how are you?",
      timestamp: "10:30 AM",
      unread: 2,
      messages: [
        { id: "1", content: "Hey there!", sender: "them", timestamp: "10:25 AM" },
        { id: "2", content: "Hey, how are you?", sender: "them", timestamp: "10:30 AM" },
      ],
    },
    {
      id: "2",
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Can we meet tomorrow?",
      timestamp: "Yesterday",
      unread: 0,
      messages: [
        { id: "1", content: "Hi Jane!", sender: "me", timestamp: "Yesterday" },
        { id: "2", content: "I need to discuss something with you", sender: "me", timestamp: "Yesterday" },
        { id: "3", content: "Sure, what's up?", sender: "them", timestamp: "Yesterday" },
        { id: "4", content: "Can we meet tomorrow?", sender: "them", timestamp: "Yesterday" },
      ],
    },
    {
      id: "3",
      name: "Team Project",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Alice: I've updated the docs",
      timestamp: "Yesterday",
      unread: 5,
      messages: [
        { id: "1", content: "I've updated the documentation", sender: "them", timestamp: "Yesterday", author: "Alice" },
        { id: "2", content: "Great work!", sender: "them", timestamp: "Yesterday", author: "Bob" },
        { id: "3", content: "Thanks!", sender: "them", timestamp: "Yesterday", author: "Alice" },
      ],
    },
    {
      id: "4",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "The meeting is confirmed",
      timestamp: "Monday",
      unread: 0,
      messages: [
        { id: "1", content: "Do we have the meeting tomorrow?", sender: "me", timestamp: "Monday" },
        { id: "2", content: "Yes, at 2 PM", sender: "them", timestamp: "Monday" },
        { id: "3", content: "Perfect, thanks!", sender: "me", timestamp: "Monday" },
        { id: "4", content: "The meeting is confirmed", sender: "them", timestamp: "Monday" },
      ],
    },
    {
      id: "5",
      name: "David Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Check out this link",
      timestamp: "Sunday",
      unread: 0,
      messages: [
        { id: "1", content: "Hey, have you seen this?", sender: "them", timestamp: "Sunday" },
        { id: "2", content: "Check out this link: https://example.com", sender: "them", timestamp: "Sunday" },
      ],
    },
  ]

  return (
    (<div className="flex h-full overflow-hidden bg-background">
      <Sidebar
        conversations={conversations}
        activeConversationId={activeConversation?.id}
        onSelectConversation={(conversation) => setActiveConversation(conversation)} />
      <ChatArea
        conversation={activeConversation}
        onSendMessage={(message) => console.log("Sending message:", message)} />
    </div>)
  );
}
