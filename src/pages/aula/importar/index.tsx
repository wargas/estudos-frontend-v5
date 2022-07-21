import { useState } from "react";
import Importar from "./Importar";
import Prepare from "./Prepare";

export default function ImportarPage() {
  const [questoes, setQuestoes] = useState([]);

  return (
    <div className="bg-white shadow rounded mb-10">
      {questoes.length === 0 ? (
        <Prepare onChange={setQuestoes} />
      ) : (
        <Importar questoes={questoes} />
      )}
    </div>
  );
}
