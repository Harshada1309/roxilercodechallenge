import { Statistic, message } from 'antd'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Bar, Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS } from "chart.js/auto";
import './Stats.css'

export default function Stats({ month, monthText }) {
    let [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    
    
    const getData = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`https://roxiler-pvpf.onrender.com/combined-data?month=${month}`);
            setLoading(false);
            setData(res.data);
            message.success('Data loaded successfully');
        } catch (error) {
            console.log(error);
            message.error('Error loading data');
        }
    }

    useEffect(() => {
        getData();
        return () => {
            setData(null);
        }
    }, [month])

    return (
        <>
        <div className="container1">
            <h2>Stats for {monthText} </h2>

            <div className='div1'>

                <div className='div1in' >
                    <Totals stats={data?.statsData} loading={loading} />
                    
                </div>
                <div className="charts-container">
                {data && <BarChart data={data?.barChartData} />}
                {data && <PieChart data={data?.pieChartData} />}
                </div>
            </div>
            </div>
        </>
    )
}

function Totals({ stats, loading }) {
    return (
        <div className='stats'>
            <Statistic
                valueStyle={{ fontSize: '32px' }}
                title="Total Sale"
                value={stats?.totalSale}
                loading={loading}
                prefix="₹"
            />

            <Statistic
                valueStyle={{ fontSize: '32px' }}
                title="Total Sold Items"
                value={stats?.soldCount}
                loading={loading}
            />
            <Statistic
                valueStyle={{ fontSize: '32px' }}
                title="Total Unsold Items"
                value={stats?.unsoldCount}
                loading={loading}
            />
        </div>
    )
}

function BarChart({ data }) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            }
        },
        scales: {
            x: {
                stacked: true,
                title: {
                    display: true,
                    text: 'Price Range'
                }
            },
            y: {
                stacked: true,
                title: {
                    display: true,
                    text: 'Product Count'
                },
                ticks: {
                    stepSize: 4
                }
            }
        },
        aspectRatio: 1.6,
        plugins: {
            title: {
                display: true,
                text: 'No of products per price range'
            },
        },


    };

    let labels = Object.keys(data);
    let values = Object.values(data);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'No of products per price range',
                data: values,
                backgroundColor: [
                    '#CF9FFF' //rgba(0, 105, 100, 0.7)
                ]
            }
        ]
    }

    return (
        <Bar className='bar'
            data={chartData}
            options={options}
            
        />
    )
}

function PieChart({ data }) {
    let labels = Object.keys(data);
    let values = Object.values(data);

    const chartData = {
        labels,
        datasets: [
            {
                label: '# of Products',
                data: values,
                backgroundColor: [
                    '#FFDFD3', 
                    '#B565A7', 
                    '#7E668C', 
                    '#C792EA', 
                    '#9C89B8', 
                ],
            }
        ]
    }
    return (
        <Doughnut className='doughunt' data={chartData}/>
    )
}