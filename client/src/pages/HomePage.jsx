import react from "react";
import {RecentFiles, TotalStorage} from "@/components";

const HomePage = () => {
  return (
    <main className="bg-white md:m-10 m-0">
      <div className="flex justify-between gap-3 flex-col">
        <TotalStorage />
        <RecentFiles />
      </div>
    </main>
  )
}

export default HomePage