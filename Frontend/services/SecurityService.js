export const getToken = (key) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem(key)
    return token
  }
  return null
}
