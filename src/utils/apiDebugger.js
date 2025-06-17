// API Debugging Utility
import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

export class ApiDebugger {
  static async checkConnectivity() {
    const results = {
      timestamp: new Date().toISOString(),
      baseUrl: API_BASE_URL,
      tests: []
    };

    // Test 1: Basic connectivity
    try {
      const start = Date.now();
      const response = await axios.get(`${API_BASE_URL}/profile/ping`, {
        timeout: 5000
      });
      const duration = Date.now() - start;
      
      results.tests.push({
        name: 'Basic Connectivity',
        status: 'PASS',
        duration: `${duration}ms`,
        response: response.data
      });
    } catch (error) {
      results.tests.push({
        name: 'Basic Connectivity',
        status: 'FAIL',
        error: error.message,
        code: error.code,
        status_code: error.response?.status
      });
    }

    // Test 2: Environment variables
    results.tests.push({
      name: 'Environment Check',
      status: import.meta.env.VITE_API_URL ? 'PASS' : 'FAIL',
      vite_api_url: import.meta.env.VITE_API_URL || 'NOT_SET',
      computed_base_url: API_BASE_URL
    });

    // Test 3: Network timing
    try {
      const start = Date.now();
      await fetch(`${API_BASE_URL}/profile/ping`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });
      const duration = Date.now() - start;
      
      results.tests.push({
        name: 'Network Timing (Fetch)',
        status: 'PASS',
        duration: `${duration}ms`
      });
    } catch (error) {
      results.tests.push({
        name: 'Network Timing (Fetch)',
        status: 'FAIL',
        error: error.message
      });
    }

    // Test 4: Authentication headers
    const token = localStorage.getItem('token');
    results.tests.push({
      name: 'Authentication Token',
      status: token ? 'PASS' : 'FAIL',
      token_present: !!token,
      token_length: token?.length || 0
    });

