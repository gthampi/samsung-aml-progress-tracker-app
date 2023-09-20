import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
// import { Chart } from "react-google-charts";
import { Doughnut } from 'react-chartjs-2';


Chart.register(...registerables);

const SummaryComponent = ({ userId }) => {
  const [summaryData, setSummaryData] = useState({
    labels: [],
    datasets: [
      {
        label: 'TQDM Summary',
        data: [],
        backgroundColor: ['#9FE3B5', '#F06549'],
      },
    ],
  });

  useEffect(() => {
    axios
      .get(`/tqdm/${userId}`)
      .then((response) => {
        const responseData = response.data; // Full API response

        if (responseData && responseData.records) {
          const records = responseData.records;

          // Count occurrences of each status
          const statusCounts = records.reduce((counts, record) => {
            counts[record.status] = (counts[record.status] || 0) + 1;
            return counts;
          }, {});

          const labels = Object.keys(statusCounts);
          const counts = Object.values(statusCounts);

          setSummaryData({
            ...summaryData,
            labels: labels,
            datasets: [{ ...summaryData.datasets[0], data: counts }],
          });
        } else {
          console.error('Invalid API response format:', responseData);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [userId]);

  return (
    <div>
      {/* <Pie data={summaryData} /> */}
      <Doughnut data={summaryData} />
    </div>
  );
};

export default SummaryComponent;
