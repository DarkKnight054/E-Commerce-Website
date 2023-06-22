import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Supplier',
    email: 'supplier@gmail.com',
    account_number: '293126262219152891172311192292132523',
    password: bcrypt.hashSync('123456', 10),
    isSeller: true,
  },
];

export default users;
