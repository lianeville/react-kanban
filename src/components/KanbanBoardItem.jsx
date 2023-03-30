import React, { useRef } from "react"
import interact from "interactjs"
import ItemLabel from "./ItemLabel"

function KanbanBoardItem(props) {
	const { title, labels, primaryLabel } = props
	let position = { x: 0, y: 0 }

	const dragRef = useRef(null)

	// initialize the draggable behavior on mount
	React.useEffect(() => {
		if (dragRef.current) {
			interact(dragRef.current).draggable({
				listeners: {
					start(event) {
						console.log(event)
					},
					move(event) {
						position.x += event.dx
						position.y += event.dy

						event.target.style.transform = `translate(${position.x}px, ${position.y}px)`
					},
					end(event) {
						position = { x: 0, y: 0 }
						event.target.style.transform = "translate(0px, 0px)"
					},
				},
			})
		}
	}, [props])

	// remove visual indication on drag end
	const handleDragEnd = event => {
		// Remove any visual indication that the item can be dropped
	}

	return (
		<div className="kanban-item p-1" ref={dragRef} onDragEnd={handleDragEnd}>
			<div className="bg-slate-500 rounded-lg p-1">
				{primaryLabel && (
					<ItemLabel
						key={primaryLabel.id}
						title={primaryLabel.title}
						color={primaryLabel.color}
					/>
				)}
				<p className="m-1 text-left w-full">{title}</p>
			</div>
		</div>
	)
}

export default KanbanBoardItem
