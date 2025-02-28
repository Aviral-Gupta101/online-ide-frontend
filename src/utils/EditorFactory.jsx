import MyEditor from "../components/MyEditor";

function EditorFactory({ language }) {

  if (language === "CPP")
    return <MyEditor
      title="C++ Online Compiler" fileExtension={"cpp"} language={"cpp"}    />

  else if (language == "JAVA")
    return <MyEditor
      title="Java Online Compiler" fileExtension={"java"} language={"java"}/>

  else if (language == "PYTHON")
    return <MyEditor title="Python Online Compiler" fileExtension={"py"} language={"python"}/>

  else
    throw new Error("Lanugage not supported: ", language);

}

export default EditorFactory;