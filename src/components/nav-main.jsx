import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain({ items }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Fitness Tracker</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem className="hover:bg-[#FF3F3F10] rounded-lg transition-colors">
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  className="flex items-center gap-2 data-[state=open]:text-[#FF3F3F] group/item"
                >
                  {item.icon && (
                    <item.icon
                      className={`
                    w-5 h-5 transition-colors duration-200
                    text-gray-500 
                    group-data-[state=open]/collapsible:text-[#FF3F3F]
                    group-hover/item:text-[#FF3F3F]
                  `}
                    />
                  )}
                  <span className="transition-colors group-data-[state=open]/collapsible:text-[#FF3F3F] group-hover/item:text-[#FF3F3F]">
                    {item.title}
                  </span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 group-hover/item:text-[#FF3F3F]" />
                </SidebarMenuButton>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem
                      key={subItem.title}
                      className="hover:bg-[#FF3F3F10] rounded-lg group/subitem"
                    >
                      <SidebarMenuSubButton asChild>
                        <a
                          href={subItem.url}
                          className="group-hover/subitem:text-[#FF3F3F]"
                        >
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
