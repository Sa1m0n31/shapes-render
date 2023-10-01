import React from 'react';
import './static/style.css';
import ProjectForm from "./components/ProjectForm";
import ProjectInfoDisplay from "./components/ProjectInfoDisplay";
import Canvas from "./components/Canvas";
import {Provider} from "react-redux";
import {store} from "./store";

function App() {
  return <Provider store={store}>
    <div className="container">
      <ProjectForm />
      <ProjectInfoDisplay />
      <Canvas />
    </div>
  </Provider>
}

export default App;
