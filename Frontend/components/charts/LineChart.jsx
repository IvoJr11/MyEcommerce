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
  const dates = []
  const amounts = []
  const {transactions} = props
  const [data, setData] = useState({datasets: []})
  const [options, setOptions] = useState({})
  
  const chartRef = useRef(null)
  
  useEffect(() => {
    transactions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).forEach(transaction => {
      dates.push(formatDate(transaction.date).dayAndMonth)
      if(transaction.type === 'DEBIT') amounts.push(transaction.amount * (-1))
      if(transaction.type === 'CREDIT') amounts.push(transaction.amount)
      // amounts.push(transaction.amount)
    })
    
    const chart = chartRef.current
    if(!chart) {
      return
    }
    
    function createGradient(color) {
      const gradient = chart.ctx.createLinearGradient(0, 0, 0, 500)
      gradient.addColorStop(0, color)
      gradient.addColorStop(0.5, "rgba(255,255,255,0.6)")
      gradient.addColorStop(1, "rgba(255,255,255,0.6)")
      return gradient
    }
    
    setData({
      labels: dates,
      datasets: [{
        data: amounts,
        borderColor: 'red',
        pointStyle: false,
        backgroundColor: createGradient('#F16F6F'),
        fill: true,
        tension: 0.4
      }]
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
    <div style={{width: '100%'}}>
      <Line data={data} options={options} ref={chartRef} />
    </div>
  )
}