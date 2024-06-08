const {Schema, model} = require('mongoose');

const InventorySchema = Schema({

    serial:{
        type:String,
        required: true,
        unique: true
    },

    model:{
        type:String,
        required: true
    },

    description:{
        type:String,
        required: true
    },

    image:{
        type:String,
        required: true
    },

    price:{
        type:Number,
        required:true
    },

    colour:{
        type:String,
        required: true
    },

    user:{
        type: Schema.Types.ObjectId,
         ref: 'User',
         required: false
    },

    brand:{
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },

    equipmentStatus:{
        type: Schema.Types.ObjectId,
        ref: 'EquipmentStatus',
        required: true
    },

    equipmentType:{
        type: Schema.Types.ObjectId,
        ref:'EquipmentType',
        required:true
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


module.exports = model('Inventory',InventorySchema);