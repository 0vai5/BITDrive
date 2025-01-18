import react from "react";
import {RecentFiles, TotalStorage} from "@/components";

const HomePage = () => {
  return (
    <main className="bg-white">
      <div className="flex justify-center gap-3 items-center md:flex-row flex-col">
        <RecentFiles />
        <TotalStorage />
      </div>
    </main>
  )
}

export default HomePage