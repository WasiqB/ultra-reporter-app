import { db } from '../client';

interface User {
  id?: string;
  full_name?: string;
  email: string;
}

interface UserResponse {
  data?: any;
  error?: unknown;
}

const createUser = async ({
  full_name,
  email,
}: User): Promise<UserResponse> => {
  try {
    const user = await db.user.create({
      data: {
        email: email as string,
        name: full_name || email?.split('@')[0],
      },
    });
    return { data: user };
  } catch (error) {
    return { error };
  }
};

const getUser = async (email: string): Promise<UserResponse> => {
  try {
    const user = await db.user.findUnique({
      where: { email: email as string },
    });
    return { data: user };
  } catch (error) {
    return { error };
  }
};

const deleteUser = async (email: string): Promise<UserResponse> => {
  try {
    const user = await db.user.delete({
      where: { email: email as string },
    });
    return { data: user };
  } catch (error) {
    return { error };
  }
};

export { createUser, deleteUser, getUser };
