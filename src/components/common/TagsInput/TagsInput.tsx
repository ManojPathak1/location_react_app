import React, { useState, memo } from "react";
import s from "./TagsInput.scss";

/**
 * Tags Input Components - Controlled Component
 * @param {String} label Label of the tags input
 * @param {Array<String>} value Holds the array of strings of tags
 * @param {Function(Array<String>)} onChange Function called with updated tags  
 */
function TagsInput({ label, value = [], onChange }: { label: string, value: any, onChange: any }) {
  const [inputText, setInputText] = useState("");
  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      const updatedTags = [...value, ...e.target.value.split(",").map((el: any) => el.trim())];
      setInputText("");
      onChange(updatedTags);
    }
  };
  const deleteTag = (index: number) => {
    const newTags = [...value];
    newTags.splice(index, 1);
    onChange(newTags);
  };
  console.log(label);
  return (
    <div className={s.tagsInputContainer}>
      <label>{label}</label>
      <input className="inputText" type="text" value={inputText} onChange={(event) => setInputText(event.target.value)} onKeyDown={handleKeyDown} />
      <div>
        {value.map((tag: any, i: number) => <span key={i}>{tag} <img alt="" onClick={() => deleteTag(i)} height="9" src="./images/close.png" /></span>)}
      </div>
    </div>
  );
}

export default memo(TagsInput);