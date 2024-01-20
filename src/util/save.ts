export const get = (key: string) => {
  const data = localStorage.getItem(key)
  if (data) {
    return JSON.parse(data)
  }

  return null
}

export const save = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data))
}

export const saveCurrentVault = (data: any) => {
  save('currentVault', data)
}

export const getCurrentVault = () => {
  return get('currentVault')
}

export const saveVaults = (vaults: any) => {
  save('vaults', vaults)
}

export const getVaults = () => {
  return get('vaults')
}
