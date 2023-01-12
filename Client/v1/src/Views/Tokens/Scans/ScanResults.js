import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Scans of the last 7 days',
        },
    },
};
const ScanResults = ({ Scans }) => {

    //reverse order of Scans.scansThisWeek
    let reversedScans = {};
    Object.keys(Scans.scansThisWeek).reverse().forEach(function (key) {
        reversedScans[key] = Scans.scansThisWeek[key];
    });
    Scans.scansThisWeek = reversedScans;

    const labels = Object.keys(Scans.scansThisWeek).map((scan) => {
        return scan
    });
    const data = {
        labels,
        datasets: [
            {
                label: 'Scans',
                data: Object.values(Scans.scansThisWeek).map((scan) => {
                    return scan
                }),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },

        ],
    };

    console.log(labels.map(() => 50 + Math.round(Math.random() * 20)))
    return (
        <div className="ScanResults">
            <h3>Scan Results</h3>
            <div className="ScanResults-Totals">
                <div className="ScanResults-Totals-Item">
                    <h4>{Scans.totalScans}</h4>
                    <h4>Total Scans</h4>
                </div>
                <div className="ScanResults-Totals-Item">
                    <h4>{Scans.totalScansToday}</h4>
                    <h4>Today</h4>
                </div>
                <div className="ScanResults-Totals-Item">
                    <h4>{Scans.totalScansThisMonth}</h4>
                    <h4>This Month</h4>
                </div>
                <div className="ScanResults-Totals-Item">
                    <h4>{Scans.totalScansThisYear}</h4>
                    <h4>This Year</h4>
                </div>
            </div>
            <div className="ScanResults-Chart">
                <Bar data={data} options={options} />
            </div>
            <div className="ScanResults-Tops">
                <div className="ScanResults-Top">
                    <h4>Top Countries</h4>
                    <div className="ScanResults-Tops-List">
                        {Object.keys(Scans.topCountries).map((country) => {
                            return (
                                <div className="ScanResults-TopCountries-Item" key={country}>
                                    <h4>{country}</h4>
                                    <h4>{Scans.topCountries[country]}</h4>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="ScanResults-Top">
                    <h4>Top Browsers</h4>
                    <div className="ScanResults-Tops-List">
                        {Object.keys(Scans.topBrowsers).map((browser) => {
                            return (
                                <div className="ScanResults-TopBrowsers-Item" key={browser}>
                                    <h4>{browser}</h4>
                                    <h4>{Scans.topBrowsers[browser]}</h4>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="ScanResults-Top">
                    <h4>Top Devices</h4>
                    <div className="ScanResults-Tops-List">
                        {Object.keys(Scans.topDevices).map((device) => {
                            return (
                                <div className="ScanResults-TopDevices-Item" key={device}>
                                    <h4>{device}</h4>
                                    <h4>{Scans.topDevices[device]}</h4>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="ScanResults-Top">
                    <h4>Top OS</h4>
                    <div className="ScanResults-Tops-List">
                        {Object.keys(Scans.topOs).map((os) => {
                            return (
                                <div className="ScanResults-TopOS-Item" key={os}>
                                    <h4>{os}</h4>
                                    <h4>{Scans.topOs[os]}</h4>
                                </div>
                            )
                        })}
                    </div>
                </div>




            </div>
        </div>
    )
}

export default ScanResults