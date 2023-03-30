import React, { useState } from "react"

function Counter(props) {
	const [count, setCount] = useState(5)
	return (
		<div>
			<h2>Count: {count}</h2>
			<button onClick={() => setCount(count + 1)}>Increment</button>
			<button onClick={() => setCount(count - 1)}>Decrement</button>
		</div>
	)
}

export default Counter
