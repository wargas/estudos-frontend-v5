import { Link, NavLink } from "react-router-dom";
import { IconType } from "react-icons";
import { MdDashboard } from "react-icons/md";
import {
  FaDatabase,
  FaListUl,
  FaUserAlt,
  FaQuestion,
  FaChartBar,
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="fixed transition-all  bottom-0 top-0 left-[-280px] w-[280px] laptop:left-0 desktop:w-[350px] bg-white shadow-lg">
      <div className="h-screen flex flex-col border-gray-100">
        <div className="h-16 border-b border-gray-100 bg-gray-700">
          <Link
            to="/dashboard"
            className="flex items-center h-16 justify-center text-white"
          >
            <span className="text-4xl font-bold">ESTUDOS</span>
          </Link>
        </div>
        <div className="flex-1 pt-5">
          <ul className="flex flex-col divide-y divide-gray-50">
            <MenuItem Icon={MdDashboard} label="Dashboard" to="/dashboard" />
            <MenuItem Icon={FaListUl} label="Disciplinas" to="/disciplinas" />
            <MenuItem Icon={FaUserAlt} label="Perfil" to="/perfil" />
            <MenuItem Icon={FaQuestion} label="Simulados" to="/simulados" />
            <MenuItem
              Icon={FaChartBar}
              label="Estatísticas"
              to="/estatisticas"
            />
          </ul>
        </div>
        <div className="h-14 border-t flex items-center justify-center">
            <span className="text-sm text-gray-400">VERSAO: 4.0.1</span>
        </div>
      </div>
    </div>
  );
}

type MenuItemProps = {
  label: string;
  to: string;
  Icon: IconType;
};

export function MenuItem({ label, to, Icon }: MenuItemProps) {
  return (
    <li className="flex">
      <NavLink
        className={({ isActive }) =>
          `h-14 flex items-center gap-2 border-r-4 transition-all ${
            isActive ? "bg-gray-50 text-gray-800" : "text-gray-500 border-transparent"
          } hover:bg-gray-50 px-3  w-full`
        }
        to={to}
      >
        <Icon />
        <span>{label}</span>
      </NavLink>
    </li>
  );
}
