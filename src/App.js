import React from "react";
import FirebaseAuthHookProvider from "./firebase/FirebaseAuthHook";
import FirebaseDataHookProvider from "./firebase/FirebaseDataHook";
import Routing from "./routes/Routing";
import "./themes/stylesheet.css";

function App() {
  return (
    <div className="App">
      <FirebaseAuthHookProvider>
        <FirebaseDataHookProvider>
          <Routing />
        </FirebaseDataHookProvider>
      </FirebaseAuthHookProvider>
    </div>
  );
}

export default App;
