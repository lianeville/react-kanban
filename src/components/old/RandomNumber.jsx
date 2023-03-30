import React, { useState, useEffect } from "react"

function RandomNumber(props) {
	const [number, setNumber] = useState(0)
	useEffect(() => {
		const randomNumber = Math.floor(Math.random() * 100) + 1
		setNumber(randomNumber)
	}, [])

	return (
		<div>
			<h2>Random Number: {number}</h2>
		</div>
	)
}

export default RandomNumber
