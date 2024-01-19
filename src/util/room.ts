import { customAlphabet } from 'nanoid'
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const nanoid = customAlphabet(alphabet, 16)

export const GODS = {
  IDONA: 'idona',
  TENOS: 'tenos',
  VELARA: 'velara',
  WENDARR: 'wendarr'
} as const

export const GOD_LABELS = {
  [GODS.IDONA]: 'Idona',
  [GODS.TENOS]: 'Tenos',
  [GODS.VELARA]: 'Velara',
  [GODS.WENDARR]: 'Wendarr'
} as const

export const ROOM_TYPES = {
  BLACKSMITH: 'blacksmith',
  COVE: 'cove',
  LIBRARY: 'library',
  MINE: 'mine',
  MUSH_ROOM: 'mush_room',
  PAINTING: 'painting',
  VENDOR: 'vendor',
  DIGSITE: 'digsite',
  CRYSTAL_CAVES: 'crystal_caves',
  DRAGON: 'dragon',
  X_MARK: 'x_mark',
  WILD_WEST: 'wild_west',
  FACTORY: 'factory',
  VILLAGE: 'village',
  COMMON: 'common',
  PORTAL: 'portal'
} as const

export const ROOM_LABELS = {
  [ROOM_TYPES.BLACKSMITH]: 'Blacksmith',
  [ROOM_TYPES.COVE]: 'Cove',
  [ROOM_TYPES.LIBRARY]: 'Library',
  [ROOM_TYPES.MINE]: 'Mine',
  [ROOM_TYPES.MUSH_ROOM]: 'Mush Room',
  [ROOM_TYPES.PAINTING]: 'Painting',
  [ROOM_TYPES.VENDOR]: 'Vendor',
  [ROOM_TYPES.DIGSITE]: 'Digsite',
  [ROOM_TYPES.CRYSTAL_CAVES]: 'Crystal Caves',
  [ROOM_TYPES.DRAGON]: 'Dragon',
  [ROOM_TYPES.X_MARK]: 'X Mark',
  [ROOM_TYPES.WILD_WEST]: 'Wild West',
  [ROOM_TYPES.FACTORY]: 'Factory',
  [ROOM_TYPES.VILLAGE]: 'Village',
  [ROOM_TYPES.COMMON]: 'Common',
  [ROOM_TYPES.PORTAL]: 'Portal'
} as const

export type Direction = 'north' | 'south' | 'east' | 'west'
export interface Room {
  id: string
  style: 'none' | 'portal' | 'idona' | 'tenos' | 'velara' | 'wendarr'
  type?: (typeof ROOM_TYPES)[keyof typeof ROOM_TYPES]
  label?: string
  purchased?: boolean
  connections?: { id: string; direction: Direction }[]
}

const defaultRoom = {
  style: 'none'
}

export const createRoom = (data: Partial<Room>) => {
  return {
    id: nanoid(),
    ...defaultRoom,
    ...data
  } as Room
}
