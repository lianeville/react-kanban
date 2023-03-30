import React, { useState } from "react"

function TextInput(props) {
	const [text, changeText] = useState("")

	const handleChange = event => {
		changeText(event.target.value)
	}

	return (
		<div>
			<label>Enter text:</label>
			<input className="m-2 bg-slate-100" type="text" value={text} onChange={handleChange} />
			<p>You entered: {text}</p>
		</div>
	)
}

export default TextInput
