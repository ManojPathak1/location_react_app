import React, { useState } from "react";

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
  return <div style={{display: "flex", flexDirection: "column", padding: "10px"}}>
    <label style={{ fontSize: "13px" }}>{label}</label>
    <input className="inputText" style={{ marginTop: "5px" }} type="text" value={inputText} onChange={(event) => setInputText(event.target.value)} onKeyDown={handleKeyDown} />
    <div style={{ padding: "10px 0", display: "flex", flexWrap: "wrap" }}>
      {tags.map(tag => <span style={{ fontSize: "12px", padding: "4px 12px", border: "1px #ccc solid", backgroundColor: "#eee", borderRadius: "30px", margin: "5px 5px" }} key={tag}>{tag}</span>)}
    </div>
  </div>;
}

export default TagsInput;