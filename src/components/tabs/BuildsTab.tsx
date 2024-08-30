import { Build } from "../pages/Builds";

interface BuildsTabProps {
  builds: Build[];
}

const BuildsTab: React.FC<BuildsTabProps> = ({ builds }) => {
  return <div className="flex flex-wrap justify-center gap-4"></div>;
};

export default BuildsTab;
