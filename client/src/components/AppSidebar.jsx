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

import { NavLink } from "react-router-dom";

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

// This lets NavLink compute isActive state and apply appropriate classes
const activePath = ({ isActive }) =>
  isActive
    ? "bg-gray-50 py-1 px-1 text-black flex items-center gap-2 rounded-md transition-all duration-300 ease-in-out transform scale-105 shadow-md"
    : "flex items-center gap-2 rounded-md py-1 px-1 transition-all duration-300 ease-in-out transform hover:bg-gray-100 hover:shadow-md";

export function AppSidebar() {
  return (
    <Sidebar variant={"inset"}>
      <SidebarContent
        className={"bg-[#FECACA] flex flex-col h-full justify-center"}
      >
        <div className="p-1 flex justify-center items-center">
          <img src="/logo-transparent.png" alt="logo" width={125} height={125} />
        </div>

        <SidebarGroup className="py-0">
          <SidebarGroupLabel>Files</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                    <NavLink to={item.url} className={activePath}>
                      <item.icon className="text-3xl font-semibold mr-2" />
                      <span className="text-xl font-semibold">
                        {item.title}
                      </span>
                    </NavLink>
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

