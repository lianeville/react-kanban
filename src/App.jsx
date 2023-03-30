// import { useState, useEffect } from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./App.css"
import KanbanBoard from "./components/KanbanBoard"
import dummyData from './dummyData.json';

function App() {

	return (
		<div className="App w-full h-full">
         {/* <div className="overflow-x-scroll w-full h-full"> */}
			   <KanbanBoard columns={dummyData.columns} labelsRef={dummyData.labelsRef} items={dummyData.items} />
         {/* </div> */}
		</div>
	)
}

export default App
