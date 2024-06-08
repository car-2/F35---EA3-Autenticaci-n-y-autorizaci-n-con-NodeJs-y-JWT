const validatorBrandEquipments = (req) =>{
    const validators = [];
   if(!req.body.name){
       validators.push("Debe ingresar un nombre");

   };
   if(!req.body.state){
    validators.push("Debe ingresar un estado");

};
return validators;

};


module.exports={
    validatorBrandEquipments,
}