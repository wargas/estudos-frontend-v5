import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../Store";

type Props = {
  toggle: () => void
}

export default function Header({toggle}: Props) {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  return (
    <div className="fixed z-50 shadow px-5 top-0 left-0 right-0 h-14 flex justify-between bg-header-bg text-header-text">
      <div className="flex items-center">
        <button onClick={() => toggle()} className="rounded-full w-8 h-8 items-center justify-center flex">
          <FaBars />
        </button>
      </div>
      <div>
        {user && (
          <button
            onClick={() => navigate("/login")}
            className="h-14 hover:bg-gray-800 text-gray-200 px-3"
          >
            {user.name}
          </button>
        )}
      </div>
    </div>
  );
}
