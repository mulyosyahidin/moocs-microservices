import sequelize from "../configs/database.js";

const Category = sequelize.define('Category', {
    id: {
        type: sequelize.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    parent_id: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: true,
    },
    name: {
        type: sequelize.Sequelize.STRING,
        allowNull: false,
    },
    slug: {
        type: sequelize.Sequelize.STRING,
        allowNull: false,
    },
    picture: {
        type: sequelize.Sequelize.STRING,
        allowNull: true,
    },
}, {
    tableName: 'categories',
    createdAt: false,
    updatedAt: false,
});

Category.hasMany(Category, { as: 'children', foreignKey: 'parent_id' });
Category.belongsTo(Category, { as: 'parent', foreignKey: 'parent_id' });

export default Category;