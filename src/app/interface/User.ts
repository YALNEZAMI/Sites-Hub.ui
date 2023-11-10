import { App } from './App';

export class User {
  _id?: string = '';
  name?: string = '';
  email?: string = '';
  password?: string = '';
  password2?: string = '';
  image?: string = '';
  apps?: App[] = [];
}
