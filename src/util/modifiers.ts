export interface Modifier {
  type:
    | (typeof POSITIVE_MODIFIERS)[keyof typeof POSITIVE_MODIFIERS]
    | (typeof NEGATIVE_MODIFIERS)[keyof typeof NEGATIVE_MODIFIERS]
  amount: number
}

export const POSITIVE_MODIFIERS = {
  WOODEN: 'wooden',
  GILDED: 'gilded',
  ORNATE: 'ornate',
  LIVING: 'living',
  WEALTHY: 'wealthy',
  PLENTIFUL: 'plentiful',
  EXTENDED: 'extended',
  SOUL_HARVEST: 'soul_harvest',
  OPULENT: 'opulent',
  LUCKY: 'lucky',
  PHOENIX: 'phoenix'
} as const

export const NEGATIVE_MODIFIERS = {
  CHUNKY_MOBS: 'chunky_mobs',
  RAPID_MOBS: 'rapid_mobs',
  FURIOUS: 'furious',
  WILD: 'wild',
  MORE_CHAMPIONS: 'more_champions',
  TRAPPED: 'trapped',
  SHORTENED: 'shortened'
} as const

export const MODIFIER_LABELS = {
  [POSITIVE_MODIFIERS.WOODEN]: 'Wooden',
  [POSITIVE_MODIFIERS.GILDED]: 'Gilded',
  [POSITIVE_MODIFIERS.ORNATE]: 'Ornate',
  [POSITIVE_MODIFIERS.LIVING]: 'Living',
  [POSITIVE_MODIFIERS.WEALTHY]: 'Wealthy',
  [POSITIVE_MODIFIERS.PLENTIFUL]: 'Plentiful',
  [POSITIVE_MODIFIERS.EXTENDED]: 'Extended',
  [POSITIVE_MODIFIERS.SOUL_HARVEST]: 'Soul Harvest',
  [POSITIVE_MODIFIERS.OPULENT]: 'Opulent',
  [POSITIVE_MODIFIERS.LUCKY]: 'Lucky',
  [POSITIVE_MODIFIERS.PHOENIX]: 'Phoenix',
  [NEGATIVE_MODIFIERS.CHUNKY_MOBS]: 'Chunky mobs',
  [NEGATIVE_MODIFIERS.RAPID_MOBS]: 'Rapid mobs',
  [NEGATIVE_MODIFIERS.FURIOUS]: 'Furious',
  [NEGATIVE_MODIFIERS.WILD]: 'Wild',
  [NEGATIVE_MODIFIERS.MORE_CHAMPIONS]: 'More champions',
  [NEGATIVE_MODIFIERS.TRAPPED]: 'Trapped',
  [NEGATIVE_MODIFIERS.SHORTENED]: 'Shortened'
} as const
