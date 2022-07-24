import 'chart.js/auto'
import { DateTime, Duration } from 'luxon';
import { Bar, Chart, Line } from "react-chartjs-2";

type Props = {
    data: DashItem[]
}

export default function TempoChart({data}: Props) {
    return <div className='bg-white rounded shadow -p-5 relative'>
        <h1 className='absolute top-5 left-5 uppercase text-gray-400 font-bold'>Tempo - Últimos 15 dias</h1>
        <Chart type='bar' options={{
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
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const tempo = Duration.fromObject({seconds: context.raw as number}).toFormat('hh:mm')
                            return tempo
                        }
                    }
                }
            }
        }}  height={'80px'} data={{
            labels: data.map(d => DateTime.fromISO(d.day).toFormat('dd/MM')),
            datasets: [
                {
                    label: 'Tempo',
                    data: data.map(d => d.tempo),
                    backgroundColor: '#1f2937',
                    // borderColor: '#1f2937'
                    // pointBackgroundColor: '#1f2937',
                    // tension: 0.3,
                    // borderWidth: 3
                },
                // {
                //     label: 'Meta (4h)',
                //     data: data.map(d => 14400),
                //     borderColor: '#030508',
                //     borderDash: [1, 10],
                //     pointBackgroundColor: 'transparent',
                //     fill: false,
                //     pointBorderWidth: 0,
                //     tension: 0.3,
                //     borderWidth: 1,
                // }
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
  