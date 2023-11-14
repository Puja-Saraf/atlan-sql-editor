/*eslint-disable*/
import React, { useMemo, useRef, useState } from "react";

export default function SQLEditor({ code, setCode }) {

  const [currentWord, setCurrentWord] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleTextareaChange = (e) => {
    setCode(e.target.value);
    if (code === "") {
      setCurrentWord("");
      setSuggestions([]);
    } else {
      const words = e.target.value.split(/\s+/);
      const cw = words[words.length - 1];
      setCurrentWord(cw);
      if (cw.length >= 2) {
        const suggestedWords = trie.suggest(cw.toUpperCase());
        setSuggestions(suggestedWords);
      } else {
        setSuggestions([]);
      }
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setCode((prevCode) => {
      const words = prevCode.split(" ");
      words[words.length - 1] = suggestion;
      return words.join(" ");
    });
    setCurrentWord("");
    setSuggestions([]);
  };

  const lineCount = useMemo(() => code.split("\n").length, [code]);
  const lines = useMemo(
    () => Array.from({ length: Math.max(10, lineCount) }, (_index, i) => i + 1),
    [lineCount]
  );

  const lineCountRef = useRef(null);
  const textareaRef = useRef(null);

  const handleEditorScroll = () => {
    if (lineCountRef.current && textareaRef.current) {
      lineCountRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  return (
    <div className="border border-1 border-slate-200 rounded-lg w-[100%] h-[16rem] bg-white relative">
      <div
        className="rounded-l-md flex flex-col overflow-y-hidden h-[16rem] text-right absolute text-black bg-slate-200 pt-2 pb-2 pl-2.5 pr-2.5 w-10"
        ref={lineCountRef}
      >
        {lines.map((num, _index) => (
          <div
            className={`${num <= lineCount ? "text-[#40aaf5]" : ""}`}
            key={_index}
          >
            {num}
          </div>
        ))}
      </div>
      <textarea
        className="rounded-lg resize-none pl-[3.5rem] pt-2 pb-2 w-[100%] border-none h-[100%] outline-none"
        onChange={handleTextareaChange}
        onScroll={handleEditorScroll}
        ref={textareaRef}
        placeholder={"Select any of the available Queries."}
        value={code}
        wrap="off"
      />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
