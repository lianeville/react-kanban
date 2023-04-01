import React, { useRef } from "react"
import { insertAfter } from "../lib/utils"
import interact from "interactjs"
import ItemLabel from "./ItemLabel"

function KanbanBoardItem(props) {
	const { title, labels, primaryLabel } = props
	let position = { x: 0, y: 0 }

	const dragRef = useRef(null)

	// initialize the draggable behavior on mount
	React.useEffect(() => {
		let position = { x: 0, y: 0 }
		let dropY = 0 // Define dropY variable to store clientY during ondragenter
		let placeholderEl = null

		if (dragRef.current) {
			interact(dragRef.current)
				.draggable({
					listeners: {
						start(event) {
							console.log("drag started")
							event.target.style.zIndex = "999"
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
				.dropzone({
					accept: ".kanban-item",
					ondragenter: function (event) {
						event.stopImmediatePropagation() // prevents multiple firings
						const draggedOntoEl = event.currentTarget
						const placeHolderEl = event.relatedTarget.cloneNode(true)
						placeHolderEl.style.opacity = 0.25
						placeHolderEl.style.zIndex = "0"
						placeHolderEl.style.transform = ""
						placeHolderEl.classList.add("kanban-placeholder")
						insertAfter(draggedOntoEl, placeHolderEl)

						if (dropY === undefined) {
							// set dropY if it hasn't been set yet
							dropY = event.clientY
						}
					},
					ondragleave: function (event) {
						removePlaceholders()
					},
					ondrop: function (event) {
						removePlaceholders()
						const draggedOntoEl = event.currentTarget
						const newEl = event.relatedTarget
						const parentDiv = draggedOntoEl.closest(".column-items")
						if (dropY < event.clientY) {
							insertAfter(draggedOntoEl, newEl)
						} else {
							parentDiv.insertBefore(newEl, draggedOntoEl)
						}
					},
				})
				.on("dropactivate", function (event) {
					event.target.classList.add("drop-activated")
				})
		}
	}, [props])

	const removePlaceholders = event => {
		document.querySelectorAll(".kanban-placeholder").forEach(function (elem) {
			elem.remove()
		})
	}

	return (
		<div className="kanban-item p-1" ref={dragRef}>
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
