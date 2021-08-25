
const User = require('../models/user.model');


//Create user
const newUser = async (request,response)=>{

    let result = {};
    try {
        
        
        const userDetails = new User({
            firstname:request.body.firstname,
            lastname:request.body.lastname,
            username:request.body.username,
            email:request.body.email,
            mobile:request.body.mobile,
            designation:request.body.designation,
            address:request.body.address,
            role:request.body.role

        })
         userDetails.save().then(
             (user)=>{
                 console.log('New User Added Successfully...');
                 
             }
         ).catch(err=>{
             throw err
         })
         result = {
            success:true,
            statusCode:201,
            message:'New User Added successfully..',
            data:user
        }
    } catch (error) {
        console.log('Failed to Save/Create New User ',error);
                 result = {
                     success:false,
                     statusCode:500,
                     message:'Failed on Api to create New User',
                     data:error
                 }
    }
    return response.status(200).json(result)

}

// Get User Info
const getUser = async(request,response)=>{

    let result ={}
    let total =0;
    let list =[];
    let {limit,page}=request.body;
    
    offset = (page-1)* limit
    try {
        
        await User.find().skip(offset).limit(limit).then(
            (data)=>{
                list = data
            }
        ).catch(err=>{
            throw err
        })

        await User.count().then((data)=>{
            // console.log('Total Count',data)
            total=data
        }).catch(err=>{
            throw error
        })

        result = {
            success:true,
            statusCode:201,
            message:'All Users Details',
            data:list,
            count:total
        }



    } catch (error) {
        console.log(error)
        result = {
            success:false,
            statusCode:500,
            message:'Error on Api on getting User Details..',
            data:null
        }
    }

    return response.status(200).json(result)
}

//edit user 

const chUser = async(request,response)=>{

    let result ={}
    let id = request.query.id;
    console.log('Edit Id issss', id)
    try {
        
        await User.findByIdAndUpdate(id,request.body,{useFindAndModify:false
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

//delete user 
const rmUser = async(request,response)=>{
    let result ={}
    let id = request.query.id;
    try {
        
        await User.findByIdAndDelete(id,{useFindAndModify:false
        }).then(
            (data)=>{
                console.log(data)
                if(!data){
                    console.log('Failed to Remove Details ')
                    result = {
                        success:false,
                        statusCode:400,
                        message:'Failed to Remove Details..',
                        data:null
                    }
                } else {
                    console.log(' User Details  Removed');
                    result ={
                        success:true,
                        statusCode:200,
                        message:'user Details Removed...',
                        data:user
                    }
                }
            }
        ).catch(err=>{
            throw err
        })

    } catch (error) {
        console.log('Error on APi server Please try Again..');
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
    getUser,
    chUser,
    rmUser,
}