import { DateTime, Duration } from "luxon";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import QuestoesChart from "@app/components/charts/questoes-chart";
import TempoChart from "@app/components/charts/tempo-chart";
import Api from "@app/libs/Api";

type DashItem = {
  day: string;
  tempo: number;
  positionTempo: number;
  positionQuestoes: number;
  questoes: {
    total: number;
    acertos: number;
  };
};

export default function DashboardPage() {

  const [hoje, setHoje] = useState<DashItem>()

  const { data: dashboardData } = useQuery<DashItem[]>(
    ["dashboard"],
    async () => {
      const { data } = await Api.get<DashItem[]>("relatorios/dashboard");

      return data;
    }
  );

  useEffect(() => {
    const _hoje = dashboardData?.find(({ day }) => DateTime.local().toSQLDate() === day)

    if (_hoje) {
      setHoje(_hoje)
    }

    
  }, [dashboardData])

  return (

    <div className="p-5 w-full max-w-screen-laptop mx-auto desktop::px-0">
{/* 
      <div className="mb-4">
        <Card>
          <Text>Tempo Estudado</Text>
          <Metric>15</Metric>
          <Flex>
            <Text>25%</Text>
            <Text>Meta: 4 horas</Text>
          </Flex>
          <ProgressBar percentageValue={32} />
        </Card>
      </div> */}
      
      <div className="flex gap-5">
        
        <div className="p-5 flex-1 bg-white rounded shadow">
          <span className="text-sm text-gray-400">Tempo</span>
          <div className="mt-3">
            <span className="text-6xl font-bold">{!hoje ? 0 : Duration.fromObject({ second: hoje.tempo }).toFormat("hh'h':mm''")}</span>
          </div>
        </div>
        <div className="p-5 flex-1 bg-white rounded shadow">
          <span className="text-sm text-gray-400">Questões</span>
          <div className="mt-3">
            <span className="text-6xl font-bold">{!hoje ? 0 : hoje.questoes.total}</span>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <TempoChart data={dashboardData || []} />
      </div>

      <div className="mt-5">
        <QuestoesChart data={dashboardData || []} />
      </div>
    </div>
  );
}
