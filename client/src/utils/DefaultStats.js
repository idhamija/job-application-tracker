import {
  FaQuestionCircle,
  FaCalendarCheck,
  FaWindowClose,
} from "react-icons/fa";

const getDefaultStats = (stats) => {
  const DefaultStats = [
    {
      title: "pending applications",
      count: stats.pending,
      icon: <FaQuestionCircle />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "interviews scheduled",
      count: stats.interview,
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "jobs declined",
      count: stats.declined,
      icon: <FaWindowClose />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];
  return DefaultStats;
};

export default getDefaultStats;
