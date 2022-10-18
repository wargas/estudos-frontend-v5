import { Link, NavLink } from "react-router-dom";
import { IconType } from "react-icons";
import { MdDashboard } from "react-icons/md";
import {
  FaDatabase,
  FaListUl,
  FaUserAlt,
  FaQuestion,
  FaChartBar,
  FaChevronCircleRight,
  FaChevronRight,
} from "react-icons/fa";
import { useState } from "react";
import { Menu } from "@headlessui/react";
import { useQuery } from "react-query";
import Api from "@app/libs/Api";
import { Disciplina } from "@app/interfaces/Disciplina";

type Props = {
  opened: boolean,
  toggle: () => void
}

export default function Sidebar({ opened, toggle }: Props) {

  const { data } = useQuery(['disciplinas'], async () => {
    const { data: _data } = await Api.get<Disciplina[]>(`disciplinas`);

    return _data;
  })


  return (
    <>
      {opened && (

        <div
          onClick={() => toggle()}
          className="absolute inset-0 bg-black/30 z-50 cursor-pointer"></div>
      )}

      <div className={`${opened ? 'left-[0px]' : 'left-[-280px]'} fixed transition-all z-50  bottom-0 top-0  w-[280px] laptop:left-0 desktop:w-[350px] bg-white shadow-lg`}>
        <div className="h-screen flex flex-col border-gray-100">
          <div className="h-14 bg-header-bg">
            <Link
              to="/dashboard"
              className="flex items-center h-14 justify-center text-white"
            >
              <span className="text-4xl text-sp font-extrabold tracking-widest">ESTUDOS</span>
            </Link>
          </div>
          <div className="border-b">
            <ul className="pl-0">
              <MenuItem Icon={MdDashboard} label="Dashboard" to="/dashboard" />
              <MenuItem Icon={FaListUl} label="Disciplinas" to="/disciplinas" />
            </ul>
          </div>
          <div className="flex-1 overflow-auto bg-gray-50/25">
            <ul className="flex ml-0 pl-0 flex-col divide-y divide-gray-50">

              {data?.map(disciplina => (
                <MenuItem 
                  key={disciplina.id} 
                  Icon={FaChevronRight} 
                  label={disciplina.name} to={`/disciplinas/${disciplina.id}`} />
              ))}
              {/* <MenuItem Icon={FaUserAlt} label="Perfil" to="/perfil" />
              <MenuItem Icon={FaQuestion} label="Simulados" to="/simulados" />
              <MenuItem
                Icon={FaChartBar}
                label="Estatísticas"
                to="/estatisticas"
              /> */}
            </ul>

          </div>
          <div className="h-14 border-t flex items-center justify-center">
            <span className="text-sm text-gray-400">
              {import.meta.env.VERCEL_GIT_COMMIT_MESSAGE || ''}
            </span>
          </div>
        </div>
      </div>
    </>
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
          `h-14 flex items-center gap-2 border-l-4 transition-all ${isActive ? "bg-gray-50 text-gray-800" : "text-gray-500 border-transparent"
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
