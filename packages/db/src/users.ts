import { db } from './client';

interface User {
  userName: string;
  email: string;
  provider: string;
}

const createUser = async ({ userName, email, provider }: User) => {
  try {
    const user = await db.user.create({
      data: {
        user_name: userName,
        email,
        provider,
      },
    });
    return { user };
  } catch (error) {
    return { error };
  }
};

const getUser = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });
    return { user };
  } catch (error) {
    return { error };
  }
};

const deleteUser = async (id: string) => {
  try {
    const user = await db.user.delete({
      where: { id },
    });
    return { user };
  } catch (error) {
    return { error };
  }
};

export { createUser, deleteUser, getUser };
