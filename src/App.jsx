import axios from "axios";
import React, { useState } from "react";



function App() {
  const GROQ_API_KEY =import.meta.env.VITE_GROQ_API_KEY

  const [message, setMessage] = useState("");
  const [res, setRes] = useState("");
  const sendMessage = async (e) => {
    console.log(message);
    e.preventDefault();
    await axios
      .post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          messages: [
            {
              role: "user",
              content: `Respond strictly with valid HTML code  as your writing an seo friendly blog post :${message} , don't stop untill you finish the response`,
            },
          ],
          model: "mixtral-8x7b-32768",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${GROQ_API_KEY}`,
          },
        }
      )
      .then((res) => {
        setRes(res.data.choices[0].message.content);
      });
  };
  return (
    <div className=" container m-auto ">
      <div  className="res  prose prose-lg max-w-none"  dangerouslySetInnerHTML={{ __html: res }}></div>
      <form
        className="fixed container bg-white m-auto border bottom-2 flex justify-between left-0 right-0"
        onSubmit={(e) => sendMessage(e)}
      >
        <textarea
          className="focus:outline-none border resize-none flex-1 placeholder:"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          placeholder="prompt?..."
          value={message}
        >
          {message}
        </textarea>

        <button className="btn py-2 px-4 btn-blue-500" type="submit">
          send
        </button>
      </form>
    </div>
  );
}

export default App;
