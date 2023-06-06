const Header = ({ selectedFont, handleFontChange }) => {
  return (
    <div className="flex justify-between items-center">
      <img className="mr-[133px]" src="./images/logo.svg" alt="logo" />
      <select
        className="outline-none"
        value={selectedFont}
        onChange={handleFontChange}
      >
        <option value="Inter">Sans Serif</option>
        <option value="Lora">Serif</option>
        <option value="monospace">Mono</option>
      </select>
      <div className=" h-8 w-[1px] bg-gray-500"></div>
      {/* <label for="darkMode" className="h-5 w-10 rounded-[10px] bg-purple-600">
        <input
          className="rounded-[50%]"
          type="checkbox"
          name="darkMode"
          id="darkMode"
        />
        <span></span>
      </label> */}
      <img
        // className={`${mode === "dark" ? "dark-mode" : ""}`}
        // onClick={toggleMode}
        src="./images/icon-moon.svg"
        alt="moon"
      />
    </div>
  );
};

export default Header;
