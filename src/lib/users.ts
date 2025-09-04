export type User = {
  id: string;
  name: string;
  occupation?: string;
  hobbies?: string[];
  family?: string;
};

let users: User[] = [
    { id: '1', name: 'Ava', occupation: 'Designer', hobbies: ['Painting', 'Hiking'], family: 'Married to Leo' },
    { id: '2', name: 'Ben', occupation: 'Engineer', hobbies: ['Coding', 'Gaming'], family: 'Single' },
    { id: '3', name: 'Morgan', occupation: 'Teacher', hobbies: ['Reading', 'Traveling'], family: 'In a relationship' },
];

export function getUsers() {
  return users;
}
export function getUserById(id: string) {
  return users.find((u) => u.id === id) || null;
}
export function updateUser(id: string, data: Partial<User>) {
  const user = getUserById(id);
  if (!user) return null;
  Object.assign(user, data);
  return user;
}
export function createUser(u: Omit<User,"id">) {
    const id = String(Math.max(0, ...users.map(x=> Number(x.id))) + 1);
    const nu: User = { id, ...u };
    users.unshift(nu);
    return nu;
}