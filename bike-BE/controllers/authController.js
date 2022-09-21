const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const User = require('../models/userModel'); 

// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = async (req, res) => {
    const { name, email, password, age, gender, phone, address } = req.body;

    if( !name || !email || !password) {
        res.status(400).json({
            message: "Hãy điền đủ tên email mật khẩu"
        });
        throw new Error('Please add all field');
    }

    //check if user exists
    const userExists = await User.findOne({email});
    if(userExists) {
        res.status(400).json({
            message: "Email đã được sử dụng"
        });
        throw new Error('User already exists');
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        age,
        gender,
        phone,
        address
    });

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            age: user.age,
            gender: user.gender,
            phone: user.phone,
            address: user.address
        });
    } else {
        res.status(400).json({
            message: "thông tin đăng ký không hợp lệ"
        });
        throw new Error('Invalid user data');
    }
};

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = async (req, res) => {
    const {email, password} = req.body;

    //check for user email
    const user = await User.findOne({email});

    if(user && (await bcryptjs.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(400).json({
            message: "Sai thông tin đăng nhập"
        });
        throw new Error('Invalid credentials');
    }
};

// @desc Get user data
// @route GET /api/users/me
// @access Private
const getMe = async (req, res) => {

    res.status(200).json(req.user);
};


//Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}

module.exports = {
    registerUser, loginUser, getMe
}