import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin',
    email: 'admin@gmail.com',
    account_number: '111423192491172311192292132523',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
];

export default users;
