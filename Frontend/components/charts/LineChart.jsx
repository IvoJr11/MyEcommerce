import { useEffect, useRef, useState } from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement as Pointer,
  Filler
} from 'chart.js'
import { formatDate } from "../../services/DateFormater"

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Pointer,
  Filler
)

export default function LineChart(props) {
  const dates = {
    debit: [],
    credit: [],
    all: []
  }
  const amounts = {
    debit: [],
    credit: []
  }
  const { transactions, color, lineColor } = props
  const [data, setData] = useState({datasets: []})
  const [options, setOptions] = useState({})
  
  const chartRef = useRef(null)
  
  useEffect(() => {
    transactions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).forEach(transaction => {
      if(transaction.type === 'DEBIT') {
        dates.debit.push(formatDate(transaction.date).dayAndMonth)
        amounts.debit.push(transaction.amount)
      }
      if(transaction.type === 'CREDIT') {
        dates.credit.push(formatDate(transaction.date).dayAndMonth)
        amounts.credit.push(transaction.amount)
      }
      dates.all.push(formatDate(transaction.date).dayAndMonth)
    })
    
    const chart = chartRef.current
    if(!chart) {
      return
    }
    
    function createGradient() {
      const gradient = chart.ctx.createLinearGradient(0, 0, 0, 500)
      gradient.addColorStop(0, color)
      gradient.addColorStop(0.35, "rgba(255,255,255,0.6)")
      gradient.addColorStop(1, "rgba(255,255,255,0.6)")
      return gradient
    }
    
    setData({
      labels: dates.credit,
      datasets: [{
        data: amounts.credit,
        borderColor: lineColor,
        pointStyle: false,
        backgroundColor: createGradient(),
        // backgroundColor: '#F16F6F',
        fill: true,
        tension: 0.4
      },
      // {
      //   data: amounts.debit,
      //   borderColor: '#6C3FFD',
      //   pointStyle: false,
      //   backgroundColor: createGradient('#6C3FFD'),
      //   fill: true,
      //   tension: 0.4
      // }
    ]
    })
    setOptions({
      plugins: {
        legend: false
      },
      responsive: true,
      scales: {
        x: {
          grid: {
            display: false
          },
          border: {
            display: false
          },
          ticks : {
            display: false
          }
        },
        y: {
          grid: {
            display: false
          },
          border: {
            display: false
          },
          ticks : {
            display: false
          },
        },
      },
    })
  }, [transactions])
  
  return(
    <div>
      <Line data={data} options={options} ref={chartRef} />
    </div>
  )
}