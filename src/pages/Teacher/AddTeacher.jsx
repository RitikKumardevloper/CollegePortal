import React, { useEffect, useState } from "react";
import axios from "axios";

const AddTeacher = () => {
  const [teacher, setTeacher] = useState({
    TeacherName: "",
    TeacherSalary: "",
    TeacherCourse: "",
    location: "", // New field added
  });

  const [courses, setCourses] = useState([]);
  const [locations, setLocations] = useState([]); // New state for locations

  useEffect(() => {
    axios.get("http://localhost:5000/admin/courses")
      .then(res => {
        // console.log("Fetched courses:", res.data);
        setCourses(res.data);
      })
      .catch(err => console.error("Error fetching courses", err));

    axios.get("http://localhost:5000/admin/managelocaiton")
      .then(res => {
        // console.log("Fetched locations:", res.data);
        setLocations(res.data);
      })
      .catch(err => console.error("Error fetching locations", err));
  }, []);

  const handleChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/admin/teacher", teacher);
      setTeacher({
        TeacherName: "",
        TeacherSalary: "",
        TeacherCourse: "",
        location: "",
      });
    } catch (error) {
      console.error("Failed to add teacher:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add Teacher</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="TeacherName"
          value={teacher.TeacherName}
          onChange={handleChange}
          placeholder="Name"
          className="w-full mb-3 p-2 border"
          required
        />
        <input
          name="TeacherSalary"
          type="number"
          value={teacher.TeacherSalary}
          onChange={handleChange}
          placeholder="Salary"
          className="w-full mb-3 p-2 border"
          required
        />

        <select
          name="TeacherCourse"
          value={teacher.TeacherCourse}
          onChange={handleChange}
          className="w-full mb-3 p-2 border"
          required
        >
          <option value="" disabled hidden>Select Course</option>
          {Array.isArray(courses) &&
            courses.map((course) => (
              <option key={course._id} value={course.courseName}>
                {course.courseName}
              </option>
            ))}
        </select>

        <select
          name="location"
          value={teacher.location}
          onChange={handleChange}
          className="w-full mb-3 p-2 border"
          required
        >
          <option value="" disabled hidden>Select Location</option>
          {Array.isArray(locations) &&
            locations.map((location) => (
              <option key={location._id} value={location.loc}>
                {location.loc}
              </option>
            ))}
        </select>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddTeacher;
