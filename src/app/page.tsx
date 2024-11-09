import Toolbar from "./components/Toolbar";
import InspectionBtn from "./components/InspectionBtn";

import HistoryTable from "./components/HistoryTable";

export default function Home() {
  return (
    <div className="py-10 px-4">
      <div className="flex flex-col gap-6">
        <div className="self-end">
          <InspectionBtn />
        </div>
        <div>
          <Toolbar />
        </div>
        <div>
          <HistoryTable />
        </div>
      </div>
    </div>
  );
}
