export const fileToBase64 = (fileArr: any, setFunction : any) => {
  let file
  let newArr: any = []
  for (let i in fileArr) {
    file = fileArr[i]
    const reader = new FileReader()
    reader.readAsDataURL(file as any)
    reader.onloadend = (finishedEvent) => {
      const { currentTarget } = finishedEvent
      newArr[i] = (currentTarget as any).result
      setFunction(newArr)
    }
  }
}
