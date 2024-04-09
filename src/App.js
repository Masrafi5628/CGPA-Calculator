import React, { useState } from 'react';
import './App.css';

function App() {
  const [semesters, setSemesters] = useState([{ gpa: '', credits: '' }]);

  const handleGPAChange = (index, value) => {
    const newSemesters = [...semesters];
    newSemesters[index].gpa = value;
    setSemesters(newSemesters);
  };

  const handleCreditsChange = (index, value) => {
    const newSemesters = [...semesters];
    newSemesters[index].credits = value;
    setSemesters(newSemesters);
  };

  const addSemester = () => {
    setSemesters([...semesters, { gpa: '', credits: '' }]);
  };

  const calculateCGPA = () => {
    let totalCredits = 0;
    let totalGradePoints = 0;

    semesters.forEach((semester) => {
      const gpa = parseFloat(semester.gpa);
      const credits = parseInt(semester.credits);

      if (!isNaN(gpa) && !isNaN(credits)) {
        totalGradePoints += gpa * credits;
        totalCredits += credits;
      }
    });

    return totalGradePoints / totalCredits;
  };

  return (
    <div className="App">
      <h1>CGPA Calculator</h1>
      <div className="container">
        {semesters.map((semester, index) => (
          <div key={index} className="semester-input">
            <input
              type="number"
              placeholder={`Semester ${index + 1} GPA`}
              value={semester.gpa}
              onChange={(e) => handleGPAChange(index, e.target.value)}
            />
            <input
              type="number"
              placeholder={`Semester ${index + 1} Credits`}
              value={semester.credits}
              onChange={(e) => handleCreditsChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>
      <button className="add-semester-btn" onClick={addSemester}>Add Semester</button>
      <div className="cgpa">
        <h2>CGPA: {calculateCGPA().toFixed(2)}</h2>
      </div>
    </div>
  );
}

export default App;
