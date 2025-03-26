import MonacoEditor from "@monaco-editor/react";
import axios from "axios";
import { useEffect, useState } from "react";
import SERVER_ADDRESS from "../utils/global/serverAddress";
import LanguageDropdown from "./LanguageDropdown";
import InputOutputPannel from "./InputOutputBox";

const editorDefaultValues = {

  "cpp": {
    title: "C++ Online Compiler",
    fileExtension: "cpp",
    code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!";\n    return 0;\n}`
  },
  "java": {
    title: "Java Online Compiler",
    fileExtension: "java",
    code: `class Main {\r\n    public static void main(String[] args) {\r\n        System.out.println(\"Hello, World!\"); \r\n    }\r\n}`
  },
  "python": {
    title: "Python Online Compiler",
    fileExtension: "py",
    code: "a = 10\r\nb = 20\r\nprint(\"SUM OF TWO NUMBER IS: \", a+b)"
  }
};

function MyEditor({ language }) {

  if (language != "cpp" && language != "java" && language != "python")
    throw new Error("Invalid language, available lanauge {cpp, java, python}");

  const [ideTitle, setIdeTitle] = useState(editorDefaultValues[language]["title"]);
  const [ideLanguage, setIdeLanguage] = useState(language);
  const [ideFileExtension, setIdeFileExtension] = useState(editorDefaultValues[language]["fileExtension"]);

  const [code, setCode] = useState(editorDefaultValues[language]["code"]);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false); // For showing a loader

  useEffect(() => {
    if (ideLanguage === "cpp" || ideLanguage !== language) { // Only update if language is different
      setIdeTitle(editorDefaultValues[ideLanguage]["title"]);
      setIdeFileExtension(editorDefaultValues[ideLanguage]["fileExtension"]);
      setCode(editorDefaultValues[ideLanguage]["code"]);
      language = ideLanguage;
    }
  }, [ideLanguage, language]);


  async function executeCodeHandler() {
    setIsRunning(true); // Show loading state
    try {
      const payload = {
        compilerType: String(ideLanguage).toUpperCase(),
        input: input,
        code: code,
      };

      const response = await axios.post(`/online-compiler/run-code`, payload);

      setOutput(response.data.output || "Execution Complete!");
    } catch (error) {
      setOutput("Error running the code.");
      console.error(error);
    }
    setIsRunning(false);
  }

  return (
    <div className="h-screen p-5 bg-[#1e1e1e] flex flex-col">
      <div className="flex flex-row gap-2  pb-2">
        <h2 className="text-white text-xl font-semibold mb-2">{ideTitle}</h2>
        <LanguageDropdown select={ideLanguage} onSelect={setIdeLanguage} />
      </div>

      {/* File name + Run button */}
      <FilenameAndRunbutton />

      {/* Code Editor + Input/Output Panel */}
      <div className="flex flex-col lg:flex-row flex-1 border border-[#282828] rounded-b-md">
        {/* Code Editor */}
        <div className="flex-[3]">
          <MonacoEditor
            height="100%"
            defaultLanguage={"cpp"}
            language={ideLanguage}
            theme="vs-dark"
            value={code}
            onChange={(newCode) => setCode(newCode)}
            options={{
              fontSize: 16,
              minimap: { enabled: false },
              automaticLayout: true,
            }}
          />
        </div>

        {/* Input & Output Panel */}
        <InputOutputPannel input={input} setInput={setInput} output={output} />


      </div>
    </div>
  );

  function FilenameAndRunbutton() {
    return (
      <div className="bg-[#252526] text-white px-4 py-2 text-lg flex justify-between items-center rounded-t-md">
        📄 Main.{ideFileExtension}
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-lg text-sm flex items-center"
          onClick={executeCodeHandler}
          disabled={isRunning}
        >
          {isRunning ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
          ) : (
            "▶ Run"
          )}
        </button>
      </div>
    )
  }

}

export default MyEditor;