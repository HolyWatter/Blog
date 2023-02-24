export const moveBtnFunction =(e : React.MouseEvent<HTMLButtonElement>, routerFunction : any) =>{
  routerFunction(e.currentTarget.value)
}