/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from './client';

interface User {
  id?: string;
  userName: string;
  email: string;
  provider: string;
}

interface UserResponse {
  data?: any;
  error?: unknown;
}

const updateUser = async ({
  id,
  userName,
  email,
  provider,
}: User): Promise<UserResponse> => {
  try {
    const user = await db.user.update({
      where: { id },
      data: {
        user_name: userName,
        email,
        provider,
      },
    });
    return {
      data: user,
    };
  } catch (error) {
    return { error };
  }
};

const createUser = async ({
  userName,
  email,
  provider,
}: User): Promise<UserResponse> => {
  try {
    const user = await db.user.create({
      data: {
        user_name: userName,
        email,
        provider,
      },
    });
    return { data: user };
  } catch (error) {
    return { error };
  }
};

const getUser = async (id: string): Promise<UserResponse> => {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });
    return { data: user };
  } catch (error) {
    return { error };
  }
};

const deleteUser = async (id: string): Promise<UserResponse> => {
  try {
    const user = await db.user.delete({
      where: { id },
    });
    return { data: user };
  } catch (error) {
    return { error };
  }
};

export { createUser, deleteUser, getUser, updateUser };
