import React, { useEffect, useState } from 'react';

function ExampleComponent() {
  const [examples, setExamples] = useState([]);

  useEffect(() => {
    // 環境変数から API URL を取得
    const apiUrl = process.env.REACT_APP_API_URL;

    fetch(`${apiUrl}/examples`)
      .then((response) => response.json())
      .then((data) => setExamples(data))
      .catch((error) => console.error('Error fetching examples:', error));
  }, []);

  return (
    <div>
      <h1>Examples</h1>
      <ul>
        {examples.map((example) => (
          <li key={example.id}>{example.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ExampleComponent;