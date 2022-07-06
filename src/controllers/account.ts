import { getCollection } from '../connectMongoDb';
import { Account, IUser } from '../typings';
import { findUserByEmail, findUserById } from './users';

export async function login(
  body: Account.LoginBody
): Promise<
  | { status: 'WRONG_PASSWORD' | 'NO_ACCOUNT' }
  | { status: 'SUCCESS'; user: Account.User }
> {
  const user = await findUserByEmail(body.email);
  if (user === null) {
    return { status: 'NO_ACCOUNT' };
  }
  if (user.password !== body.password) {
    return { status: 'WRONG_PASSWORD' };
  }
  return { status: 'SUCCESS', user };
}

export async function register(
  body: Account.RegisterBody
): Promise<{ status: Account.RegisterStatus; user: Account.User | IUser }> {
  const user = await findUserByEmail(body.email);
  if (user !== null) {
    return { status: 'USER_EXISTS', user };
  }

  const { insertedId } = await getCollection('users').insertOne(body);
  const registerUser = await findUserById(insertedId.toString());

  return { status: 'SUCCESS', user: registerUser! };
}
