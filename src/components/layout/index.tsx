import { useEffect, useState } from "react";
import {
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AUTH_TOKEN_KEY } from "../../constants";
import Api from "../../libs/Api";
import { useAuthStore } from "../../Store";
import PageLoading from "../page-loading";
import Header from "./Header";
import Sidebar from "./Sidebar";

import { toast } from "react-toastify";

export default function Layout() {
  const setUser = useAuthStore(({ setUser }) => setUser);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const interceptor = Api.interceptors.response.use((value) => {
      
      return value
    }, error => {
      console.log(error)
      
      return Error(error)
    })

    verifyLogin();

    return () => {
      Api.interceptors.response.eject(interceptor)
    }
  }, []);

  async function verifyLogin() {
    setLoading(true);

    const token = localStorage.getItem(AUTH_TOKEN_KEY);

    if (token) {
      try {
        const { data } = await Api.get("me");

                setUser(data);
      } catch (error) {
        navigate(`/login?dest=${location.pathname}`);
      }
    } else {
      navigate(`/login?dest=${location.pathname}`);
    }
    setLoading(false);
  }

  if (loading) return <PageLoading />;

  return (
    <div className=" text-gray-700 bg-gray-50 h-screen">
      <Header />
      <Sidebar />
      <main className="pl-0 laptop:pl-[280px] desktop:pl-[350px] transition-all pt-16 h-screen overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
