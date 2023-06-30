import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Supplier',
    email: 'supplier@gmail.com',
    account_number: '293126262219152891172311192292132523',
    password: bcrypt.hashSync('123456', 10),
    isSeller: true,
  },
  {
    name: 'Jhon',
    email: 'john@gmail.com',
    account_number: '2025182491172311192292132523',
    password: bcrypt.hashSync('password', 10),
    isSeller: false,
  },
];

export default users;
