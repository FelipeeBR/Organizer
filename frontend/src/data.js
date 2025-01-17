import { FaHome, FaCheck, FaRegCalendarAlt, FaBookOpen, FaBook } from "react-icons/fa";

const links = [
  { id: 1, url: "/", text: "Início", icon: <FaHome /> },
  {
    id: 2,
    url: "/disciplinas",
    text: "disciplinas",
    icon: <FaBookOpen className="text-2xl" />,
  },
  {
    id: 3,
    url: "/anotacoes",
    text: "anotações",
    icon: <FaBook className="text-2xl" />,
  },
  {
    id: 4,
    url: "/concluidos",
    text: "concluídos",
    icon: <FaCheck className="text-2xl" />,
  },
  {
    id: 5,
    url: "/agenda",
    text: "agenda",
    icon: <FaRegCalendarAlt className="text-2xl" />,
  },
];
export default links;