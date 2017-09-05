declare function co (f: Function) : Promise<any>
declare namespace co {
  export function wrap (f: Function) : Function
}
export = co