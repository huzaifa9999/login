import React,{useRef,useState} from 'react';
import { useReactToPrint } from "react-to-print";
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler} from 'chart.js';
import "./Main.css";
ChartJS.register(
    Title, Tooltip, LineElement, Legend,
    CategoryScale, LinearScale, PointElement, Filler
  )
const Test = () => {  
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [data, setData]= useState({
    labels:["Jan","Feb", "March", "April", "May", "June", "July", "August", "September", "Oct", "Nov", "Dec"],
    datasets:[
      {
        label:"First Dataset",
        data:[10, 20, 30, 42, 51, 82, 31, 59, 61, 73, 91, 58],
      
        borderColor:'green',
        tension:0.2,
        fill:true,
        pointStyle:'rect',
        pointBorderColor:'blue',
        pointBackgroundColor:'#fff',
        showLine:true
      },
      {
        label:"Second Dataset",
        data:[14, 34, 43, 49, 32, 99, 34, 95, 54, 89, 65, 44],
      
        borderColor:'red',
        tension:.2,
        fill:true,
        pointStyle:'rect',
        pointBorderColor:'black',
        pointBackgroundColor:'#fff',
        showLine:true
      }
    ]
  })
  function refreshPage() {
    window.location.reload(false);
  }

  return (<>
 
        <div class="cont">
          <div className='btncnt'><button onClick={handlePrint} className="print__button">Print as PDF </button>
          <button onClick={refreshPage} >Logout </button>  </div>
          <div ref={componentRef} className="card">
          <div className="App" >
      <Line data={data}></Line>
     
    </div>
            
          </div>
        </div>
    
    </>     
  )
}
export default Test