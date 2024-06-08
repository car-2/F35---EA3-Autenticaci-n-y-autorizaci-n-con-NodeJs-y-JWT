const validatorInvenotory = (req) => {
    const validators = [];

    if(!req.body.serial){
        validators.push("Es necesario el serial");
    };
    if(!req.body.model){
        validators.push("Es necesario el modelo");
    };
    if(!req.body.description){
        validators.push("Es necesario la descripcion");
    };
    if(!req.body.image){
        validators.push("Es necesario la imagen");
    };
    if(!req.body.price){
        validators.push("Es necesario el precio");
    };
    if(!req.body.colour){ 
        validators.push("Es necesario el color");
    };
    if(!req.body.brand){
        validators.push("Es necesario la marca");
    };
    if(!req.body.equipmentStatus){
        validators.push("Es necesario el estado del equipo");
    };
    if(!req.body.equipmentType){
        validators.push("Es necesario el tipo de equipo");
    };

    return validators;


};

module.exports={
    validatorInvenotory,
}