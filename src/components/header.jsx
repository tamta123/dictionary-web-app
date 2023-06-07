const Header = ({ mode, toggleMode, selectedFont, handleFontChange }) => {
  return (
    <div className="flex justify-between m-auto items-center">
      <img className="" src="./images/logo.svg" alt="logo" />
      <div className="w-2/3 md:w-1/3 flex justify-between items-center gap-3">
        <div className="flex">
          <select
            className={`outline-none appearance-none cursor-pointer ${
              mode === "dark" ? " bg-dark-mode" : "bg-[#FFFFFF]"
            } ${mode === "dark" ? "text-[#FFFFFF]" : " text-gray-900"}`}
            value={selectedFont}
            onChange={handleFontChange}
          >
            <option
              className={`text-center cursor-pointer ${
                mode === "dark" ? "text-[#FFFFFF]" : " text-gray-900"
              }`}
              value="Inter"
            >
              Sans Serif
            </option>
            <option
              className={` text-center cursor-pointer ${
                mode === "dark" ? "text-[#FFFFFF]" : " text-gray-900"
              }`}
              value="Lora"
            >
              Serif
            </option>
            <option
              className={` text-center cursor-pointer ${
                mode === "dark" ? "text-[#FFFFFF]" : " text-gray-900"
              }`}
              value="monospace"
            >
              Mono
            </option>
          </select>
          <img
            className="mr-[5px]"
            src="./images/icon-arrow-down.svg"
            alt="arrow down"
          />
        </div>
        <label
          htmlFor="darkMode"
          className={`h-5 w-10 rounded-[10px] relative cursor-pointer ${
            mode === "dark" ? "bg-purple-600" : "bg-[#757575]"
          }`}
        >
          <input
            className="sr-only peer"
            type="checkbox"
            id="darkMode"
            onClick={toggleMode}
          />
          <span className="w-2/5 h-4/5 bg-white absolute rounded-[10px] left-[2px] top-[2px] peer-checked:left-[22px] transition-all duration-500"></span>
        </label>

        <img
          className={`${mode === "dark" ? "hidden" : "block"}`}
          src="./images/icon-moon.svg"
          alt="moon"
        />
        <img
          className={`${mode === "dark" ? "block" : "hidden"}`}
          src="./images/moon-icon-dark.svg"
          alt="moon"
        />
      </div>
    </div>
  );
};

export default Header;
