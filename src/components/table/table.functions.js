import { range } from '../../core/utils'

export function shouldResize(event) {
	return event.target.dataset.resize
}

export function isCell(event) {
	return event.target.dataset.type === 'cell'
}

export function matrix($target, $current) {
	const target = $target.id(true)
	const current = $current.id(true)

	const cols = range(current.col, target.col)
	const rows = range(current.row, target.row)

	return cols.reduce((accumulator, col ) => {
		rows.forEach(row => accumulator.push(`${row}:${col}`))
		return accumulator
	}, [])
}

export function nextSelector(key, {col, row}) {
	const MIN_VAL = 0
	switch (key) {
		case 'Enter':
		case 'ArrowDown':
			row++
			break
		case 'Tab':
		case 'ArrowRight':
			col++
			break
		case 'ArrowLeft':
			col = col -1 < MIN_VAL ? MIN_VAL : col -1
			break
		case 'ArrowUp':
			row = row -1 < MIN_VAL ? MIN_VAL : row -1
			break
		default:
			break
	}

	return `[data-id="${row}:${col}"]`
}
