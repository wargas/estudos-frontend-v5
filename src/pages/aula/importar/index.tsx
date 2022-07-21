import { useState } from "react";
import Importar from "./Importar";
import Prepare from "./Prepare";

export default function ImportarPage() {
  const [questoes, setQuestoes] = useState<any[]>([]);

  return (
    <div className="bg-white shadow rounded mb-10">
      <Prepare onChange={(data) => setQuestoes(old => [...old, ...data])} />
      {questoes?.length > 0 && (
        <Importar questoes={questoes} />
      )}
    </div>
  );
}
