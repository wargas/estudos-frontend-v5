import { FaBars } from "react-icons/fa";
import { MdKeyboardArrowDown, MdMoreVert } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../Store";
import { Dropdown } from "../dropdown";

type Props = {
  toggle: () => void
}

export default function Header({ toggle }: Props) {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  return (
    <div className="fixed z-50 shadow px-5 top-0 left-0 right-0 h-14 flex justify-between bg-header-bg text-header-text">
      <div className="flex items-center">
        <button onClick={() => toggle()} className="rounded-full w-8 h-8 items-center justify-center flex">
          <FaBars />
        </button>
      </div>
      <div className="flex items-center">

        {user && (
          <Dropdown position="right" items={[
            { label: 'Sair', icon: '', action: () => navigate("/login") },
            { label: 'Alterar Senha', icon: '', action: () => { } }
          ]}>
            <button
              className="hover:bg-gray-800 flex gap-2 items-center text-gray-200 px-3"
            >
              {user.name} <MdKeyboardArrowDown />
            </button>
          </Dropdown>


        )}

      </div>
    </div>
  );
}
