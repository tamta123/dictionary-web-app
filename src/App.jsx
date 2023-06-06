import { useState } from "react";
import axios from "axios";
import Header from "./components/header";

function App() {
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [isEmptyError, setIsEmptyError] = useState(false);
  const [selectedFont, setSelectedFont] = useState("Inter");
  // const [mode, setMode] = useState("light");
  // const toggleMode = () => {
  //   setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  // };

  const handleFontChange = (e) => {
    setSelectedFont(e.target.value);
  };

  const getDefinition = async () => {
    if (searchTerm === "") {
      setIsEmptyError(true); // Set isEmptyError to true if searchTerm is empty
      setData(null);
      setSearchPerformed(false);
      return;
    }
    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`
      );
      console.log(data);
      setData(response.data);
      setIsEmptyError(false); // Reset isEmptyError to false
      setSearchPerformed(true);
    } catch (error) {
      console.error(error);
      setData(null);
      setIsEmptyError(false); // Reset isEmptyError to false
      setSearchPerformed(true);
    }
  };

  console.log(selectedFont);
  return (
    <div className={`mx-6 my-6 font-${selectedFont} `}>
      <Header
        // mode={mode}
        // toggleMode={toggleMode}
        selectedFont={selectedFont}
        handleFontChange={handleFontChange}
      />
      <div className="mt-6 flex justify-center rounded-2xl bg-gray-200 ">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          id="english-word"
          placeholder="Search for any word…"
          className="bg-gray-200 w-4/5 rounded-2xl text-gray-900 text-sm  block p-2.5 outline-none"
        />
        <img
          src="./images/icon-search.svg"
          onClick={getDefinition}
          alt="Search Icon"
        />
      </div>
      {isEmptyError && (
        <div className="text-left mt-2 text-red-500">
          Whoops, can't be empty...
        </div>
      )}
      <div className="flex justify-between items-center gap-y-2 mt-7">
        <div>
          <div className="font-bold text-2xl leading-8 text-gray-900">
            {data && data.length > 0 ? <div>{data[0].word}</div> : null}
          </div>
          <div className="font-normal text-base leading-6 text-purple-600">
            {data && data.length > 0 ? <div>{data[0].phonetic}</div> : null}
          </div>
        </div>
        <div className="h-12 w-12">
          {data && data.length > 0 && (
            <img className="" src="./images/icon-play.svg" alt="Play Icon" />
          )}
        </div>
      </div>
      {searchPerformed && (data === null || data.length === 0) ? (
        <div className="text-center mt-8 text-gray-700">
          <p>No Definitions Found</p>
          <span className="font-[Inter]">
            Sorry pal, we couldn't find definitions for the word you were
            looking for. You can try the search again at later time or head to
            the web instead.
          </span>
        </div>
      ) : (
        <div>
          {data && data.length > 0 && (
            <div>
              {data.map((entry, entryIndex) => (
                <div key={entryIndex}>
                  {entry.meanings.map((meaning, meaningIndex) => (
                    <div key={meaningIndex}>
                      <div className="mt-8 mb-9 flex justify-start gap-x-[25px] items-center">
                        <div className="font-bold text-[16px] leading-tight text-gray-600">
                          {meaning.partOfSpeech}
                        </div>
                        <div className="h-[2px] w-full border border-solid border-[#E9E9E9]"></div>
                      </div>
                      <h3 className="mb-4 font-normal text-base leading-4 text-gray-600">
                        Meaning
                      </h3>
                      <ul className="flex flex-col gap-y-3 mb-6 ml-4 list-disc">
                        {meaning.definitions.map(
                          (definition, definitionIndex) => (
                            <li
                              key={definitionIndex}
                              className="font-normal text-base leading-6 text-gray-900"
                            >
                              {definition.definition}
                              {definition.example && (
                                <p>{definition.example}</p>
                              )}
                            </li>
                          )
                        )}
                      </ul>
                      {meaning.synonyms && meaning.synonyms.length > 0 && (
                        <div className="flex gap-10">
                          <h4 className="font-normal text-base leading-4 text-gray-700">
                            Synonym
                          </h4>
                          <li className="font-semibold text-lg leading-tight text-purple-600 list-none">
                            {meaning.synonyms.join(", ")}
                          </li>
                        </div>
                      )}

                      {meaning.antonyms && meaning.antonyms.length > 0 && (
                        <div className="flex gap-10">
                          <h4 className="font-normal text-base leading-4 text-gray-700">
                            Antonyms
                          </h4>
                          <li className="font-semibold text-lg leading-tight text-purple-600">
                            {meaning.antonyms.join(", ")}
                          </li>
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="h-[2px] w-full border border-solid border-div-grey mb-7"></div>
                  <h4 className="font-normal text-base leading-4 text-gray-700 underline mb-[10px]">
                    Source
                  </h4>
                  <div className="flex justify-start items-start gap-2 mb-14">
                    <div>{entry.sourceUrls}</div>
                    <img src="./images/icon-new-window.svg" alt="icon" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
