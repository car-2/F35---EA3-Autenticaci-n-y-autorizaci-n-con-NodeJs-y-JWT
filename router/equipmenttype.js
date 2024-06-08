const {Router} = require('express');
const EquipmentType = require('../models/EquipmentType');
const {validatorBrandEquipments} = require('../helpers/validator-brand-equipments');
const { validarJWT } = require('../middleware/validarJWT');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');

const router = Router();

router.post('/', [validarJWT, validarRolAdmin], async function(req,res){
    try{
        const validator =  validatorBrandEquipments(req);
        if(validator.length>0){
            return res.status(400).send(validator);
        }
        let equipmentType = new EquipmentType();

        let existEquipmentType = await EquipmentType.findOne({name : req.body.name});

        if(existEquipmentType){
            return res.status(400).send("El Tipo de Equipo ya Existe")
        }
        equipmentType.name = req.body.name;
        equipmentType.state = req.body.state;
        equipmentType.creationDate = new Date();
        equipmentType.updateDate = new Date();

        equipmentType =  await equipmentType.save();

        console.log(equipmentType);
        res.send(equipmentType);
    }catch(error){
        res.status(500).send("Ha ocurrido un Error 🚨");
        console.log(error);

    };
});
router.get('/', [validarJWT, validarRolAdmin], async function(req,res){
    try{
        let existEquipmentType = await EquipmentType.find();
        if(!existEquipmentType){
            return res.status(400).send("No se encontraron Tipos de Equipos")
        }
        res.send(existEquipmentType);

    }catch(error){
        console.log(error);
        res.status(500).send("Ha ocurrido un Error 🚨");
    }

});

router.put('/:equipmentTypeId', [validarJWT, validarRolAdmin], async function(req,res){
    try{
        const validator =  validatorBrandEquipments(req);
        if(validator.length>0){
            return res.status(400).send(validator);
        }
        let existEquipmentType = await EquipmentType.findById(req.params.equipmentTypeId);
        if(!existEquipmentType){
            return res.status(400).send("No se encontró ese Tipo de Equipo")
        }
        existEquipmentType.name = req.body.name;
        existEquipmentType.state = req.body.state;
        existEquipmentType.updateDate = new Date();

        existEquipmentType =  await existEquipmentType.save();

        console.log(existEquipmentType);
        res.send(existEquipmentType);

    }catch(error){
        console.log(error);
        res.status(500).send("Hubo un Error 🚨");

    }
    

});
router.get('/:equipmentTypeId', [validarJWT, validarRolAdmin], async function(req, res){
    try{
        const types = await EquipmentType.findById(req.params.equipmentTypeId);

        if(!types){
            return res.status(404).send('Ha ocurrido un Error 🚨');
        };
        res.send(types);

    }catch(error){
        console.log(error)
    }
} )

router.delete('/:equipmentTypeId', [validarJWT, validarRolAdmin], async function(req, res) {
    try {
      const equipmentType = await EquipmentType.findById(req.params.equipmentTypeId);
      if (!equipmentType) {
        return res.status(400).send("No se encontró ese Tipo de Equipo");
      }
  
      const equipmentTypeName = equipmentType.name; // Obtener el nombre del tipo de equipo
  
      await equipmentType.remove();
      res.send(`El Tipo de Equipo "${equipmentTypeName}" fue Eliminado Exitosamente ✅`);
  
    } catch (error) {
      console.log(error);
      res.status(500).send("Hubo un Error 🚨");
    }
  });
  
module.exports= router;