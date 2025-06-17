import React, { useState, useEffect } from 'react';

const StatusDebugger = () => {
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [testResult, setTestResult] = useState('');

  const fetchStatuses = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/status`);
      if (response.ok) {
        const data = await response.json();
        setStatuses(data);
        setTestResult(`✅ Successfully fetched ${data.length} statuses`);
      } else {
        setTestResult(`❌ Failed to fetch statuses: ${response.status}`);
      }
    } catch (error) {
      setTestResult(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testStatusUpdate = async () => {
    if (statuses.length === 0) {
      setTestResult('❌ No statuses available to test');
      return;
    }

    const testTransaction = statuses[0].transactionNumber;
    const token = localStorage.getItem('token');
    
    if (!token) {
      setTestResult('❌ No authentication token found');
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/status/status/${testTransaction}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: 'APPROVED',
            adminName: 'Debug Test',
          }),
        }
      );

      if (response.ok) {
        setTestResult(`✅ Successfully updated status for ${testTransaction}`);

        // Trigger the appointment status update event that other components listen for
        window.dispatchEvent(new CustomEvent("appointmentStatusUpdated"));

        // Also set localStorage flag for additional compatibility
        localStorage.setItem("appointmentStatusUpdated", Date.now().toString());

        // Refresh statuses to see the change
        setTimeout(fetchStatuses, 1000);
      } else {
        const errorText = await response.text();
        setTestResult(`❌ Failed to update status: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      setTestResult(`❌ Update error: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchStatuses();
  }, []);

  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: 'white', 
      border: '2px solid #ccc', 
      padding: '15px', 
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      zIndex: 9999,
      maxWidth: '400px'
    }}>
      <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Status API Debugger</h3>
      
      <div style={{ marginBottom: '10px' }}>
        <button 
          onClick={fetchStatuses} 
          disabled={loading}
          style={{ 
            marginRight: '10px', 
            padding: '5px 10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {loading ? 'Loading...' : 'Fetch Statuses'}
        </button>
        
        <button 
          onClick={testStatusUpdate}
          disabled={loading || statuses.length === 0}
          style={{ 
            padding: '5px 10px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Test Update
        </button>
      </div>

      <div style={{ 
        fontSize: '12px', 
        marginBottom: '10px',
        padding: '8px',
        backgroundColor: '#f8f9fa',
        borderRadius: '4px'
      }}>
        <strong>Result:</strong> {testResult}
      </div>

      <div style={{ fontSize: '12px' }}>
        <strong>Statuses found:</strong> {statuses.length}
        {statuses.length > 0 && (
          <div style={{ marginTop: '5px' }}>
            <strong>Sample:</strong> {statuses[0].transactionNumber} - {statuses[0].status}
          </div>
        )}
      </div>

      <div style={{ 
        marginTop: '10px', 
        fontSize: '11px', 
        color: '#666',
        borderTop: '1px solid #eee',
        paddingTop: '8px'
      }}>
        <strong>Auth Token:</strong> {localStorage.getItem('token') ? '✅ Present' : '❌ Missing'}
        <br />
        <strong>API URL:</strong> {import.meta.env.VITE_API_URL}
      </div>
    </div>
  );
};

export default StatusDebugger;
