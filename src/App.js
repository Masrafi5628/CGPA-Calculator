import React, { useState } from "react";
import "./App.css";

function App() {
  const [semesters, setSemesters] = useState([{ id: 1, gpa: "", credits: "" }]);

  const handleGPAChange = (id, value) => {
    const newSemesters = semesters.map((semester) =>
      semester.id === id ? { ...semester, gpa: value } : semester
    );
    setSemesters(newSemesters);
  };

  const handleCreditsChange = (id, value) => {
    const newSemesters = semesters.map((semester) =>
      semester.id === id ? { ...semester, credits: value } : semester
    );
    setSemesters(newSemesters);
  };

  const addSemester = () => {
    const newId = semesters.length + 1;
    setSemesters([...semesters, { id: newId, gpa: "", credits: "" }]);
  };

  const deleteSemester = (id) => {
    const newSemesters = semesters.filter((semester) => semester.id !== id);
    setSemesters(newSemesters);
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
      <h1 id="page-header">CGPA Calculator</h1>
      <div className="cgpa cgpa-bar">
        <h2>
          CGPA:{" "}
          <span className="cgpa-number">{calculateCGPA().toFixed(2)}</span>
        </h2>
      </div>
      <div className="container">
        {semesters.map((semester, index) => (
          <div key={semester.id} className="semester-input">
            <input
              type="number"
              placeholder={`Semester ${index + 1} GPA`}
              value={semester.gpa}
              onChange={(e) => handleGPAChange(semester.id, e.target.value)}
            />
            <input
              type="number"
              placeholder={`Semester ${index + 1} Credits`}
              value={semester.credits}
              onChange={(e) => handleCreditsChange(semester.id, e.target.value)}
            />
            <div>
            <button
              className="delete"
              onClick={() => deleteSemester(semester.id)}
            >
              &times;
            </button>
          </div>
          </div>
        ))}
        <button className="add-semester-btn" onClick={addSemester}>
          Add Semester
        </button>
      </div>
      <div style={{ textAlign: 'center'}}>
 
      </div>
    </div>
  );
}

export default App;
