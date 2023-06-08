import React from "react";
import Select from "react-select";

const Header = ({ mode, toggleMode, selectedFont, handleFontChange }) => {
  return (
    <div className="flex justify-between m-auto items-center xl:pb-[52px]">
      <img className="" src="./images/logo.svg" alt="logo" />
      <div className="w-2/3 md:w-1/3 flex justify-between items-center gap-3">
        <Select
          value={selectedFont}
          options={[
            { value: "Sans-serif", label: "Sans Serif" },
            { value: "Serif", label: "Serif" },
            { value: "Mono", label: "Mono" },
          ]}
          placeholder={selectedFont}
          onChange={handleFontChange}
          styles={{
            dropdownIndicator: (provided, state) => ({
              ...provided,
              color: mode === "dark" ? "#A445ED" : "#A445ED",
            }),
            placeholder: (provided, state) => ({
              ...provided,
              color: mode === "dark" ? "#ffffff" : "#2D2D2D",
              fontWeight: "700",
            }),
            valueContainer: (provided, state) => ({
              ...provided,
              backgroundColor: mode === "dark" ? "#050505" : "",
            }),
            control: (provided, state) => ({
              ...provided,
              border: "none",
              backgroundColor: "none",
              border: state.isFocused ? 0 : 0,
              boxShadow: state.isFocused ? 0 : 0,
              "&:hover": {
                border: state.isFocused ? 0 : 0,
              },
            }),
            option: (provided, state) => ({
              ...provided,
              cursor: "pointer",
              fontWeight: "700",
              backgroundColor: mode === "dark" ? "#1F1F1F" : "",
              "&:hover": {
                color: "#A445ED",
              },
            }),
            indicatorsContainer: (provided, state) => ({
              ...provided,
              backgroundColor: mode === "dark" ? "#050505" : "",
            }),
            indicatorSeparator: (provided, state) => ({
              ...provided,
              display: "none",
            }),
            group: (provided, state) => ({
              ...provided,
              color: mode === "dark" ? "#A445ED" : "#A445ED",
            }),
            menu: (provided, state) => ({
              ...provided,
              width: "160px",
              borderRadius: "16px",
              backgroundColor: mode === "dark" ? "#1F1F1F" : "#FFFFFF",
              boxShadow:
                mode === "dark"
                  ? "0px 5px 30px #A445ED"
                  : "0px 5px 30px rgba(0, 0, 0, 0.1)",
              marginTop: "15px",
            }),
            menuList: (provided, state) => ({
              ...provided,
              color: mode === "dark" ? "#ffffff" : "",
              fontWeight: "normal",
            }),
          }}
        />

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
