import {
  File,
  FileAudioIcon,
  Image,
  LayoutDashboardIcon,
  PieChart,
  Video,
  Share2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  LogoutBtn,
} from "@/components";
import { Link, NavLink } from "react-router-dom";

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Images",
    url: "/images",
    icon: Image,
  },
  {
    title: "Videos",
    url: "/videos",
    icon: Video,
  },
  {
    title: "Audios",
    url: "/audios",
    icon: FileAudioIcon,
  },
  {
    title: "Documents",
    url: "/documents",
    icon: File,
  },
  {
    title: "Others",
    url: "/others",
    icon: PieChart,
  },
  {
    title: "Shared With Me",
    url: "/shared",
    icon: Share2,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className={"bg-[#FECACA]"}>
        <div className="p-2 flex justify-center items-center">
          <img
            src="/logo-transparent.png"
            alt="logo"
            width={125}
            height={125}
          />
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Files</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url}>
                      <item.icon className="text-3xl font-semibold" />
                      <span className="text-xl font-semibold">
                        {item.title}
                      </span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <LogoutBtn />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
