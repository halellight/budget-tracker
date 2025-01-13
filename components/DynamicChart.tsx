'use client'

import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import type { ChartData } from '@/types/budget'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface DynamicChartProps {
  data: ChartData
  title: string
}

export default function DynamicChart({ data, title }: DynamicChartProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-[400px] flex items-center justify-center text-foreground" aria-live="polite">Loading chart...</div>
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'hsl(var(--foreground))',
        },
      },
      title: {
        display: true,
        text: title,
        color: 'hsl(var(--primary))',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'hsl(var(--foreground))',
        },
        grid: {
          color: 'hsl(var(--border))',
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: 'hsl(var(--foreground))',
          callback: (value: number) => {
            return new Intl.NumberFormat('en-NG', {
              style: 'currency',
              currency: 'NGN',
              notation: 'compact',
              compactDisplay: 'short',
            }).format(value)
          },
        },
        grid: {
          color: 'hsl(var(--border))',
        },
      },
    },
  }

  return (
    <div role="img" aria-label={`Bar chart showing ${title}`}>
      <Bar options={options} data={data} />
    </div>
  )
}

