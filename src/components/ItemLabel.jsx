import React from "react"
import { getContrastColor } from "../lib/utils"

function ItemLabel(props) {
	const { color, title } = props

	const labelStyles = {
		backgroundColor: "#" + color,
		color: getContrastColor(color)
	}

	return (
		<div style={labelStyles} className="w-fit px-1 m-1 rounded text-sm">
			<span className="">{title}</span>
		</div>
	)
}

export default ItemLabel
