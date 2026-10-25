import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import './BudgetChart.css';

// Register Chart.js required components
ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * BudgetChart — Visualizes expense allocation using a Chart.js Pie Chart.
 *
 * Props:
 *   budget (object) - { transport, accommodation, food, activities, miscellaneous, total }
 */
function BudgetChart({ budget = {} }) {
  const categories = [
    { label: 'Transport', value: budget.transport || 0, color: '#4A90D9' },
    { label: 'Accommodation', value: budget.accommodation || 0, color: '#F5A623' },
    { label: 'Food & Dining', value: budget.food || 0, color: '#7BC67E' },
    { label: 'Activities', value: budget.activities || 0, color: '#E86B6B' },
    { label: 'Miscellaneous', value: budget.miscellaneous || 0, color: '#9B59B6' }
  ];

  const data = {
    labels: categories.map((c) => c.label),
    datasets: [
      {
        data: categories.map((c) => c.value),
        backgroundColor: categories.map((c) => c.color),
        borderColor: '#FFFFFF',
        borderWidth: 2,
        hoverOffset: 6
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            family: 'Inter, sans-serif',
            size: 12
          },
          padding: 16,
          boxWidth: 14,
          usePointStyle: true
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const val = context.parsed || 0;
            const total = budget.total || categories.reduce((sum, c) => sum + c.value, 0);
            const percentage = total > 0 ? Math.round((val / total) * 100) : 0;
            return ` ₹${val.toLocaleString('en-IN')} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="budget-chart-container">
      <div className="chart-wrapper">
        <Pie data={data} options={options} />
      </div>

      <div className="budget-summary-list">
        {categories.map((c, i) => (
          <div key={i} className="summary-row">
            <span className="color-dot" style={{ backgroundColor: c.color }} />
            <span className="summary-label">{c.label}</span>
            <span className="summary-val">₹{c.value.toLocaleString('en-IN')}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BudgetChart;
