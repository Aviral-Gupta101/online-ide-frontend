import MonacoEditor from "@monaco-editor/react";
import axios from "axios";
import { useState } from "react";
import SERVER_ADDRESS from "../utils/global/serverAddress";
import LanguageDropdown from "./Dropdown";

function MyEditor({ title, language, fileExtension }) {

  const [ideTitle, setIdeTitle] = useState(title);
  const [ideLanguage, setIdeLanguage] = useState(language);
  const [ideFileExtension, setIdeFileExtension] = useState(fileExtension);

  const [code, setCode] = useState(`#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!";\n    return 0;\n}`);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false); // For showing a loader


  async function executeCodeHandler() {
    setIsRunning(true); // Show loading state
    try {
      const payload = {
        compilerType: String(ideLanguage).toUpperCase(),
        input: input,
        code: code,
      };

      console.log("Executing Code:", payload);

      const response = await axios.post(`${SERVER_ADDRESS}/online-compiler/run-code`, payload);

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
      <div className="flex flex-col lg:flex-row flex-1 border border-[#282828] rounded-b-md overflow-hidden">
        {/* Code Editor */}
        <div className="flex-[3]">
          <MonacoEditor
            height="100%"
            defaultLanguage={language}
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
        <InputOutputPannel />

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

  function InputOutputPannel() {
    return <div className="flex-1/3 lg:flex-1/12 flex flex-col  bg-[#1e1e1e] border-l border-[#282828]">
      {/* Input Box */}
      <div className="flex flex-col flex-1 p-2">
        <span className="text-[#D4D4D4] text-center font-medium w-full border-b border-[#282828]">
          INPUT
        </span>
        <textarea
          className="p-2 w-full h-full text-[#D4D4D4] bg-[#1e1e1e] focus:outline-none resize-none"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
      </div>

      {/* Output Box */}
      <div className="flex flex-col flex-1 p-2 border-t border-[#282828]">
        <span className="text-[#D4D4D4] text-center font-medium w-full border-b border-[#282828]">
          OUTPUT
        </span>
        <div className="p-2 w-full h-full text-[#D4D4D4] bg-[#1e1e1e] overflow-scroll">
          {output}
        </div>
      </div>
    </div>
  }
}

export default MyEditor;
