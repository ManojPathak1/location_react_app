import React, { useState } from "react";
import "./TagsInput.css";

function TagsInput({ label, value, onChange }) {
  const [inputText, setInputText] = useState("");
  const [tags, setTags] = useState(value || []);
  const handleKeyDown = (e) => {
    console.log(e.key);
    if (e.key === 'Enter') {
      const updatedTags = [...tags, ...e.target.value.split(",").map(el => el.trim())];
      setTags(updatedTags);
      setInputText("");
      onChange(updatedTags);
    }
  }
  return <div className="tagsInputContainer">
    <label>{label}</label>
    <input className="inputText" type="text" value={inputText} onChange={(event) => setInputText(event.target.value)} onKeyDown={handleKeyDown} />
    <div>
      {tags.map(tag => <span key={tag}>{tag}</span>)}
    </div>
  </div>;
}

export default TagsInput;