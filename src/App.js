import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [empData, setEmpData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const getEmpData = async() => {
    try {      
      const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
      if (!response.ok) 
      {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setEmpData(data);
    } catch (error) {
      alert('failed to fetch data');
      console.error('Fetch error: ', error);
    }
  };

  useEffect(() => {
    getEmpData();
  }, []);

  const currentData = empData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const nextPage = () => {
    if (currentPage < Math.ceil(empData.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="App">
      <header>
        Employee Data Table
      </header>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ROLE</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={prevPage} >
          Previous
        </button>
        <div>{currentPage}</div>
        <button onClick={nextPage} >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
