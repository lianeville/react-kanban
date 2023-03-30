import React from "react"
import KanbanBoardColumn from "./KanbanBoardColumn"
import { processColumns } from "../lib/utils"

function KanbanBoard(props) {
	const { items, columns, labelsRef } = props

	processColumns(columns, items, labelsRef, (columnId, columnItems) => {
		columns[columnId].items = columnItems
	})

	return (
		<div className="flex overflow-x-scroll w-full h-full">
			{Object.values(columns).map((column, id) => {
				return (
					<KanbanBoardColumn
						key={id}
						id={id}
						title={column.title}
						items={column.items}
					/>
				)
			})}
		</div>
	)
}

export default KanbanBoard
