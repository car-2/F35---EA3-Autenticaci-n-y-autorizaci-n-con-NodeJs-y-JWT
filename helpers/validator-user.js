const validatorUser = (req) => {
    const validators = [];
    if (!req.body.name) {
        validators.push("Debe ingresar un nombre");
    };

    if (!req.body.email) {
        validators.push("Es necesario un email");
    };

    if (!req.body.rol) {
        validators.push("Debe ingresar un Rol de Usuario ADMIN o DOCENTE");
    };

    if (!req.body.password) {
        validators.push("Debe ingresar una contraseña");
    };

    return validators;

};

module.exports = {
    validatorUser,
}