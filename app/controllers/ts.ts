class Student {
  private fullName: string
  
  constructor (public firstName, public middleName, public lastName) {
    this.fullName = firstName + ' ' + middleName + ' ' + lastName
  }
}

interface Person {
  firstName: string,
  lastName: string,
  isStudent: boolean,
  readonly age: number,
  friend: Array <string>,
  fuck?: number
}

interface NumberArray {
  readonly [index: number]: string
  length: number
}

enum Sex {male, female}

let fuck: any = 'wow'

let user = {
  firstName: 'Jane',
  middleName: 'M.',
  lastName: 'User',
  isStudent: true,
  sex: Sex[0],
  age: 15,
  friend: ['Tom', 'Jerry']
}

let numArray: NumberArray = ['Alice', 'Bob']

let greeter

greeter = function (person) {
  return "Hello, " + JSON.stringify(person)
}

function identity<T>(arg: T[]): T[] {
  return arg
}

export function ts (req, res) {
  res.send(identity([greeter(user)]))
}