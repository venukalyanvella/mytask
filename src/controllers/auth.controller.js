
const express = require('express');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const AuthModel = require('../models/Auth.Model');
const bcrypt = require('bcrypt');

//login 

const loginUser = async (request, response) => {

    let result = {};

    if (request.body.username == '' && request.body.password == '') {
        return response.send('Username/Password not be empty')
    }


    try {
        AuthModel.findOne({ username: request.body.username }).then(
            (user) => {
                const isPassword = bcrypt.compareSync(request.body.password, user.password);
                if(!isPassword){
                    console.log('Password Not Match')
                    return response.status(200).json({
                        success: false,
                        statusCode: 500,
                        message: 'Password Not Match',
                        data: null
                    })
               }else {
                   let payload = {
                       _id:user._id,
                       fullname:user.fullname,
                       username:user.username,
                       email:user.email,
                       mobile:user.mobile,
                       role:user.role
                   }
                const token = jwt.sign(payload,process.env.SECRET_KEY,{
                    algorithm:'HS256',
                    expiresIn:'1h'
                })
                return response.status(200).json({
                    success: true,
                    statusCode: 200,
                    message: 'Login Successfull..',
                    data: payload,
                    token:token
                })
               }
                 


            }
        ).catch(error => {
            throw error
        })

    }
    catch (error) {
        console.log(error)
        return response.status(200).json({
            success: false,
            statusCode: 400,
            message: 'Server Error please try again',
            data: null
        })
    }

    

}

//add user 

const newUser = async (request, response) => {
    const today = new Date();
    let salt = bcrypt.genSaltSync(10);
    let hashpassword = bcrypt.hashSync(request.body.password,salt);

    const schema = Joi.object().keys({
        fullname:Joi.string().required(),
        username:Joi.string().required(),
        password:Joi.string().min(6).required(),
        email:Joi.string().email().required(),
        mobile:Joi.string().min(10).required(),
        role:Joi.string()
    })
     const resultData = schema.validate(request.body)
     if(resultData.error){
        response.status(400).send(resultData.error.details[0].message);
        return
     }else {
        response.status(400).send('Validation Success');
        
     }
    
    const UserData = {
        fullname: request.body.fullname,
        username: request.body.username,
        email: request.body.email,
        password: hashpassword,
        mobile: request.body.mobile,
        role: request.body.role,

    }

    let result = {};

    try {
        await AuthModel.findOne({ username: request.body.username })
            .then((user) => {
                if (!user) {
                    AuthModel.create(UserData).then(user => {
                        console.log('User Created/ Registered ');
                        

                    }).catch(err => {
                         console.log('Error Found', err)
                        throw err
                    })
                } 
            })


            result = {
                success: true,
                statusCode: 201,
                message: 'User Registered Successfully...',
                data: null
            }

    } catch (err) {
        result = {
            success: false,
            statusCode: 400,
            message: 'Server Error Please try Again,Error',
            data: err
        }




    }

    return response.status(200).json(result)


}
// get profile
const getProfile = async (request, response) => {

    if(!request.headers.authorization){
        return response.send('Unauthorize Access')
    }
    const token = request.headers.authorization.split('')[1];
    if(token ==null || token ==''){
        return response.status(401).send('Unauthorize Access')

    }
    var decoded = jwt.verify(token, process.env.SECRET_KEY);
   

    let result ={}
    await AuthModel.findById({_id:decoded._id}).then(
        (user)=>{
            if(!user){
                    console.log(' No Users Found..')
                    result ={
                        success:false,
                        statusCode:400,
                        message:'Token Invalid/ No users Found',
                        data:user
                    }
            } else {
                console.log('User Profile')
                result ={
                    success:true,
                    statusCode:200,
                    message:'My Profile Details',
                    data:user
                }
            }
        }
    ).catch(error=>{
        console.log('Error On Server Api /Please Try Again')
        result ={
            success:false,
            statusCode:400,
            message:'Error On Server Api /Please Try Again',
            data:null
        }
    })
    

}


//update Details
const updateDetails = async(request,response)=>{

    let id = request.params.id;
    let result ={}
    
    try {
        
        await AuthModel.findByIdAndUpdate(id,request.body,{useFindAndModify:false
        }).then(
            (data)=>{
                if(!data){
                    console.log('Failed to update Details ')
                    result = {
                        success:false,
                        statusCode:400,
                        message:'Failed to update Details..',
                        data:null
                    }
                } else {
                    console.log(' User Details  Updated');
                    result ={
                        success:true,
                        statusCode:200,
                        message:'user Details Updated...',
                        data:data
                    }
                }
            }
        ).catch(err=>{
            throw err
        })

    } catch (error) {
        console.log('Error on APi server Please try Again..',error);
        result ={
            success:false,
            statusCode:500,
            message:'Error on APi server Please try Again..',
            data:null
        }
    }

    return response.status(200).json(result)


}




module.exports = {
    newUser,
    loginUser,
    getProfile,
    updateDetails
}