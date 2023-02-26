export const changeTimeFormatFunction = (time : string) => {
  const date = new Date(time)
  return new Intl.DateTimeFormat('KR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}
