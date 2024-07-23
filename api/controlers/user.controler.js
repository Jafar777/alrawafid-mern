import User from "../models/user.model.js";
import { errorHanlder } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
export const test = (req,res) => {
    res.json({message:'API is working'})
};

export const updateUser = async (req , res , next ) => {
    if (req.user.id !== req.params.userId){
        return next(errorHanlder(403, 'غير مصرح لك للتعديل على هذا المستخدك'))
    }
    if (req.body.password){
        if(req.body.password.length < 6 ){
            return next (errorHanlder(400, 'كلمة المرور ينبغي ان تتكون من 6 حروف على الاقل'));
        }
        req.body.password = bcryptjs.hashSync(req.body.password,10);
    }
    if (req.body.username){
        if (req.body.username.length < 7 || req.body.username.length > 20){
            return next(errorHanlder(400 , "اسم السمتخدم يجب ان يكون بين ال7 وال 20 حرف"))
        }
        if (req.body.username.includes(' ')){
            return next(errorHanlder(400 , "اسم المستخدم يجب ان لا يتحتوي على فراغات" ))
        }
        if (req.body.username !== req.body.username.toLowerCase()){
            return next(errorHanlder(400 , " اكتب اسم المستخد بحروف صغيرة فقط " ))
        }
        if (req.body.username.match(/^[a-zA-Z0-9]+&/)){
            return next(errorHanlder(400 , " اسم السمتخدم يجب ان يكون مكون من حروف وارقام فقط تجنب استخدام الرموز" )
        );
        }
    }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.userId,{
                $set:{
                    username:req.body.username,
                    email: req.body.email,
                    profilePicture: req.body.profilePicture,
                    password: req.body.password,
                },
            }, {new : true});
            const {password , ...rest } = updatedUser._doc;
            res.status(200).json(rest);
        }catch (error){
            next(error);
        }
}
export  const deleteUser = async (req, res,next) => {

    if (!req.user.isAdmin && req.user.id !== req.params.userId){
        return next(errorHanlder(403, 'غير مسموح لك بحذف هذا الحساب'))
    }
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json('تم حذف الحساب');
    } catch (error) {
        next(error)
    }
}

export const signout = (req , res , next) => {
    try {
            res.clearCookie('access_token').status(200).json('تم تسجيل الخروج')
    } catch (error) {
        next(error)
    }   
}
export const getUsers = async (req,res,next) =>{
    if(!req.user.isAdmin){
        return next(errorHanlder(403,'You are not allowed to see all users'));
    }
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === 'asc' ? 1 : -1;

        const users = await User.find()
        .sort({createdAt: sortDirection})
        .skip(startIndex)
        .limit(limit);

        const usersWithoutPassword = users.map((user) =>{ 
            const {password , ...rest } = user._doc;
            return rest;
        });

        const totalUsers = await User.countDocuments();   
        
        const now = new Date();

        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() -1 ,
            now.getDate()
        );

        const lastMonthUsers = await User.countDocuments({
            createdAt: {$gte: oneMonthAgo},
        });
        res.status(200).json({
            users: usersWithoutPassword,
            totalUsers,
            lastMonthUsers,
        });
        
    } catch (error) {
        next(error)
    }
}