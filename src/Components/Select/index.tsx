import React, { useState } from "react";
import { SelectProps } from "../../Types/types";
import "./select.css";

const Select = (props: SelectProps) => {
  const { options, setValue, value } = props;
  const [active, setActive] = useState(false);
  const handleOptionSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setActive(false);
  };
  return (
    <div>
      <form id="app-cover">
        <div id="select-box">
          <input
            type="checkbox"
            id="options-view-button"
            onClick={() => setActive(true)}
          />
          <div id="select-button" className="brd">
            <div id="selected-value">
              <span>{value ? value : "Select an organization"}</span>
            </div>
            <div id="chevrons">
              <i className="fas fa-chevron-up"></i>
              <i className="fas fa-chevron-down"></i>
            </div>
          </div>
          {active && (
            <div id="options">
              {options.map((option, index) => {
                return (
                  <div className="option" key={`option ${index}`}>
                    <input
                      className="s-c top"
                      type="radio"
                      name="organization"
                      value={option}
                      onChange={handleOptionSelect}
                    />
                    <input
                      className="s-c bottom"
                      type="radio"
                      name="organization"
                      value={option}
                    />
                    <span className="label">{option}</span>
                    <span className="opt-val">{option}</span>
                  </div>
                );
              })}
              <div id="option-bg"></div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Select;
