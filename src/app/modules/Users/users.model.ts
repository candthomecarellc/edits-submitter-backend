import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import mongoose, { Model, Schema } from 'mongoose';
import config from '../../config';
import { IUser } from './users.interface';

const userSchema = new Schema<IUser>(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      default: 'user',
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  console.log('🔍 Pre-save hook triggered');
  if (this.isModified('password')) {
    console.log('🔐 Password has been modified, hashing...');
    console.log('📝 Original password:', this.password);
    console.log('📝 Original password length:', (this.password as string).length);
    try {
      const saltRounds = Number(config.bcryptSaltRounds);
      console.log('🧂 Using salt rounds:', saltRounds);
      
      const hashedPassword = await bcrypt.hash(
        this.password as string,
        saltRounds,
      );
      console.log('📝 Hashed password:', hashedPassword);
      console.log('📝 Hashed password length:', hashedPassword.length);
      
      this.password = hashedPassword;
      console.log('✅ Password hashed and saved successfully');
    } catch (error) {
      console.error('❌ Error hashing password:', error);
      throw error;
    }
  }
  next();
});

userSchema.methods.verifyPassword = async function (
  password: string,
): Promise<boolean> {
  console.log('🔍 Starting password verification');
  console.log('📝 Input password:', password);
  console.log('📝 Input password length:', password.length);
  console.log('📝 Stored hashed password:', this.password);
  console.log('📝 Stored hashed password length:', this.password.length);
  try {
    const result = await bcrypt.compare(password, this.password);
    console.log('🔑 Password comparison result:', result);
    if (!result) {
      console.log('⚠️ Password mismatch details:');
      console.log('- Input password:', password);
      console.log('- Stored hash:', this.password);
    }
    return result;
  } catch (error) {
    console.error('❌ Error during password verification:', error);
    throw error;
  }
};

// json web token generation method for access token
userSchema.methods.generateAccessToken = function (): string {
  const secret: Secret = config.accessTokenSecret || '';
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      userName: this.userName,
    },
    secret,
    {
      expiresIn: config.accessTokenExpiry,
    },
  );
};

// json web token generation method for refresh token
userSchema.methods.generateRefreshToken = function (): string {
  const secret: Secret = config.refreshTokenSecret || '';
  return jwt.sign({
    _id: this._id,
  }, secret, {
    expiresIn: config.refreshTokenExpiry,
  });
};

const Users: Model<IUser> = mongoose.model('users', userSchema);
export default Users;
