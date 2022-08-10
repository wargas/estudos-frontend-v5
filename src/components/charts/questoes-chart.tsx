import 'chart.js/auto'
import { DateTime } from 'luxon';
import { Bar, Chart, Line } from "react-chartjs-2";

import { eachDayOfInterval, subDays, format } from 'date-fns'

type Props = {
    data: DashItem[]
}

export default function QuestoesChart({data: _data}: Props) {


    const data = eachDayOfInterval({
        start: subDays(new Date(), 14),
        end: new Date()
    }).map(day => {
        const current = _data.find(d => d.day === format(day, 'yyyy-MM-dd'))

        if(current) {
            return current;
        }

        return {
            day: format(day, 'yyyy-MM-dd'),
            tempo: 0,
            questoes: {total: 0, acertos: 0}
        }
    })

    return <div className='bg-white rounded shadow -p-5 relative'>
        <h1 className='absolute top-5 left-5 uppercase text-gray-400 font-bold'>Questões - Últimos 15 dias</h1>
        <Chart type='line' options={{
            responsive: true,
            scales: {
                xAxes: {
                    display: 'auto',
                    
                    grid: {
                        display: false
                    }
                },
                yAxes: {
                    display: false
                }
            }
        }}  height={'80px'} data={{
            labels: data.map(d => DateTime.fromISO(d.day).toFormat('dd/MM')),
            datasets: [
                {
                    label: 'Total',
                    data: data.map(d => d.questoes.total),
                    borderColor: '#1f2937',
                    pointBackgroundColor: '#1f2937',
                    tension: 0.3,
                    fill: false,
                    borderWidth: 3
                },
                {
                    label: 'Acertos',
                    data: data.map(d => d.questoes.acertos),
                    borderColor: '#030508',
                    pointBackgroundColor: '#030508',
                    tension: 0.3,
                    borderWidth: 1
                },
                {
                    label: 'Meta (300)',
                    data: data.map(d => 200),
                    borderColor: '#030508',
                    borderDash: [1, 10],
                    pointBackgroundColor: 'transparent',
                    fill: false,
                    pointBorderWidth: 0,
                    tension: 0.3,
                    borderWidth: 1,
                }
            ]
        }} />
    </div>
}

type DashItem = {
    day: string;
    tempo: number;
    questoes: {
      total: number;
      acertos: number;
    };
  };
  