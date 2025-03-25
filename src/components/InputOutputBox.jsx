import React, { memo } from "react";

const InputOutputPannel = memo(({ input, setInput, output }) => {
  return (
    <div className="flex-1/3 lg:flex-1/12 flex flex-col bg-[#1e1e1e] border-l border-[#282828]">
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
        <div className="p-2 w-full flex-1 max-h-[200px] lg:max-h-[300px] max-w-[100%] overflow-x-auto overflow-y-auto text-[#D4D4D4] text-wrap bg-[#1e1e1e] whitespace-pre-wrap">
          {output}
        </div>
      </div>
    </div>
  );
});

export default InputOutputPannel;
