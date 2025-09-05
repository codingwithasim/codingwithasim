import Essentials from "@/components/sections/uses/Essentials";
import Meta from "@/components/sections/uses/Meta";
import Toolkit from "@/components/sections/uses/Toolkit";
import Workflow from "@/components/sections/uses/Workflow";
import Learning from "@/components/sections/uses/Learning";
import UsesHeader from "@/components/sections/uses/UsesHeader";

export default function Uses() {
  

  return (
    <div className="min-h-screen mx-auto flex flex-col gap-4 px-4 bg-black">
      <UsesHeader/>

      <Essentials/>

      <Toolkit/>

      <Workflow/>

      <Learning/>

      <Meta/>

    </div>
  );
}