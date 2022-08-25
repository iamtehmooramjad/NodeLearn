module.exports = (sequelize,DataTypes)=>{

    return sequelize.define("user", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            isEmail: true,
            validate:{
                isEmail: {msg : "Please enter valid email"}
            }
        }
    })
}