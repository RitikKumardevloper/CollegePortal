import { courses } from "../../data/courses";
import { DataTable } from "../../components/DataTable";
import { useEffect, useState } from "react";
import axios from "axios";


export default function Courses() {

  const columns = [
    { key: "code", title: "Course Code" },
    { key: "title", title: "Duration" },
    { key: "fee", title: "fee" },
    
  ];
  const [openCourse,setOpenCourse] =  useState(false)

  const handleSubmit = async(e) =>{
    e.preventDefault();
    await axios.post("/admin/courses/addcourse" , formData)
  }
//   useEffect(async () =>{
//  res = await axios.get("./admin/courses/getcourse")
//   },[]);

  
  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Course Management</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Add Course
        </button>
      </div>
      <DataTable columns={columns} data={courses} />
    </div>
  );
}
