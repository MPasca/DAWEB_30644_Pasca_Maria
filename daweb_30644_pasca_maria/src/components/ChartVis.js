import React, { useRef, useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';

export default function ChartVis ({byReservation, chosenLocation}) {
  const [stats, setStats] = useState();
  const [newStats, setNewStats] = useState([
    ['Month', 'Value'],
    ['January', 0],
    ['February', 0],
    ['March', 0],
    ['April', 0],
    ['May', 0],
    ['June', 0],
    ['July', 0],
    ['August', 0],
    ['September', 0],
    ['October', 0],
    ['November', 0],
    ['December', 0],
  ]);


  var values;
  var jwt = sessionStorage.getItem("jwt");


  useEffect(() => {
      fetch('http://localhost:8000/stats', {
          method: 'GET',
          mode: 'cors',
          headers:{
            "Content-Type":"application/json",
            "Authorization": `Bearer ${jwt}`
          }
      }).then(response => response.json())
          .then(stats => { setStats(stats); })
          .catch((error) => console.error('Error fetching stats:', error));
  }, []);

  useEffect(() => {
    if(stats) {
      values = stats.filter((stat) => stat.destination == chosenLocation);
      if(byReservation == true) {
        setNewStats(newStats.map((month, index) => {
          if (index > 0) { // Skip the header row
            return [month[0], values.filter((vals) => vals.date == month[0]).map((stat) => {return stat.totalReservations})[0] || 0];
          }
          return month;
        }));
      } else {
        setNewStats(newStats.map((month, index) => {
          if (index > 0) { // Skip the header row
            return [month[0], values.filter((vals) => vals.date == month[0]).map((stat) => {return stat.totalPeople})[0] || 0];
          }
          return month;
        }));
      }
      console.log(newStats);
    }
  }, [stats, chosenLocation, byReservation]);



  return (
    <div style={{width:"85%"}}>
      {newStats && <div className='py-10'>
        <Chart
            chartType="LineChart"
            data={newStats}
        />
      </div>}
    </div>
  );
}