import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin',
    email: 'admin@gmail.com',
    account_number: '111423192491172311192292132523',
    password: bcrypt.hashSync('password', 10),
  },
  {
    name: 'John',
    email: 'john@gmail.com',
    account_number: '2025182491172311192292132523',
    password: bcrypt.hashSync('password', 10),
  },
  {
    name: 'Jack',
    email: 'jack@gmail.com',
    account_number: '2011132191172311192292132523',
    password: bcrypt.hashSync('password', 10),
  },
  {
    name: 'Supplier',
    email: 'supplier@gmail.com',
    account_number: '293126262219152891172311192292132523',
    password: bcrypt.hashSync('password', 10),
  },
];

export default users;
