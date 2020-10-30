import React, { useState } from "react";

const Home = () => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [quote, setQuote] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setMessage(value);
  };

  const onSubmit = () => {
    // api request
    // console.log('message', message)
    // const apiKey = '4b3d0d7c95b44df38d0e7cced07cc93e';
    // const url = `http://newsapi.org/v2/${message}?country=us&apiKey=${apiKey}`;
    // const req = new Request(url);
    // setIsLoading(true);
    // fetch(req)
    //   .then(function(response) {
    //       setIsLoading(false);
    //       console.log(response.json());
    //   });

    const url = "https://type.fit/api/quotes";
    const req = new Request(url);
    setIsLoading(true);

    fetch(req)
      .then((response) => response.json())
      .then((quoteData) => {
        const quoteResults = quoteData.find((quote) =>
          quote.text.includes(message)
        );

        quoteResults ? setQuote(quoteResults) : setError("No quote found.");
        console.log(quoteResults);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <h1>In one word,</h1>
      <h1>How are you feeling today?</h1>
      <input type="text" value={message} name="message" onChange={onChange} />
      <button onClick={onSubmit}>Submit</button>
      {quote && (
        <div>
          <h3>Author: {quote.author || "Unknown"}</h3>
          <p>"{quote.text}"</p>
        </div>
      )}
      {isLoading && <div>Loading resources...</div>}
    </div>
  );
};

export default Home;
