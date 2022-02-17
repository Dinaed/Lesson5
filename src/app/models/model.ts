export interface User {
  name: string,
  surname: string,
  email: string,
  birthday: Date,
  age: number,
  sex: string,
  subscription : boolean,
  phones: number[],
  address?: Address,
}

export interface Address {
  country: string,
  city: string,
  street: string,
  homeNumber: number,
}
