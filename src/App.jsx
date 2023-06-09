import { useState } from "react";
import axios from "axios";
import Header from "./components/header";
import { Howl } from "howler";
import Select from "react-select"; // Import the Select component

function App() {
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [isEmptyError, setIsEmptyError] = useState(false);
  const [selectedFont, setSelectedFont] = useState("Sans-serif");
  const [mode, setMode] = useState("light");
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const handleFontChange = (e) => {
    setSelectedFont(e.value);
  };

  const callWord = (src) => {
    const sound = new Howl({
      src,
      html5: true,
    });
    sound.play();
  };
  const getDefinition = async () => {
    if (searchTerm === "") {
      setIsEmptyError(true);
      setData(null);
      setSearchPerformed(false);
    } else {
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
    }
  };
  console.log(searchTerm);

  return (
    <div
      className={`h-[100vh] ${
        mode === "dark" ? " bg-dark-mode" : " bg-[#fffff]"
      }`}
    >
      <div
        className={
          " px-6 py-6 h-auto md:px-10 md:pt-[58px] xl:px-[353px] " +
          selectedFont +
          (mode === "dark" ? " bg-dark-mode" : "")
        }
      >
        <Header
          mode={mode}
          toggleMode={toggleMode}
          selectedFont={selectedFont}
          handleFontChange={handleFontChange}
        />
        <div
          className={`mt-6 xl:mt-0 flex justify-center rounded-2xl cursor-pointer relative ${
            mode === "dark" ? " bg-dark-search-bar" : " bg-gray-200"
          }`}
        >
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            id="english-word"
            placeholder="Search for any word…"
            className={` w-full rounded-2xl text-base font-bold fill-none block p-3 outline-purple-600 cursor-pointer absolute ${
              mode === "dark" ? " bg-[#1F1F1F]" : "bg-[#F4F4F4]"
            } ${mode === "dark" ? "text-dark-mode-font" : " text-gray-900"} 
            ${isEmptyError ? "border border-solid border-red-500" : ""}`}
          />
          <img
            className="absolute right-[15px] top-[15px]"
            src="./images/icon-search.svg"
            onClick={getDefinition}
            alt="Search Icon"
          />
        </div>
        {isEmptyError ? (
          <div className="mt-[60px] font-normal text-left mt- text-base leading-6 text-red-500">
            Whoops, can't be empty...
          </div>
        ) : null}
        <div className="mt-[80px] flex justify-between items-center">
          <div>
            <div
              className={`font-bold text-2xl leading-8 mb-2 md:text-6xl ${
                mode === "dark" ? "text-dark-mode-font" : " text-gray-900"
              }`}
            >
              {data && data.length > 0 ? <div>{data[0].word}</div> : null}
            </div>
            <div className="font-normal text-base leading-6 text-purple-600">
              {data && data.length > 0 ? <div>{data[0].phonetic}</div> : null}
            </div>
          </div>
          <div className=" w-8">
            {data && data.length > 0 && (
              <div className="flex flex-col gap-2 ">
                {data[0].phonetics.map((phonetic, index) => (
                  <div key={index}>
                    {phonetic.audio && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="75"
                        height="75"
                        viewBox="0 0 75 75"
                        onClick={() => callWord(phonetic.audio)}
                        className="hover:audio-hover w-9 h-9 md:w-14 md:h-14"
                      >
                        <g fill="#A445ED" filRule="evenodd">
                          <circle cx="37.5" cy="37.5" r="37.5" opacity=".25" />
                          <path d="M29 27v21l21-10.5z" />
                        </g>
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {searchPerformed && (data === null || data.length === 0) ? (
          <div className={`flex flex-col justify-center items-center `}>
            <img className="mb-[40px]" src="./images/ups.png" alt="emoji" />
            <p
              className={`font-bold text-xl leading-6 mb-6 ${
                mode === "dark" ? "text-dark-mode-font" : " text-[#2D2D2D]"
              }`}
            >
              No Definitions Found
            </p>
            <span className="text-[#757575] text-center">
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
                          <div
                            className={`font-bold text-[16px] leading-tight md:text-[24px] ${
                              mode === "dark"
                                ? "text-dark-mode-font"
                                : " text-gray-600"
                            }
                            ${
                              selectedFont === "Lora" ||
                              selectedFont === "Inter"
                                ? "italic"
                                : "non-italic"
                            }`}
                          >
                            {meaning.partOfSpeech}
                          </div>
                          <div
                            className={`h-[2px] w-full border border-solid ${
                              mode === "dark"
                                ? "border-dark-mode-line"
                                : "border-[#E9E9E9]"
                            } `}
                          ></div>
                        </div>
                        <h3 className="mb-4 font-normal text-base leading-4 text-dark-mode-example md:text-[20px]">
                          Meaning
                        </h3>
                        <ul
                          className={`flex flex-col gap-y-3 mb-6 ml-4 list-disc ${
                            mode === "dark" ? " marker:text-purple-600" : ""
                          }`}
                        >
                          {meaning.definitions.map(
                            (definition, definitionIndex) => (
                              <li
                                key={definitionIndex}
                                className={`font-normal text-base leading-6 md:text-[18px] ${
                                  mode === "dark"
                                    ? "text-[#FFFFFF]"
                                    : " text-gray-900"
                                }`}
                              >
                                {definition.definition}
                                {definition.example && (
                                  <p className="mt-3 text-dark-mode-example">
                                    {definition.example}
                                  </p>
                                )}
                              </li>
                            )
                          )}
                        </ul>
                        {meaning.synonyms && meaning.synonyms.length > 0 && (
                          <div className="flex gap-10">
                            <h4 className="font-normal text-base md:text-[18px] leading-4 text-dark-mode-example mb-4">
                              Synonym
                            </h4>
                            <li className="font-semibold text-base md:text-[18px] leading-tight text-purple-600 list-none cursor-pointer">
                              {meaning.synonyms.join(", ")}
                            </li>
                          </div>
                        )}

                        {meaning.antonyms && meaning.antonyms.length > 0 && (
                          <div className="flex gap-10">
                            <h4 className="font-normal  md:text-[18px] text-base leading-4 text-dark-mode-example">
                              Antonyms
                            </h4>
                            <li className="font-semibold text-base md:text-[18px] leading-tight text-purple-600 list-none cursor-pointer">
                              {meaning.antonyms.join(", ")}
                            </li>
                          </div>
                        )}
                      </div>
                    ))}
                    <div
                      className={`h-[2px] w-full border border-solid mb-6 mt-8 ${
                        mode === "dark"
                          ? "border-dark-mode-line"
                          : "border-[#E9E9E9]"
                      }`}
                    ></div>
                    <h4 className="font-normal text-base md:text-[18px] leading-4  text-dark-mode-example underline mb-[10px]">
                      Source
                    </h4>
                    <div className="w-full">
                      <a
                        className={`w-full break-words flex justify-start items-start gap-2 mb-14  ${
                          mode === "dark"
                            ? "text-dark-mode-font"
                            : " text-gray-900"
                        }
                         ${
                           selectedFont === "Lora" || selectedFont === "Inter"
                             ? "underline"
                             : ""
                         }`}
                        href={entry.sourceUrls}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {entry.sourceUrls[0].length > 35
                          ? "https://en.wiktionary.org/wiki/"
                          : entry.sourceUrls[0]}
                        <img src="./images/icon-new-window.svg" alt="icon" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
