import react from "react";
import {RecentFiles, TotalStorage} from "@/components";

const HomePage = () => {
  return (
    <main className="bg-white m-10">
      <div className="flex justify-between gap-3 md:flex-row flex-col">
        <TotalStorage />
        <RecentFiles />
      </div>
    </main>
  )
}

export default HomePage