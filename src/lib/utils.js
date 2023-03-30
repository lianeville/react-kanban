// Function that filters items based on column id
function getItemsForColumn(columnId, items) {
	return items.filter(item => item.boardId === columnId)
}

// Function that matches item labels with labelsRef and updates them
function matchLabels(labelsRef, item) {
	const updatedLabels = {}
	let primaryLabel = null
	Object.entries(item.labels).forEach(([labelId, labelValues]) => {
		const matchingLabel = labelsRef[labelId]
		if (matchingLabel) {
			const matchingItem = matchingLabel.labels[labelId]
			if (matchingItem) {
				if (matchingLabel.primary) {
					primaryLabel = matchingItem
				}
				updatedLabels[labelId] = matchingItem
			}
		}
	})
	return { ...item, labels: updatedLabels, primaryLabel }
}

// Main function that processes columns and items
export function processColumns(columns, items, labelsRef, callback) {
	Object.values(columns).forEach(column => {
		const columnItems = getItemsForColumn(column.id, items)
		const updatedItems = columnItems.map(item => matchLabels(labelsRef, item))
		callback(column.id, updatedItems)
	})
}

export function getContrastColor(bgColor) {
	// Convert bgColor to an RGB value
	const hexColor = bgColor.replace(/^#/, "")
	const red = parseInt(hexColor.substr(0, 2), 16)
	const green = parseInt(hexColor.substr(2, 2), 16)
	const blue = parseInt(hexColor.substr(4, 2), 16)

	// Calculate the relative luminance of the color
	const luminance = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255

	// Return either "black" or "white" depending on the relative luminance
	return luminance > 0.5 ? "black" : "white"
}