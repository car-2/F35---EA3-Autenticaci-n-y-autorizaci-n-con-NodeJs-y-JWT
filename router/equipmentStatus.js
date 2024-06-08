const {Router} = require('express');
const EquipmentStatus = require('../models/EquipmentStatus');
const {validatorBrandEquipments} = require('../helpers/validator-brand-equipments');
const { validarJWT } = require('../middleware/validarJWT');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');

const router = Router();

router.post('/', [validarJWT, validarRolAdmin], async function(req,res){
    try{
        const validator = validatorBrandEquipments(req);
        if(validator.length>0){
            return res.status(400).send(validator);
        }
        let equipmentStatus =  EquipmentStatus();

        const existEquipmentStatus = await EquipmentStatus.findOne({name: req.body.name});
        if(existEquipmentStatus){
            return res.status(400).send("El Estado del Equipo ya Existe");
        };

        equipmentStatus.name = req.body.name;
        equipmentStatus.state = req.body.state;
        equipmentStatus.creationDate = new Date();
        equipmentStatus.updateDate = new Date();

        equipmentStatus = await equipmentStatus.save();

        console.log(equipmentStatus);
        res.send(equipmentStatus);

    }catch(error){
        res.status(500).send("Ha ocurrido un Error 🚨");
        console.log(error)
    }

});

router.get('/', [validarJWT, validarRolAdmin], async function(req,res){
    try{
        const equipmentStatus = await EquipmentStatus.find();
        
        res.send(equipmentStatus);

    }catch(error){
        console.log(error);
        res.status(500).send("Ha ocurrido un Error 🚨");
    }


});
router.put('/:equipmentStatusId', [validarJWT, validarRolAdmin], async function(req,res){
    try{
        const validator =  validatorBrandEquipments(req);
        if(validator.length>0){
            return res.status(400).send(validator);
        }
        let equipmentStatus = await EquipmentStatus.findById(req.params.equipmentStatusId);

        if(!equipmentStatus){
            res.status(400).send("Estado de Equipo no Encontrado");
        };
        equipmentStatus.name = req.body.name;
        equipmentStatus.state = req.body.state;
        equipmentStatus.updateDate = new Date();

        equipmentStatus = await equipmentStatus.save();

        console.log(equipmentStatus);
        res.send(equipmentStatus);

    }catch(error){
        console.log(error);
        res.status(500).send("Ha ocurrido un Error 🚨");

    }

});
router.get('/:equipmentStatusId', [validarJWT, validarRolAdmin], async function(req, res){
    try{
        const statuss = await EquipmentStatus.findById(req.params.equipmentStatusId);

        if(!statuss){
            return res.status(404).send('Ha ocurrido un Error 🚨');
        };
        res.send(statuss);

    }catch(error){
        console.log(error)
    }
} )

router.delete('/:equipmentStatusId', [ validarJWT, validarRolAdmin ], async function(req, res) {
    try {
        const equipmentStatus = await EquipmentStatus.findById(req.params.equipmentStatusId);
        if (!EquipmentStatus) {
            return res.status(400).send("No se Encontro ese Estado del Equipo");
        }

        const equipmentStatusName = equipmentStatus.name; // Obtener el nombre del tipo de equipo

        await EquipmentStatus.remove();
        res.send(`El Estado de Equipo "${equipmentStatusName}" fue Eliminado Exitosamente ✅`);

    } catch (error) {
      console.log(error);
      res.status(500).send("Hubo un Error 🚨");
    }   
});

module.exports= router;