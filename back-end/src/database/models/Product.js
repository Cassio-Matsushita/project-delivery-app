module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
      name: DataTypes.STRING,
      price: DataTypes.FLOAT,
      urlImage: DataTypes.STRING,
    },
    {
      tableName: "products",
      timestamps: false,
      underscored: true,
    }
  );

  return Product;
};
