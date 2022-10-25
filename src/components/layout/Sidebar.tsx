import { Link } from "react-router-dom";
import {
  FaListUl,
  FaChevronRight,
} from "react-icons/fa";
import { useQuery } from "react-query";
import { MdDashboard } from "react-icons/md";
import Api from "@app/libs/Api";
import { Disciplina } from "@app/interfaces/Disciplina";
import { MenuItem } from './MenuItem'

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

      <div className={`${opened ? 'left-[0px]' : 'left-[-280px]'} 
        fixed transition-all z-50  bottom-0 top-0  w-[280px] 
        laptop:left-0 desktop:w-[350px] 
        bg-white shadow-lg`}>
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
                  compact
                  key={disciplina.id}
                  Icon={FaChevronRight}
                  right={disciplina.meta.count_aulas+''}
                  label={disciplina.name} to={`/disciplinas/${disciplina.id}`} />
              ))}
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