import React, { useState } from "react";
import { AutocompleteProps, organization } from "../../Types/types";
import "./autocomplete.css";

const Autocomplete = (props: AutocompleteProps) => {
  const [active, setActive] = useState<number>(0);
  const [options, setOptions] = useState<organization[]>([]);
  const [input, setInput] = useState<string>("");
  const { label, data, setValue, placeholder } = props;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input: string = e.currentTarget.value;
    if (input === "") {
      setOptions([]);
      setInput("");
      return;
    }
    const result: organization[] = data.filter((item: organization) => {
      const dataTosearch: string = JSON.parse(
        JSON.stringify(item.organization)
      );
      return dataTosearch.toLowerCase().includes(input.toLowerCase());
    });
    setOptions(result);
    setActive(0);
    setOptions(result);
    setInput(input);
  };
  const onClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    setValue(e.currentTarget.innerText);
    setActive(0);
    setOptions([]);
    setInput(e.currentTarget.innerText);
  };
  const renderAutocomplete = () => {
    if (input) {
      if (options.length) {
        return (
          <ul className="autocomplete">
            {options.map((option, index) => {
              let className;
              if (index === active) {
                className = "active";
              }
              return (
                <li className={className} key={Math.random()} onClick={onClick}>
                  {option.organization}
                </li>
              );
            })}
          </ul>
        );
      }
    }
    return <></>;
  };
  return (
    <div className="fields">
      <div className="heading">
        <span>{label}</span>
      </div>
      <div className="field">
        <input
          type="text"
          onChange={onChange}
          value={input}
          placeholder={placeholder}
        />
        {renderAutocomplete()}
      </div>
    </div>
  );
};
export default Autocomplete;
