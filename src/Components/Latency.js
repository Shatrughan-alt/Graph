import React, { useState, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Latency = () => {
    const [timeFrame, setTimeFrame] = useState('3hrs');

    
    const generateLabels = (hours, intervalHours) => {
        const labels = [];
        const now = new Date();
        const timeZone = 'Asia/Kolkata'; // IST timezone
        for (let i = hours; i >= 0; i -= intervalHours) {
            const pastTime = new Date(now.getTime() - i * 60 * 60 * 1000); // Convert hours to milliseconds
            const options = { hour: '2-digit', minute: '2-digit', timeZone };
            const timeString = pastTime.toLocaleTimeString([], options);
            labels.push(timeString);
        }
        return labels;
    };


    const generateDayLabels = (startDaysAgo, endDaysAgo = 0) => {
        const labels = [];
        const now = new Date();
        const timeZone = 'Asia/Kolkata'; 

        // Start time: startDaysAgo days ago
        const startTime = new Date(now.getTime() - startDaysAgo * 24 * 60 * 60 * 1000);

        // End time: endDaysAgo days ago (default to today)
        const endTime = new Date(now.getTime() - endDaysAgo * 24 * 60 * 60 * 1000);

        for (let time = startTime; time <= endTime; time = new Date(time.getTime() + 24 * 60 * 60 * 1000)) {
            const options = { year: 'numeric', month: 'short', day: 'numeric', timeZone };
            const dateString = time.toLocaleDateString([], options);
            labels.push(dateString);
        }

        return labels;
    };

   
    const generateRandomData = (numPoints) => {
        return Array.from({ length: numPoints }, () => Math.floor(Math.random() * 100));
    };

    const data = useMemo(() => ({
        '3hrs': {
            labels: generateLabels(3, 1 / 3), // 3 hours with a 20-minute interval
            datasets: [
                {
                    label: 'Temperature (°C)',
                    data: generateRandomData(10), 
                    borderColor: '#007bff', 
                    borderWidth: 2,
                },
            ],
        },
        '24hrs': {
            labels: generateLabels(24, 1), 
            datasets: [
                {
                    label: 'Temperature (°C)',
                    data: generateRandomData(24), 
                    borderColor: '#007bff', 
                    borderWidth: 2,
                },
            ],
        },
        '7days': {
            labels: generateDayLabels(7), 
            datasets: [
                {
                    label: 'Temperature (°C)',
                    data: generateRandomData(8), 
                    borderColor: '#007bff', 
                    borderWidth: 2,
                },
            ],
        },
        '30days': {
            labels: generateDayLabels(30), 
            datasets: [
                {
                    label: 'Temperature (°C)',
                    data: generateRandomData(31), 
                    borderColor: '#007bff', 
                    borderWidth: 2,
                },
            ],
        },
    }), []);

    return (
        <div>
            <div className="la-chart-container">
            <br /><br />
                <h2>Latency Sensor Graph</h2>
                <div className='btn'>
                    <button onClick={() => setTimeFrame('3hrs')}>Last 3hrs</button>
                    <button onClick={() => setTimeFrame('24hrs')}>Last 24hrs</button>
                    <button onClick={() => setTimeFrame('7days')}>Last 7days</button>
                    <button onClick={() => setTimeFrame('30days')}>Last 30days</button>
                </div>
                <Line data={data[timeFrame]} />
            </div>

        </div>
    );
};

export default Latency;
