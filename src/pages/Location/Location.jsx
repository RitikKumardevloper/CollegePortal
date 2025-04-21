
import React, { useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { EnvelopeIcon } from '@heroicons/react/24/outline';


const initialAppointments = [
  {
    name: 'John Deo',
    department: 'mathematics',
    email: 'test@email.com',
    gender: 'male',
    mobile: '1234567890',
    degree: 'M.Sc., PHD.',
    address: '123 Main St, Anytown, USA',
    hire_date: '02/25/2018',
    salary: '50000',
    image: 'assets/images/user/user1.jpg',
  },
  // Add more items as needed
];

const displayedColumns = [
  'select',
  'name',
  'department',
  'email',
  'gender',
  'mobile',
  'degree',
  'address',
  'hire_date',
  'salary',
  'actions',
];

const Location = () => {
    const [appointments, setAppointments] = useState(initialAppointments);

    const editAppointment = (appointment) => {
      console.log('Edit:', appointment);
    };
  
    const deleteAppointment = (appointment) => {
      setAppointments((prev) => prev.filter((a) => a !== appointment));
    };
  return (
    <div className="bg-white shadow-md rounded-xl overflow-auto p-4">
    <table className="min-w-full text-sm text-left text-gray-700">
      <thead className="bg-gray-100 text-xs uppercase text-gray-600">
        <tr>
          {displayedColumns.map((column) => (
            <th key={column} className="px-4 py-3 whitespace-nowrap">
              {column === 'select' ? (
                <input type="checkbox" className="form-checkbox" />
              ) : column === 'actions' ? (
                'Actions'
              ) : (
                column.replace(/_/g, ' ').toUpperCase()
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {appointments.map((element, idx) => (
          <tr key={idx} className="border-b hover:bg-gray-50">
            {displayedColumns.map((column) => {
              if (column === 'select') {
                return (
                  <td key={column} className="px-4 py-3">
                    <input type="checkbox" className="form-checkbox" />
                  </td>
                );
              }

              if (column === 'name') {
                return (
                  <td key={column} className="px-4 py-3 flex items-center gap-2">
                    <img src={element.image} alt="avatar" className="w-8 h-8 rounded-full" />
                    {element.name}
                  </td>
                );
              }

              if (column === 'gender') {
                return (
                  <td key={column} className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs ${
                        element.gender === 'male' ? 'bg-green-500' : 'bg-purple-500'
                      }`}
                    >
                      {element.gender}
                    </span>
                  </td>
                );
              }

              if (column === 'email') {
                return (
                  <td key={column} className="px-4 py-3 flex items-center gap-1">
                    <EnvelopeIcon className="w-4 h-4 text-gray-500" />
                    {element.email}
                  </td>
                );
              }

              if (column === 'actions') {
                return (
                  <td key={column} className="px-4 py-3 space-x-2">
                    <button onClick={() => editAppointment(element)} className="text-blue-500 hover:text-blue-700">
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button onClick={() => deleteAppointment(element)} className="text-red-500 hover:text-red-700">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </td>
                );
              }

              return <td key={column} className="px-4 py-3">{element[column]}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default Location
