import React from 'react';
import ReactEcharts from "echarts-for-react";
import { useSelector } from 'react-redux';
import "./graph.css"


const Insights = () => {

  const { bills } = useSelector((state) => state.bills);
 
  const monthAmountData = bills.map(bill => {
    const month = new Date(bill.date).getMonth();
    return {
      month,
      amount: bill.amount
    }
  });

  monthAmountData.sort((a, b) => a.month - b.month);
  const amountData = monthAmountData.map(data => data.amount);

  const options = {
    xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']   
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: amountData,
        type: 'line'
    }]
};



  return (
    <>
    <div className='insights-heading'>
      <h4>Monthly Bills</h4>
    </div>
    <ReactEcharts
      option={options}
      style={{ height: "50vh", marginTop: "2rem" }}
    />
    </>
  );
}

export default Insights