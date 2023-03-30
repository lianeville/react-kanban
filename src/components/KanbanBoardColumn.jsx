import React, { useRef, useEffect } from "react"
import KanbanBoardItem from "./KanbanBoardItem"
import interact from "interactjs"

function dropHandler(event) {
	console.log(event)
}

function KanbanBoardColumn(props) {
	const { title, id, items } = props

	const dropRef = useRef(null)

	// interact(".dropzone").dropzone({
	// 	accept: ".kanban-item",
	// 	ondrop: dropHandler
	// })

	React.useEffect(() => {
		if (dropRef.current) {
			interact(dropRef.current)
				.dropzone({
					accept: '.kanban-item',
					ondrop: function (event) {
						console.log('event', event)
						const columnEl = event.currentTarget
						const itemEl = event.relatedTarget
						columnEl.append(itemEl)
					},
				})
				.on("dropactivate", function (event) {
					// console.log('aaaa')
					event.target.classList.add("drop-activated")
				})
		}
	}, [props])

	return (
		<div className="p-2">
			<div className="bg-slate-700 rounded-xl">
				<h3 className="text-start pl-5 p-1">{title}</h3>
				<div
					ref={dropRef}
					className="column-items bg-slate-600 p-2 w-[300px] min-w-[300px] rounded-xl"
				>
					{Object.values(items).map(
						({ id, title, labels, primaryLabel }) => (
							<KanbanBoardItem
								key={id}
								title={title}
								labels={labels}
								primaryLabel={primaryLabel}
							/>
						)
					)}
				</div>
			</div>
		</div>
	)
}

export default KanbanBoardColumn
