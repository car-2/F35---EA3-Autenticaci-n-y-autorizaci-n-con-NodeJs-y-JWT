const {Router} = require('express');
const Brand = require('../models/Brand');
const router = Router();
const {validatorBrandEquipments} = require('../helpers/validator-brand-equipments');
const { validarJWT } = require('../middleware/validarJWT');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');

router.post('/', [validarJWT, validarRolAdmin], async function(req,res){
    try{
        const validator =  validatorBrandEquipments(req);
       if(validator.length>0){
           return res.status(400).send(validator);
       }
        let brand = new Brand();

        const existBrand = await Brand.findOne({name: req.body.name});
        if(existBrand){
            return res.status(400).send("La Marca ya Existe");
        }

        brand.name = req.body.name;
        brand.state = req.body.state;
        brand.creationDate = new Date();
        brand.updateDate = new Date();

        brand = await brand.save();
        res.send(brand);
    }catch(error){
        res.status(500).send("Ha ocurrido un Error 🚨");
        console.log(error);
    }

});
router.get('/', [validarJWT, validarRolAdmin], async function(req,res){
    try{
        const brand = await Brand.find();
        res.send(brand);

    }catch(error){
        console.log(error);
        res.status(500).send("Ha ocurrido un Error 🚨");
    }

});
router.put('/:idBrand', [validarJWT, validarRolAdmin], async function(req,res){
    try{
        const validator =  await validatorBrandEquipments(req);
       if(validator.length>0){
           return res.status(400).send(validator);
       }
        let brand = await Brand.findById(req.params.idBrand);
       

        if(!brand){
            res.status(400).send("Marca no Encontrada");
        };

        brand.name = req.body.name;
        brand.state = req.body.state;
        brand.updateDate = new Date();

        brand = await brand.save();
        res.send(brand);

    }catch(error){
        console.log(error);
        res.status(500).send("Ha ocurrido un Error 🚨");
    }

});
router.get('/:brandId', [validarJWT, validarRolAdmin], async function(req, res){
    try{
        const brandi = await Brand.findById(req.params.brandId);

        if(!brandi){
            return res.status(404).send('Ha ocurrido un Error 🚨');
        };
        res.send(brandi);

    }catch(error){
        console.log(error)
    }
} )

router.delete('/:brandId', [validarJWT, validarRolAdmin], async function(req, res) {
    try {
      const brand = await Brand.findById(req.params.brandId);
      if (!brand) {
        return res.status(400).send("Marca no encontrada");
      }
  
      const brandName = brand.name; // Obtener el nombre de la marca
  
      await brand.remove();
      res.send(`La Marca "${brandName}" Fue Eliminada Exitosamente ✅`);
  
    } catch (error) {
      console.log(error);
      res.status(500).send("Ha ocurrido un Error 🚨");
    }
  });
  
module.exports= router;