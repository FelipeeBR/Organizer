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

export const tasks = [
  {
    id: 5,
    title: "testing with passwords",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora consectetur sint molestiae accusantium aliquam, non nam voluptas.",
    completed: false,
    important: true,
    date: new Date().toLocaleDateString(),
  },
  {
    id: 6,
    title: "another task that makes object",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    completed: false,
    important: false,
    date: new Date().toLocaleDateString(),
  },
  {
    id: 7,
    title: "home work tomorow",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora consectetur sint molestiae accusantium aliquam, non nam voluptas. Sit quas molestiae vel incidunt dicta, nisi odit, quam explicabo consectetur in nam!",
    completed: true,
    important: false,
    date: new Date().toLocaleDateString(),
  },
  {
    id: 8,
    title: "create full stack projects",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. ",
    completed: false,
    important: true,
    date: new Date().toLocaleDateString(),
  },
  {
    id: 9,
    title: "learn react basics",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora consectetur sint molestiae accusantium aliquam, non nam voluptas. Sit quas molestiae vel incidunt dicta, nisi odit, quam explicabo consectetur in nam!",
    completed: true,
    important: true,
    date: new Date().toLocaleDateString(),
  },
];

export default links;