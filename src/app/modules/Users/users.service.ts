import CustomError from '../../errors/CusromError';
import { IUser } from './users.interface';
import Users from './users.model';

// generate access and refresh token
const generateAccessAndRefreshToken = async (userID: string) => {
  try {
    const user = await Users.findById(userID);
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken; // Save the refresh token to the DB
    await user?.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    if (error instanceof Error) {
      throw new CustomError(error.message, 500);
    } else {
      throw new CustomError('Something went wrong while Generating Token', 500);
    }
  }
};

const getAllUsers = async (): Promise<IUser[]> => {
    const users = await Users.find().select('-password -refreshToken');
    return users;
};

const createUser = async (userData: IUser): Promise<IUser> => {
    console.log('🔍 Starting user registration');
    console.log('📝 Registration data:', {
        email: userData.email,
        userName: userData.userName,
        passwordLength: userData.password.length
    });

    const existingUser = await Users.findOne({
        $or: [{ email: userData.email }, { userName: userData.userName }],
    });

    if (existingUser) {
        console.log('❌ User already exists:', {
            email: userData.email,
            userName: userData.userName
        });
        throw new CustomError('User already exists', 400);
    }

    console.log('✅ Creating new user...');
    const user = await Users.create(userData);
    console.log('✅ User created successfully:', {
        id: user._id,
        email: user.email,
        userName: user.userName
    });
    return user;
};

const loginUser = async (email: string, password: string) => {
    console.log('🔍 Attempting login for email:', email);
    
    const user = await Users.findOne({ email });
    if (!user) {
        console.log('❌ User not found for email:', email);
        throw new CustomError('User not found', 404);
    }
    console.log('✅ User found:', { id: user._id, email: user.email });

    console.log('🔐 Verifying password...');
    const isPasswordValid = await user.verifyPassword(password);
    console.log('🔑 Password verification result:', isPasswordValid);
    
    if (!isPasswordValid) {
        console.log('❌ Invalid password for user:', email);
        throw new CustomError('Invalid password', 401);
    }

    console.log('🎟️ Generating new tokens...');
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Update refresh token in database
    user.refreshToken = refreshToken;
    await user.save();
    console.log('✅ Login successful for user:', email);

    return {
        user: {
            _id: user._id,
            userName: user.userName,
            email: user.email,
            role: user.role,
        },
        accessToken,
        refreshToken,
    };
};

const refreshAccessToken = async (refreshToken: string) => {
    const user = await Users.findOne({ refreshToken });
    if (!user) {
        throw new CustomError('Invalid refresh token', 401);
    }

    const accessToken = user.generateAccessToken();
    return { accessToken };
};

const logoutUser = async (userId: string) => {
    const user = await Users.findById(userId);
    if (!user) {
        throw new CustomError('User not found', 404);
    }

    user.refreshToken = undefined;
    await user.save();
    return { message: 'Logged out successfully' };
};

export const userServices = {
  getAllUsers,
  createUser,
  generateAccessAndRefreshToken,
  loginUser,
  refreshAccessToken,
  logoutUser,
};
