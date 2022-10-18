import { AxiosResponse } from "axios";
import { DateTime, Duration } from "luxon";
import React, { useEffect, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { FaCheck, FaClock, FaPause, FaPlay } from "react-icons/fa";
import { toast } from "react-toastify";
import Api from "../../libs/Api";

export function Relogio({ aula }: any) {
  const [play, setPlay] = useState(false);
  const [secounds, setSeconds] = useState(0);
  const [registro, setRegistro] = useState<any>();
  const [loading, setLoading] = useState(false);

  const [start, setStart] = useState(0);

  useEffect(() => {
    if (aula) {
      setRegistro({
        aula_id: aula.id,
        disciplina_id: aula.disciplina_id,
        tempo: 0,
        horario: "",
      });
    }
  }, [aula.id]);

  useEffect(() => {
    let interval = setInterval(() => {}, 1000);
    if (play) {
      interval = setInterval(() => {
        if (start > 0) {
          const current = DateTime.local().toSeconds();
          setSeconds((old) => current - start);
        } else {
          setSeconds((old) => old + 1);
        }
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [play, secounds]);

  useEffect(() => {
    if (play) {
      setStart(DateTime.local().toSeconds() - secounds);
    } else {
      setStart(0);
    }
  }, [play]);

  useEffect(() => {
    if (secounds > 0 && Math.floor(secounds) % 25 === 0) {
      handleSave();
    }
  }, [secounds]);

  const handleSave = () => {
    setLoading(true);
    let request: Promise<AxiosResponse<any>>;
    let data = { tempo: secounds, ...registro };
    data.tempo = Math.floor(secounds);

    if (registro?.id) {
      request = Api.put<any, AxiosResponse<any>>(
        `registros/${registro.id}`,
        data
      );
    } else {
      request = Api.post<any, AxiosResponse<any>>(`registros`, data);
    }

    request
      .then(({ data }) => {
        setRegistro(data);
      })
      .catch((error) => {
        toast.error("erro ao atualizar tempo estudado", {
          toastId: "errorUpdateTime",
        });
      });

    request.finally(() => setLoading(false));
  };

  return (
    <React.Fragment>
      <div  className="_wrapper text-white bg-primary-700  flex items-center h-10  rounded-full px-5">
        <div>
          <FaClock className="_icon-clock" />
        </div>
        <div className="_tempo-wapper flex">
          <h3 className="_tempo p-0 m-0 fontb-bold w-32 text-center text-2xl">
            {Duration.fromObject({ seconds: secounds }).toFormat("hh:mm:ss")}
          </h3>
        </div>
        <div  className="_actions flex gap-3">
          <button onClick={() => setPlay(!play)} className="_actions-btn btn">
            {play && <FaPause />}
            {!play && <FaPlay />}
          </button>
          <button onClick={handleSave} className="_actions-btn btn">
            {!loading && <FaCheck />}
            {loading && <BiLoaderAlt className="_actions-btn-animate animate-spin " />}
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}
