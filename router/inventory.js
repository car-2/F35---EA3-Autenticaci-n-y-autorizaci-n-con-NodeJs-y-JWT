const { Router } = require('express');
const Inventory = require('../models/Inventory');
const { validatorInvenotory } = require('../helpers/validator-inventory');
const { validarJWT } = require('../middleware/validarJWT');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');
const { validarRolDocente } = require('../middleware/validar-rol-docente');

const router = Router();

router.post('/', [ validarJWT, validarRolAdmin ], async function (req, res) {
    try {
        const validator = validatorInvenotory(req);
        if (validator.length > 0) {
            return res.status(400).send(validator);
        }
        let inventory = new Inventory();

        const inventoryExist = await Inventory.findOne({ serial: req.body.serial });

        if (inventoryExist) {
            return res.status(400).send("Ya existe un Inventario asociado a  ese Serial");
        };

        inventory.serial = req.body.serial;
        inventory.model = req.body.model;
        inventory.description = req.body.description;
        inventory.image = req.body.image;
        inventory.price = req.body.price;
        inventory.colour= req.body.colour;
        inventory.user = req.body.user;
        inventory.brand = req.body.brand;
        inventory.equipmentStatus = req.body.equipmentStatus;
        inventory.equipmentType = req.body.equipmentType;
        inventory.creationDate = new Date();
        inventory.updateDate = new Date();

        inventory = await inventory.save();
        res.send(inventory);

    } catch (error) {
        console.log(error);
        res.status(500).send("Ha ocurrido un Error 🚨");
    }

});

router.get('/', [ validarJWT, validarRolDocente ], async function (req, res) {
    try {
        const inventory = await Inventory.find().populate([
            {
                path: 'user'
            },
            {
                path: 'brand'

            },
            {
                path: 'equipmentStatus'

            },
            {
                path:'equipmentType'

            }
        ]);
        res.send(inventory);
        
    } catch (error) {
        console.log(error);
        res.status(400).send("Ha ocurrido un Error 🚨");
    }
});

router.put('/:inventoryId', [ validarJWT, validarRolAdmin ], async function (req, res) {
    try {
        const validator = validatorInvenotory(req);
        if (validator.length > 0) {
            return res.status(400).send(validator);
        }

        let inventory = await Inventory.findById(req.params.inventoryId);
        if (!inventory) {
            return res.status(400).send("No Existe un Inventario con ese ID");
        }

        const serialExist = await Inventory.findOne({ serial: req.body.serial, _id: { $ne: inventory._id } });
        console.log(serialExist);
        if (serialExist) {
            return res.status(400).send("Ya Existe un Inventario asociado a  ese Serial");
        };
        inventory.serial = req.body.serial;
        inventory.model = req.body.model;
        inventory.description = req.body.description;
        inventory.image = req.body.image;
        inventory.price = req.body.price;
        inventory.colour= req.body.colour;
        inventory.user = req.body.user;
        inventory.brand = req.body.brand;
        inventory.equipmentStatus = req.body.equipmentStatus;
        inventory.equipmentType = req.body.equipmentType;
        inventory.updateDate = new Date();

        inventory = await inventory.save();
        res.send(inventory);

    } catch (error) {
        console.log(error);
        res.status(500).send("Ha ocurrido un Error 🚨");
        ;
    }

});

router.get('/:inventoryId', [ validarJWT, validarRolAdmin ], async function(req, res){
    try{
        const inventor = await Inventory.findById(req.params.inventoryId);

        if(!inventor){
            return res.status(404).send('Ha ocurrido un Error 🚨');
        };
        res.send(inventor);

    }catch(error){
        console.log(error)
    }
} )

router.delete('/:inventoryId', [validarJWT, validarRolAdmin], async function(req, res) {
    try {
      const inventory = await Inventory.findById(req.params.inventoryId);
      if (!inventory) {
        return res.status(400).send("No Existe un Inventario con ese ID");
      }
  
      const inventoryserial = inventory.serial; // Obtener el nombre del inventario
  
      await inventory.remove();
      res.send(`El Inventario con la Serial "${inventoryserial}" fue Eliminado Exitosamente ✅`);
  
    } catch (error) {
      console.log(error);
      res.status(500).send("Ha ocurrido un error");
    }
  });
  


module.exports = router;