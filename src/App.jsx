import { useState } from "react";
import EditorFactory from "./utils/EditorFactory";
import HomePage from "./pages/HomePage";

function App() {

  return (
      <EditorFactory 
      language={"CPP"} 
    />
    // <HomePage /> 
  );
}

export default App
