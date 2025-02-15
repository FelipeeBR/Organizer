import { FaHome, FaRegCalendarAlt, FaBookOpen, FaBook, FaBell, FaUserGraduate } from "react-icons/fa";

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
    url: "/desempenho",
    text: "desempenho",
    icon: <FaUserGraduate className="text-2xl" />,
  },
  {
    id: 5,
    url: "/agenda",
    text: "agenda",
    icon: <FaRegCalendarAlt className="text-2xl" />,
  },
  {
    id: 6,
    url: "/notificacoes",
    text: "Notificações",
    icon: <FaBell className="text-2xl" />,
  },
];
export default links;