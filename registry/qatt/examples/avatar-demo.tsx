import { Avatar, AvatarFallback, AvatarGroup } from "@/registry/qatt/ui/avatar"

// Fallback letters are illustrative glyphs (the brand initial «ق»), not names.
export default function AvatarDemo() {
  return (
    <div className="flex items-center gap-6">
      <Avatar size="lg" ring>
        <AvatarFallback tone="red">ق</AvatarFallback>
      </Avatar>
      <AvatarGroup>
        {(["red", "blue", "yellow", "ink"] as const).map((tone) => (
          <Avatar key={tone}>
            <AvatarFallback tone={tone}>ق</AvatarFallback>
          </Avatar>
        ))}
      </AvatarGroup>
    </div>
  )
}