    return results;
  }

  static async testUserProfileEndpoint(userId, token) {
    if (!userId || !token) {
      return {
        status: 'FAIL',
        error: 'Missing userId or token'
      };
    }

    try {
      const start = Date.now();
      
      // Test with different timeout values
      const timeouts = [5000, 10000, 20000];
      const results = [];

      for (const timeout of timeouts) {
        try {
          const testStart = Date.now();
          const response = await axios.get(`${API_BASE_URL}/profile/${userId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json'
            },
            timeout
          });
          const testDuration = Date.now() - testStart;

          results.push({
            timeout: `${timeout}ms`,
            status: 'SUCCESS',
            duration: `${testDuration}ms`,
            response_size: JSON.stringify(response.data).length
          });
          break; // If successful, no need to test longer timeouts
        } catch (error) {
          results.push({
            timeout: `${timeout}ms`,
            status: 'FAIL',
            error: error.message,
            code: error.code
          });
        }
      }

      return {
        status: 'COMPLETED',
        userId,
        total_duration: `${Date.now() - start}ms`,
        tests: results
      };
    } catch (error) {
      return {
        status: 'ERROR',
        error: error.message
      };
    }
  }

  static logResults(results) {
    console.group('🔍 API Debug Results');
    console.log('Timestamp:', results.timestamp);
    console.log('Base URL:', results.baseUrl);
    
    results.tests.forEach(test => {
      const emoji = test.status === 'PASS' || test.status === 'SUCCESS' ? '✅' : '❌';
      console.group(`${emoji} ${test.name}`);
      Object.entries(test).forEach(([key, value]) => {
        if (key !== 'name') {
          console.log(`${key}:`, value);
        }
      });
      console.groupEnd();
    });
    
    console.groupEnd();
    return results;
  }
}

// Quick debug function for immediate use
export const quickDebug = async () => {
  console.log('🚀 Starting API Debug...');
  const results = await ApiDebugger.checkConnectivity();
  ApiDebugger.logResults(results);
  return results;
};

// Test user profile specifically
export const debugUserProfile = async (userId, token) => {
  console.log('🔍 Testing User Profile Endpoint...');
  const results = await ApiDebugger.testUserProfileEndpoint(userId, token);
  console.log('Profile Test Results:', results);
  return results;
};

// Test database connectivity and data retrieval
export const debugDatabaseData = async (token) => {
  console.log('🗄️ Testing Database Data Retrieval...');

  const tests = [];
  const endpoints = [
    { name: 'Students', url: '/students' },
    { name: 'Document Requests', url: '/document-requests/docs' },
    { name: 'Document Requests with Details', url: '/document-requests/docs-with-details' },
    { name: 'Appointment Status', url: '/status' },
    { name: 'Bookings', url: '/bookings' },
    { name: 'Holidays', url: '/holidays' },
    { name: 'Events', url: '/events' },
    { name: 'Announcements', url: '/announcements' }
  ];

  for (const endpoint of endpoints) {
    try {
      const start = Date.now();
      const response = await axios.get(`${API_BASE_URL}${endpoint.url}`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        timeout: 10000
      });
      const duration = Date.now() - start;

      tests.push({
        endpoint: endpoint.name,
        url: endpoint.url,
        status: 'SUCCESS',
        duration: `${duration}ms`,
        dataCount: Array.isArray(response.data) ? response.data.length : 'N/A',
        dataType: Array.isArray(response.data) ? 'Array' : typeof response.data,
        sampleData: Array.isArray(response.data) && response.data.length > 0
          ? JSON.stringify(response.data[0]).substring(0, 200) + '...'
          : 'No data or not array'
      });
    } catch (error) {
      tests.push({
        endpoint: endpoint.name,
        url: endpoint.url,
        status: 'FAILED',
        error: error.message,
        statusCode: error.response?.status,
        errorData: error.response?.data
      });
    }
  }

  console.group('🗄️ Database Data Test Results');
  tests.forEach(test => {
    const emoji = test.status === 'SUCCESS' ? '✅' : '❌';
    console.group(`${emoji} ${test.endpoint}`);
    Object.entries(test).forEach(([key, value]) => {
      if (key !== 'endpoint') {
        console.log(`${key}:`, value);
      }
    });
    console.groupEnd();
  });
  console.groupEnd();

  return tests;
};

// Test specific data flow for appointments/dashboard
export const debugAppointmentDataFlow = async (token) => {
  console.log('📊 Testing Appointment Data Flow...');

  const results = {
    timestamp: new Date().toISOString(),
    steps: []
  };

  // Step 1: Test student data
  try {
    const studentsResponse = await axios.get(`${API_BASE_URL}/document-requests/docs-with-details`, {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
      timeout: 15000
    });

    results.steps.push({
      step: 'Students Data',
      status: 'SUCCESS',
      count: studentsResponse.data?.length || 0,
      sample: studentsResponse.data?.[0] || null
    });
  } catch (error) {
    results.steps.push({
      step: 'Students Data',
      status: 'FAILED',
      error: error.message,
      statusCode: error.response?.status
    });
  }

  // Step 2: Test status data
  try {
    const statusResponse = await axios.get(`${API_BASE_URL}/status`, {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
      timeout: 10000
    });

    results.steps.push({
      step: 'Status Data',
      status: 'SUCCESS',
      count: statusResponse.data?.length || 0,
      sample: statusResponse.data?.[0] || null
    });
  } catch (error) {
    results.steps.push({
      step: 'Status Data',
      status: 'FAILED',
      error: error.message,
      statusCode: error.response?.status
    });
  }

  // Step 3: Test data correlation
  try {
    const [studentsRes, statusRes] = await Promise.all([
      axios.get(`${API_BASE_URL}/document-requests/docs-with-details`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        timeout: 15000
      }),
      axios.get(`${API_BASE_URL}/status`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        timeout: 10000
      })
    ]);

    const students = studentsRes.data || [];
    const statuses = statusRes.data || [];

    const correlatedData = students.map(student => {
      const status = statuses.find(s => s.transactionNumber === student.transactionNumber);
      return {
        transactionNumber: student.transactionNumber,
        hasStatus: !!status,
        studentData: !!student,
        statusValue: status?.status || 'NO_STATUS'
      };
    });

    results.steps.push({
      step: 'Data Correlation',
      status: 'SUCCESS',
      totalStudents: students.length,
      totalStatuses: statuses.length,
      correlatedCount: correlatedData.filter(d => d.hasStatus).length,
      uncorrelatedCount: correlatedData.filter(d => !d.hasStatus).length,
      sampleCorrelation: correlatedData.slice(0, 3)
    });
  } catch (error) {
    results.steps.push({
      step: 'Data Correlation',
      status: 'FAILED',
      error: error.message
    });
  }

  console.group('📊 Appointment Data Flow Results');
  results.steps.forEach(step => {
    const emoji = step.status === 'SUCCESS' ? '✅' : '❌';
    console.group(`${emoji} ${step.step}`);
    Object.entries(step).forEach(([key, value]) => {
      if (key !== 'step') {
        console.log(`${key}:`, value);
      }
    });
    console.groupEnd();
  });
  console.groupEnd();

  return results;
};

// Comprehensive data debugging - checks everything
export const debugAllData = async () => {
  console.log('🚀 Starting Comprehensive Data Debug...');

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('userData') || localStorage.getItem('user') || 'null');

  console.group('🔍 Environment Check');
  console.log('API Base URL:', API_BASE_URL);
  console.log('Token present:', !!token);
  console.log('Token length:', token?.length || 0);
  console.log('User data present:', !!user);
  console.log('User ID:', user?.id);
  console.groupEnd();

  // Test 1: Basic connectivity
  console.log('\n1️⃣ Testing Basic Connectivity...');
  const connectivityResults = await ApiDebugger.checkConnectivity();

  // Test 2: Database endpoints
  console.log('\n2️⃣ Testing Database Endpoints...');
  const databaseResults = await debugDatabaseData(token);

  // Test 3: Appointment data flow
  console.log('\n3️⃣ Testing Appointment Data Flow...');
  const appointmentResults = await debugAppointmentDataFlow(token);

  // Test 4: User profile (if user exists)
  let profileResults = null;
  if (user?.id && token) {
    console.log('\n4️⃣ Testing User Profile...');
    profileResults = await ApiDebugger.testUserProfileEndpoint(user.id, token);
  }

  // Summary
  const summary = {
    timestamp: new Date().toISOString(),
    environment: {
      apiUrl: API_BASE_URL,
      hasToken: !!token,
      hasUser: !!user,
      userId: user?.id
    },
    connectivity: connectivityResults,
    database: databaseResults,
    appointments: appointmentResults,
    profile: profileResults,
    recommendations: []
  };

  // Generate recommendations
  const failedConnectivity = connectivityResults.tests.some(t => t.status === 'FAIL');
  const failedDatabase = databaseResults.some(t => t.status === 'FAILED');
  const failedAppointments = appointmentResults.steps.some(s => s.status === 'FAILED');

  if (failedConnectivity) {
    summary.recommendations.push('❌ Basic connectivity failed - check network connection and API URL');
  }

  if (failedDatabase) {
    summary.recommendations.push('❌ Database endpoints failing - check backend server and database connection');
  }

  if (failedAppointments) {
    summary.recommendations.push('❌ Appointment data flow issues - check data correlation and API responses');
  }

  if (!token) {
    summary.recommendations.push('⚠️ No authentication token - user may need to sign in again');
  }

  if (!user) {
    summary.recommendations.push('⚠️ No user data in localStorage - check authentication flow');
  }

  const emptyDatasets = databaseResults.filter(t => t.status === 'SUCCESS' && t.dataCount === 0);
  if (emptyDatasets.length > 0) {
    summary.recommendations.push(`📊 Empty datasets found: ${emptyDatasets.map(d => d.endpoint).join(', ')} - check if data exists in database`);
  }

  if (summary.recommendations.length === 0) {
    summary.recommendations.push('✅ All tests passed - data should be displaying correctly');
  }

  console.group('📋 SUMMARY & RECOMMENDATIONS');
  summary.recommendations.forEach(rec => console.log(rec));
  console.groupEnd();

  return summary;
};

// Quick fix suggestions based on common issues
export const getQuickFixes = () => {
  const fixes = [
    {
      issue: 'No data displaying',
      fixes: [
        'Check if user is authenticated (token exists)',
        'Verify API endpoints are responding',
        'Check browser console for errors',
        'Verify database has data',
        'Check component state management'
      ]
    },
    {
      issue: 'Authentication errors',
      fixes: [
        'Clear localStorage and sign in again',
        'Check token expiration',
        'Verify backend authentication middleware',
        'Check CORS settings'
      ]
    },
    {
      issue: 'Empty data arrays',
      fixes: [
        'Check if database collections have documents',
        'Verify API endpoint logic',
        'Check database connection',
        'Verify data seeding/migration'
      ]
    },
    {
      issue: 'Slow loading',
      fixes: [
        'Check network speed',
        'Optimize database queries',
        'Add loading states',
        'Implement pagination'
      ]
    }
  ];

  console.group('🛠️ Quick Fix Suggestions');
  fixes.forEach(fix => {
    console.group(`❓ ${fix.issue}`);
    fix.fixes.forEach(solution => console.log(`• ${solution}`));
    console.groupEnd();
  });
  console.groupEnd();

  return fixes;
};

// Specific debugging for common "no data" scenarios
export const debugNoDataIssues = async () => {
  console.log('🔍 Debugging "No Data Displaying" Issues...');

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('userData') || localStorage.getItem('user') || 'null');

  const issues = [];
  const solutions = [];

  // Check 1: Authentication
  if (!token) {
    issues.push('❌ No authentication token found');
    solutions.push('Sign in again to get a valid token');
  } else {
    console.log('✅ Token found:', token.substring(0, 20) + '...');
  }

  if (!user) {
    issues.push('❌ No user data in localStorage');
    solutions.push('Check authentication flow and user context');
  } else {
    console.log('✅ User data found:', { id: user.id, name: user.name });
  }

  // Check 2: API Connectivity
  try {
    const healthCheck = await axios.get(`${API_BASE_URL}/profile/ping`, { timeout: 5000 });
    console.log('✅ API is reachable:', healthCheck.data);
  } catch (error) {
    issues.push(`❌ API not reachable: ${error.message}`);
    solutions.push('Check if backend server is running and VITE_API_URL is correct');
  }

  // Check 3: Critical Data Endpoints
  const criticalEndpoints = [
    { name: 'Document Requests', url: '/document-requests/docs-with-details' },
    { name: 'Status Data', url: '/status' },
    { name: 'Students', url: '/students' }
  ];

  for (const endpoint of criticalEndpoints) {
    try {
      const response = await axios.get(`${API_BASE_URL}${endpoint.url}`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        timeout: 10000
      });

      const dataCount = Array.isArray(response.data) ? response.data.length : 0;
      if (dataCount === 0) {
        issues.push(`⚠️ ${endpoint.name} endpoint returns empty array`);
        solutions.push(`Check if ${endpoint.name.toLowerCase()} exist in database`);
      } else {
        console.log(`✅ ${endpoint.name}: ${dataCount} records found`);
      }
    } catch (error) {
      issues.push(`❌ ${endpoint.name} endpoint failed: ${error.message}`);
      solutions.push(`Check ${endpoint.name} API endpoint and authentication`);
    }
  }

  // Check 4: Environment Variables
  const apiUrl = import.meta.env.VITE_API_URL;
  if (!apiUrl) {
    issues.push('❌ VITE_API_URL environment variable not set');
    solutions.push('Set VITE_API_URL in .env file');
  } else {
    console.log('✅ API URL configured:', apiUrl);
  }

  // Check 5: Common Component State Issues
  const componentChecks = [
    'Check if loading states are stuck (loading: true)',
    'Verify error states are not blocking data display',
    'Check if data is being filtered out by search/filter logic',
    'Verify useEffect dependencies are correct',
    'Check if data is being set to component state properly'
  ];

  console.group('🔍 Debugging Results');

  if (issues.length > 0) {
    console.group('❌ Issues Found');
    issues.forEach(issue => console.log(issue));
    console.groupEnd();

    console.group('💡 Suggested Solutions');
    solutions.forEach(solution => console.log(`• ${solution}`));
    componentChecks.forEach(check => console.log(`• ${check}`));
    console.groupEnd();
  } else {
    console.log('✅ No obvious issues found. Data should be displaying.');
    console.group('🔍 Additional Checks');
    componentChecks.forEach(check => console.log(`• ${check}`));
    console.groupEnd();
  }

  console.groupEnd();

  return { issues, solutions, componentChecks };
};

// Test specific component data flows
export const debugComponentData = async (componentName) => {
  console.log(`🧩 Debugging ${componentName} Component Data Flow...`);

  const token = localStorage.getItem('token');
  const results = { component: componentName, tests: [] };

  switch (componentName.toLowerCase()) {
    case 'dashboard':
    case 'registrarhome':
      // Test dashboard-specific endpoints
      try {
        const [studentsRes, statusRes, eventsRes, holidaysRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/document-requests/docs-with-details`, {
            headers: token ? { 'Authorization': `Bearer ${token}` } : {},
            timeout: 10000
          }),
          axios.get(`${API_BASE_URL}/status`, {
            headers: token ? { 'Authorization': `Bearer ${token}` } : {},
            timeout: 10000
          }),
          axios.get(`${API_BASE_URL}/events`, { timeout: 10000 }),
          axios.get(`${API_BASE_URL}/holidays`, { timeout: 10000 })
        ]);

        results.tests.push({
          name: 'Students Data',
          status: 'SUCCESS',
          count: studentsRes.data?.length || 0
        });

        results.tests.push({
          name: 'Status Data',
          status: 'SUCCESS',
          count: statusRes.data?.length || 0
        });

        results.tests.push({
          name: 'Events Data',
          status: 'SUCCESS',
          count: eventsRes.data?.length || 0
        });

        results.tests.push({
          name: 'Holidays Data',
          status: 'SUCCESS',
          count: holidaysRes.data?.length || 0
        });

      } catch (error) {
        results.tests.push({
          name: 'Dashboard Data',
          status: 'FAILED',
          error: error.message
        });
      }
      break;

    case 'appointments':
    case 'students':
      // Test appointments-specific endpoints
      try {
        const response = await axios.get(`${API_BASE_URL}/document-requests/docs-with-details`, {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {},
          timeout: 10000
        });

        results.tests.push({
          name: 'Appointments Data',
          status: 'SUCCESS',
          count: response.data?.length || 0,
          sample: response.data?.[0] || null
        });
      } catch (error) {
        results.tests.push({
          name: 'Appointments Data',
          status: 'FAILED',
          error: error.message
        });
      }
      break;

    default:
      results.tests.push({
        name: 'Unknown Component',
        status: 'SKIPPED',
        message: 'Component not recognized for specific testing'
      });
  }

  console.group(`🧩 ${componentName} Component Results`);
  results.tests.forEach(test => {
    const emoji = test.status === 'SUCCESS' ? '✅' : test.status === 'FAILED' ? '❌' : '⏭️';
    console.log(`${emoji} ${test.name}:`, test);
  });
  console.groupEnd();

  return results;
};

// ========================================
// USAGE GUIDE - Copy these to browser console
// ========================================

/*
// 1. Quick overall debug (recommended first step)
import { debugAllData } from './src/utils/apiDebugger.js';
await debugAllData();

// 2. Check for common "no data" issues
import { debugNoDataIssues } from './src/utils/apiDebugger.js';
await debugNoDataIssues();

// 3. Test specific component data
import { debugComponentData } from './src/utils/apiDebugger.js';
await debugComponentData('dashboard');
await debugComponentData('appointments');

// 4. Test database endpoints specifically
import { debugDatabaseData } from './src/utils/apiDebugger.js';
const token = localStorage.getItem('token');
await debugDatabaseData(token);

// 5. Test appointment data flow
import { debugAppointmentDataFlow } from './src/utils/apiDebugger.js';
const token = localStorage.getItem('token');
await debugAppointmentDataFlow(token);

// 6. Basic connectivity test
import { quickDebug } from './src/utils/apiDebugger.js';
await quickDebug();

// 7. Get quick fix suggestions
import { getQuickFixes } from './src/utils/apiDebugger.js';
getQuickFixes();
*/
