import { useState } from "react";
import Importar from "@app/pages/aula/importar/Importar";
import Prepare from "@app/pages/aula/importar/Prepare";

export default function ImportarPage() {
  const [questoes, setQuestoes] = useState<any[]>([]);

  return (
    <div className="bg-white shadow rounded mb-10">
      <Prepare onChange={(data) => setQuestoes(old => [...old, ...data])} />
      {questoes?.length > 0 && (
        <Importar onClear={() => setQuestoes([])} questoes={questoes} />
      )}
    </div>
  );
}
