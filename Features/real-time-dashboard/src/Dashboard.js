import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import mockWebSocket from './WebSocket/webSocket';
import './App.css';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'line', // Change chart type to line chart
      data: {
        labels: [],
        datasets: [{
          label: 'Real-Time Data',
          data: [],
          fill: false, // Remove fill below the line
          borderColor: 'rgba(255, 99, 132, 1)', // Red color for the line
          tension: 0.1 // Set tension for line curvature
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });

    const handleWebSocketMessage = (event) => {
      const newData = JSON.parse(event.data);
      setData(newData);
      updateChart(newData);
    };

    mockWebSocket.addEventListener('message', handleWebSocketMessage);

    return () => {
      mockWebSocket.removeEventListener('message', handleWebSocketMessage);
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  const updateChart = (newData) => {
    const labels = newData.map((_, index) => `Data ${index + 1}`);
    chartInstance.current.data.labels = labels;
    chartInstance.current.data.datasets[0].data = newData;
    chartInstance.current.update();
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Real-Time Data Visualization Dashboard</h1>
      <canvas ref={chartRef} id="dashboardChart" width="800" height="400"></canvas> {/* Increase canvas size */}
    </div>
  );
};

export default Dashboard;
