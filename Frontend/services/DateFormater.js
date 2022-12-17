export const formatDate = (date) => {
  const fullDate = new Date(date)
  const month = fullDate.getMonth() + 1
  const day = fullDate.getDate()
  const dayAndMonth = day + "/" + month
  return {dayAndMonth , fullDate}
}