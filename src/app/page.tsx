"use client";

import { useEffect, useState } from "react";

type InfoCellProps = {
  children: React.ReactNode;
};

function InfoCell({ children }: InfoCellProps) {
  return <td className="p-4">{children}</td>;
}

type SpecialtiesPillProps = {
  specialty: string;
  onClick: () => void;
};
function SpecialtiesPill({ specialty, onClick }: SpecialtiesPillProps) {
  return (
    <div className="m-2">
      <div
        className="bg-green-200 rounded w-fit p-2 cursor-pointer"
        onClick={onClick}
        title="Search by specialty"
      >
        {specialty}
      </div>
    </div>
  );
}

export default function Home() {
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("fetching advocates...");
    fetch(`/api/advocates?filter=${searchTerm}`).then((response) => {
      response.json().then((jsonResponse) => {
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, [searchTerm]);

  const onChange = (e) => {
    // TODO: debouce this update
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    setFilteredAdvocates(filteredAdvocates);
  };

  const resetSearchFilter = () => {
    setSearchTerm("");
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1 className="text-green-800 text-3xl">Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term"></span>
        </p>
        <input
          style={{ border: "1px solid black" }}
          className="w-full"
          onChange={onChange}
          value={searchTerm}
        />
        <button onClick={resetSearchFilter}>Reset Search</button>
      </div>
      <br />
      <br />
      <table className="w-full">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            return (
              <tr key={advocate.id} className="border">
                <InfoCell>{advocate.firstName}</InfoCell>
                <InfoCell>{advocate.lastName}</InfoCell>
                <InfoCell>{advocate.city}</InfoCell>
                <InfoCell>{advocate.degree}</InfoCell>
                <InfoCell>
                  {advocate.specialties.map((s) => (
                    <SpecialtiesPill
                      key={s}
                      specialty={s}
                      onClick={() => setSearchTerm(s)}
                    />
                  ))}
                </InfoCell>
                <InfoCell>{advocate.yearsOfExperience}</InfoCell>
                <InfoCell>{advocate.phoneNumber}</InfoCell>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
