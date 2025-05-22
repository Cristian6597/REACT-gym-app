"use client"

import { Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function Sidebar({ conversations, activeConversationId, onSelectConversation }) {
  return (
    (<div className="w-full max-w-[320px] border-r bg-muted/10">
      <div className="flex h-16 items-center gap-2 border-b px-4">
        <Avatar>
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
          <AvatarFallback>ME</AvatarFallback>
        </Avatar>
        <div className="text-lg font-semibold">Chats</div>
      </div>
      <div className="p-3">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search or start new chat" className="pl-9 bg-muted/50" />
        </div>
      </div>
      <div className="overflow-y-auto h-[calc(100vh-132px)]">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className={cn(
              "flex items-center gap-3 p-3 cursor-pointer hover:bg-muted/50 transition-colors",
              activeConversationId === conversation.id && "bg-primary/10"
            )}
            onClick={() => onSelectConversation(conversation)}>
            <Avatar>
              <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
              <AvatarFallback>{conversation.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <div className="font-medium truncate">{conversation.name}</div>
                <div className="text-xs text-muted-foreground">{conversation.timestamp}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</div>
                {conversation.unread > 0 && (
                  <div
                    className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                    {conversation.unread}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>)
  );
}
