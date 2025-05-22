import { cn } from "@/lib/utils"

export function MessageBubble({ message, isCurrentUser, authorName }) {
  return (
    (<div className={cn("flex", isCurrentUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[70%] rounded-lg px-4 py-2",
          isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted"
        )}>
        {authorName && <div className="text-xs font-medium mb-1">{authorName}</div>}
        <div>{message.content}</div>
        <div className="text-xs mt-1 opacity-70">{message.timestamp}</div>
      </div>
    </div>)
  );
}
