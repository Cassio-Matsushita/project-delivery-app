module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define(
    "Sale",
    {
      id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
      userId: { type: DataTypes.INTEGER, foreignKey: true },
      sellerId: { type: DataTypes.INTEGER, foreignKey: true },
      totalPrice: DataTypes.DECIMAL(9, 2),
      deliveryAddress: DataTypes.STRING,
      deliveryNumber: DataTypes.STRING,
      saleDate: DataTypes.DATE, 
      status: { type: DataTypes.STRING, defaultValue: 'Pendente' }
    },
    {
      tableName: "sales",
      timestamps: false,
      underscored: true
    }
  );

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, { foreignKey: "sellerId", as: "User" });
  };

  return Sale;
};
