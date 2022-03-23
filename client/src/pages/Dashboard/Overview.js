import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { StatsContainer, Loading } from "../../components";

const Overview = () => {
  const { showStats, isLoading } = useAppContext();

  useEffect(() => {
    showStats();
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  return <StatsContainer />;
};

export default Overview;
