import { useState } from "react"
import { Send, Paperclip, Smile } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageBubble } from "./message-bubble"

export function ChatArea({ conversation, onSendMessage }) {
  const [messageText, setMessageText] = useState("")

  const handleSendMessage = () => {
    if (messageText.trim()) {
      onSendMessage(messageText)
      setMessageText("")
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!conversation) {
    return (
      (<div className="flex-1 flex items-center justify-center bg-muted/5">
        <div className="text-center text-muted-foreground">
          <h3 className="text-xl font-medium">Welcome to Chat</h3>
          <p className="mt-2">Select a conversation to start chatting</p>
        </div>
      </div>)
    );
  }

  return (
    (<div className="flex-1 flex flex-col h-full">
      {/* Chat header */}
      <div className="flex items-center gap-3 p-3 h-16 border-b">
        <Avatar>
          <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
          <AvatarFallback>{conversation.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{conversation.name}</div>
          <div className="text-xs text-muted-foreground">Online</div>
        </div>
      </div>
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/5">
        {conversation.messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isCurrentUser={message.sender === "me"}
            authorName={message.author} />
        ))}
      </div>
      {/* Message input */}
      <div className="p-3 border-t bg-background">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message"
            className="flex-1" />
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Smile className="h-5 w-5" />
          </Button>
          <Button
            onClick={handleSendMessage}
            disabled={!messageText.trim()}
            size="icon"
            className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>)
  );
}
