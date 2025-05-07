import React from 'react';

const LocationTable = ({ locations, onDeleteLocation }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">All Locations</h2>
      <table className="w-full text-left border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {locations.length > 0 ? (
            locations.map((location, index) => (
              <tr key={location._id} className="border-t">
                <td className="px-4 py-2">{location.loc}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => onDeleteLocation(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="px-4 py-2 text-center text-gray-500">
                No locations found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LocationTable;
