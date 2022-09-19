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


export default function Layout() {
  const setUser = useAuthStore(({ setUser }) => setUser);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const [opened, setOpened] = useState(true)


  function toggle() {
    setOpened(curr => !curr);
  }

  useEffect(() => {

    const interceptor = Api.interceptors.response.use((value) => {
      
      return value
    }, error => {
      return Promise.reject(error)
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

  useEffect(() => {
    setOpened(false)
  }, [location.pathname])

  return (
    <div className=" text-gray-700 bg-gray-100 h-screen text-base desktop:text-lg">
      <Header toggle={toggle} />
      <Sidebar opened={opened} toggle={toggle} />
      <main id="main" style={{scrollbarWidth: 'none'}} className="pl-0 laptop:pl-[280px] desktop:pl-[350px] transition-all pt-14 h-screen overflow-y-auto">
        <PageLoading show={loading} />
        <Outlet />
      </main>
    </div>
  );
}
