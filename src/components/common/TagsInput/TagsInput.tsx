import React, { useState, memo, ReactElement } from "react";
import s from "./TagsInput.scss";

/**
 * Tags Input Components - Controlled Component
 * @param {String} label Label of the tags input
 * @param {Array<String>} value Holds the array of strings of tags
 * @param {Function(Array<String>)} onChange Function called with updated tags  
 */

interface TagsInputProps {
  label: string,
  value: string[],
  onChange: Function
}

function TagsInput({ label, value = [], onChange }: TagsInputProps) {
  const [inputText, setInputText]: [string, Function] = useState("");
  const handleKeyDown = (e: any): void => {
    if (e.key === 'Enter') {
      const updatedTags: string[] = [...value, ...e.target.value.split(",").map((el: string) => el.trim())];
      setInputText("");
      onChange(updatedTags);
    }
  };
  const deleteTag = (index: number): void => {
    const newTags = [...value];
    newTags.splice(index, 1);
    onChange(newTags);
  };
  console.log(s);
  return (
    <div className={s.tagsInputContainer}>
      <label>{label}</label>
      <input type="text" value={inputText} onChange={(event) => setInputText(event.target.value)} onKeyDown={handleKeyDown} />
      <div>
        {value.map((tag: string, i: number): ReactElement => <span key={i}>{tag} <img alt="" onClick={() => deleteTag(i)} height="9" src="./images/close.png" /></span>)}
      </div>
    </div>
  );
}

export default memo(TagsInput);