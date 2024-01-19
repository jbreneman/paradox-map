import type { Room, Direction } from './room'

export type GridRow = Array<Room | null>
export type Grid = GridRow[]

const createRow = (size: number, value = null) => {
  return Array(size).fill(value)
}

const getItemXY = (grid: Grid, item: Room): { x?: number; y?: number } => {
  return grid.reduce((acc, cur, idx) => {
    const index = cur.findIndex((i) => i?.id === item.id)

    if (index !== -1) {
      return { x: index, y: idx }
    }

    return acc
  }, {})
}

const getXDelta = (x: number, direction: Direction) => {
  if (direction === 'west') {
    return x - 1
  }

  if (direction === 'east') {
    return x + 1
  }

  return x
}

const getYDelta = (y: number, direction: Direction) => {
  if (direction === 'north') {
    return y - 1
  }

  if (direction === 'south') {
    return y + 1
  }

  return y
}

const getDelta = (grid: Grid, item: Room, anchor: Room) => {
  const { x, y } = getItemXY(grid, anchor)
  const connection = anchor.connections?.find((connection) => {
    return connection.id === item.id
  })

  if (x != null && y != null && connection) {
    return { x: getXDelta(x, connection.direction), y: getYDelta(y, connection.direction) }
  }

  return null
}

export const createGrid = () => {
  const size = 27
  return Array(size).fill(createRow(size))
}

export const placeItem = (
  grid: Grid,
  item: Room,
  { anchor, x, y }: { anchor?: Room; x?: number; y?: number }
): Grid => {
  if (anchor) {
    const delta = getDelta(grid, item, anchor)

    if (delta) {
      return placeItem(grid, item, delta)
    }

    return grid
  }

  return grid.map((row, index) => {
    if (index === y) {
      return row.map((cell, idx) => {
        if (idx === x) {
          return item
        }

        return cell
      })
    }

    return row
  })
}

export const updateItem = (grid: Grid, item: Room) => {
  return grid.map((row) => {
    const isInRow = row.find((cell) => cell?.id === item.id)
    if (isInRow) {
      return row.map((cell) => {
        if (cell?.id === item.id) {
          return item
        }

        return cell
      })
    }

    return row
  })
}

export const getInverseDirection = (direction: Direction) => {
  const map = {
    south: 'north',
    north: 'south',
    east: 'west',
    west: 'east'
  }

  return map[direction] as Direction
}

export const getAdjacentItem = (grid: Grid, item: Room, direction: Direction) => {
  const { x, y } = getItemXY(grid, item)
  if (x != null && y != null) {
    const coords = { x: getXDelta(x, direction), y: getYDelta(y, direction) }
    return grid[coords.y][coords.x]
  }

  return null
}
