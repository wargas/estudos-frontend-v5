import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../Store";

export default function Header() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  return (
    <div className="fixed z-10 shadow px-5 top-0 left-0 right-0 h-16 flex justify-between border-b border-gray-100 bg-gray-700 text-white">
      <div></div>
      <div>
        {user && (
          <button
            onClick={() => navigate("/login")}
            className="h-16 hover:bg-gray-800 text-gray-200 px-3"
          >
            {user.name}
          </button>
        )}
      </div>
    </div>
  );
}
