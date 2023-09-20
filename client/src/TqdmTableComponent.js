import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


const TqdmTableComponent = ({ userId }) => {
  const [tqdmData, setTqdmData] = useState([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState('');
  const [currentWorkflow, setCurrentWorkflow] = useState('');
  const [progress, setProgress] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const fetchTqdmData = useCallback(async () => {
    try {
      const response = await axios.get(`/tqdm/${userId}`);
      setTqdmData(response.data.records);
    } catch (error) {
      console.error('Error fetching tqdm data:', error);
    }
  }, [userId]);

  const handleStart = async () => {
    try {
      setLoading(true);
      setCurrentWorkflow(selectedWorkflow);
      const response = await axios.post('/start_process', {
        userId,
        workflow: selectedWorkflow,
      });
      const processId = response.data.process_id;

      const intervalId = setInterval(async () => {
        const progressResponse = await axios.get(`/progress?process_id=${processId}`);
        const currentProgress = progressResponse.data.progress;
        setProgress(currentProgress);

        if (currentProgress === 100) {
          clearInterval(intervalId);
          fetchTqdmData();
          setLoading(false);
          setProgress(0);
          setCurrentWorkflow('');
        }
      }, 1000);
    } catch (error) {
      console.error('Error starting process:', error);
    }
  };

  useEffect(() => {
    fetchTqdmData();
  }, [userId]);

  // Define workflows as a constant array
  const workflows = [
    { value: '', label: 'Select Workflow' },
    { value: 'Re-index database columns', label: 'Re-index database columns' },
    { value: 'Deploy new version', label: 'Deploy new version' },
    { value: 'Run integration tests', label: 'Run integration tests' },
    { value: 'Database backup', label: 'Database backup' },
  ];

  return (
    <div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
      <DropdownButton
        align="end"
        title={selectedWorkflow ? `${selectedWorkflow}` : 'Select Workflow'}
        id="dropdown-menu-align-end"
        // id="workflow-dropdown"
        menuVariant='dark'
        variant='dark'
        onSelect={(eventKey) => setSelectedWorkflow(eventKey)}
        >
            {workflows.map((workflow) => (
                <Dropdown.Item key={workflow.value} eventKey={workflow.value}>
                {workflow.label}
                </Dropdown.Item>
            ))}
            <Dropdown.Divider/>
            <Dropdown.Item eventKey="tbd" disabled={true}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }} />
                <span style={{ fontWeight: 'bold' }}>New</span>
                </div>
            </Dropdown.Item>
      </DropdownButton>

      <Button
        variant="primary"
        disabled={!selectedWorkflow | isLoading}
        onClick={!isLoading ? handleStart : null}
      >
        {isLoading ? 'Processing...' : 'Start'}
      </Button>
      </div>  

      {progress > 0 && progress < 100 && (
        <div style={{ marginBottom: '20px', marginTop: '10px' }}>
        <h3>{currentWorkflow}</h3>
        <ProgressBar animated now={progress} label={`${progress}%`} />
        </div>
      )}

      <h2>History</h2>
      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Progress</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tqdmData.map((record) => (
            <tr key={record._id}>
              <td>{record.title}</td>
              <td>{record.progress}</td>
              <td>{record.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TqdmTableComponent;
