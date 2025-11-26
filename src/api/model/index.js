import user from "./user-model.js";
import product from "./product-model.js";
import order from "./order-model.js";
import option from "./option-model.js";
import allergen from "./allergen-model.js";

import productOption from "./product-option-model.js";
import productAllergen from "./product-allergen-model.js";
import orderedFood from "./ordered-food-model.js";

import sequelize from "../config/database.js";

user.hasMany(order,{ foreignKey: "user_id" });
order.belongsTo(user,{ foreignKey: "user_id" });

order.belongsToMany(product, {through: orderedFood, foreignKey: "order_number", otherKey: "product_id"});

product.belongsToMany(order, {through: orderedFood, foreignKey: "product_id", otherKey: "order_number"});

product.belongsToMany(option, {through: productOption, foreignKey:'product_id', otherKey:'option_id'});
option.belongsToMany(product, {through: productOption, foreignKey:'option_id', otherKey:'product_id'});

allergen.belongsToMany(product, {through: productAllergen, foreignKey: 'allergen_id', otherKey: 'product_id'});
product.belongsToMany(allergen, {through: productAllergen, foreignKey: 'product_id', otherKey: 'allergen_id'});

export {user,product,order,option, allergen, orderedFood};