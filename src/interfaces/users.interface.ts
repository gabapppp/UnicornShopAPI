export interface User {
  _id?: string;
  email: string;
  username: string;
  fullname: string;
  phone: string;
  password: string;
  creatAt: Date;
}

export interface Staff {
  _id?: string;
  username: string;
  fullname: string;
  image: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  address: string;
  password: string;
  creatAt: Date;
}
