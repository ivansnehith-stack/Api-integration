import React, { useEffect, useState } from "react";

const Api = () => {
  const [input, setInput] = useState("");
  const url = `https://maps.google.com/maps/api/geocode/json?address=${input}&key=AIzaSyBh12bthPAPsuUTJ06VDL3xRlQaXgww9nU&sensor=false`;

  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await fetch(url);
    const result = await response.json();

    setData(result.results[0]?.address_components);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={() => getData()}>Get Data</button>

      {data && (
        <table>
          <thead>
            <tr>
              <th>Pincode</th>
              <th>village</th>
              <th>District</th>
              <th>State</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {data?.map((item, index) => (
                <td key={index}>{item.long_name}</td>
              ))}
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Api;
