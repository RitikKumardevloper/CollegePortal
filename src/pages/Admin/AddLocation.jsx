import React, { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";
import axios from "axios";
const AddLocation = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const countryStates = State.getStatesOfCountry(selectedCountry);
      setStates(countryStates);
      setSelectedState("");
      setCities([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      const stateCities = City.getCitiesOfState(selectedCountry, selectedState);
      setCities(stateCities);
      setSelectedCity("");
    }
  }, [selectedState, selectedCountry]);

  // Inside your component
  const handleSubmit = async (e) => {
    e.preventDefault();

    const countryObj = countries.find((c) => c.isoCode === selectedCountry);
    const stateObj = states.find((s) => s.isoCode === selectedState);

    const fullAddress = {
      country: countryObj?.name || "",
      state: stateObj?.name || "",
      city: selectedCity || "",
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/admin/managelocaiton",
        {
          country: fullAddress.country,
          state: fullAddress.state,
          city: fullAddress.city,
        }
      );

      if (response.status === 201) {
        console.log("✅ Location saved:", response.data);
        // Optionally, reset the form fields here
        setSelectedCountry("");
        setSelectedState("");
        setSelectedCity("");
        setStates([]);
        setCities([]);
      }
    } catch (error) {
      console.error("❌ Error saving location:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Select Location</h2>
      <form onSubmit={handleSubmit}>
        {/* Country */}
        <label className="block mb-1 font-medium">Country</label>
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        >
          <option value="">-- Select Country --</option>
          {countries.map((country) => (
            <option key={country.isoCode} value={country.isoCode}>
              {country.name}
            </option>
          ))}
        </select>

        {/* State */}
        <label className="block mb-1 font-medium">State</label>
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          disabled={!states.length}
        >
          <option value="">-- Select State --</option>
          {states.map((state) => (
            <option key={state.isoCode} value={state.isoCode}>
              {state.name}
            </option>
          ))}
        </select>

        {/* City */}
        <label className="block mb-1 font-medium">District (City)</label>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          disabled={!cities.length}
        >
          <option value="">-- Select City --</option>
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddLocation;
