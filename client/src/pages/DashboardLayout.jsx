import {
  AppSidebar,
  FileUploader,
  Separator,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components";
import React from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <SidebarTrigger />
          <Outlet />
        </div>
        <div>
          <FileUploader />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
