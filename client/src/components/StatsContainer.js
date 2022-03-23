import Wrapper from "../assets/wrappers/StatsContainer";
import { useAppContext } from "../context/appContext";
import getDefaultStats from "../utils/DefaultStats";
import StatItem from "./StatItem";

const StatsContainer = () => {
  const { stats } = useAppContext();

  return (
    <Wrapper>
      {getDefaultStats(stats).map((item, index) => {
        return <StatItem key={index} {...item} />;
      })}
    </Wrapper>
  );
};

export default StatsContainer;
