const { Schema, model } = require("mongoose");

const UserSchema = Schema({
    name:{
        type:String,
        required: true
    },

    email:{
        type:String,
        required: true,
        unique: true
    },

    password:{
        type:String,
        required: true
    },

    rol:{
        type:String,
        required:true,
        enum:[
            'ADMIN',
            'DOCENTE'
        ]
    },

    creationDate:{
        type:Date,
        required:true
    },

    updateDate:{
        type:Date,
        required:true
    }

});

module.exports =model('User',UserSchema)