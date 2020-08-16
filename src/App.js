import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({
    hits: [], // explicitly state which attribute(s) from the fetched data you want to store in the state
  });
  const [query, setQuery] = useState("redux"); // concerns with onChange value from input tag
  const [url, setUrl] = useState(
    "https://hn.algolia.com/api/v1/search?query=redux" // matches search with inital state of 'query'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // useEffect Hook function
  useEffect(
    // (1) First argument does the component mounting
    () => {
      const fetchData = async () => {
        setIsError(false);
        setIsLoading(true);

        try {
          const result = await axios(url);

          setData(result.data);
        } catch (error) {
          setIsError(true);
        }

        setIsLoading(false);
      };
      fetchData();
    },
    // (2) Second argument does the component updating
    [url]
  );

  return (
    <Fragment>
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button
        type="button"
        onClick={() =>
          setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`)
        }
      >
        Search
      </button>
      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {/* {console.log(data.nbPages)} */}
          {data.hits.map((item) => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
}

export default App;
