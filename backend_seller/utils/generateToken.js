import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_SELLER, {
    expiresIn: '30d',
  });
};

export default generateToken;
