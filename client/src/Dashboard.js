import React from 'react';
import TqdmTableComponent from './TqdmTableComponent.js';
import { useParams } from 'react-router-dom'; // Import useParams
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import './util/Dashboard.css'; // Import the CSS file
import SummaryComponent from './SummaryComponent.js';


const Dashboard = () => {
    const { userId } = useParams(); // Retrieve userId from URL parameters
    console.log('User ID:', userId);
    
    return (
        <div className="container">
            <div className="header">
                <img src={"/samsung-logo.jpeg"} alt="Logo" className="logo" />
                <h1 className="title">Applied Materials Lab</h1>
            </div>
            <div className='container bg-light'>
            <Tabs defaultActiveKey="dashboard" id="justify-tab-example" className="mb-3" justify>
                <Tab eventKey="dashboard" title="Dashboard">
                <div className="tab-content bg-light">
                    <TqdmTableComponent userId={userId} />
                </div>
                </Tab>
                <Tab eventKey="summary" title="Summary">
                <div className="tab-content bg-light">
                    <h1 className="mb-4">Processes</h1>
                    <SummaryComponent userId={userId}/>
                </div>
                </Tab>
                <Tab eventKey="developer" title="Developer Updates" disabled={true}>
                <div className="tab-content bg-light">
                    <h1 className="mb-4">Developer Updates</h1>
                    {/* <DeveloperUpdatesComponent /> */}
                </div>
                </Tab>
            </Tabs>
            </div>
        </div>
  );
};

export default Dashboard;
