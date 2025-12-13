const db = require('../db')
const {DataTypes} = require('sequelize');

const User = db.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    nickname: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: 'USER' },
});

const Card = db.define('card', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    term: { type: DataTypes.STRING },
    meaning: { type: DataTypes.TEXT },
    example_sentence : {type: DataTypes.TEXT},
    level : {type: DataTypes.INTEGER, defaultValue: 0},
});

const Tag = db.define('tag', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    term: { type: DataTypes.STRING},
});

const Module = db.define('module', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    icon: { type: DataTypes.STRING },
    card_count: { type: DataTypes.INTEGER, defaultValue: 0 }
});

const Group = db.define('group', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    img: { type: DataTypes.STRING },
    module_count: { type: DataTypes.INTEGER, defaultValue: 0 }
});

// const Publication = sequelize.define('publication', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     // user_id;
//     entity_type: {
//         type: DataTypes.ENUM('module', 'group')
//     },
//
//     // entity_id:
//     // user_id:
//     status: {
//         type: DataTypes.ENUM("not published", "pending", "approved", "rejected"),
//         defaultValue: 'pending'
//     },
// });


const CardTag = db.define('card_tag', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const ModuleCard = db.define('module_card', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const GroupModule = db.define('group_module', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

User.hasMany(Card);
Card.belongsTo(User);

User.hasMany(Module)
Module.belongsTo(User)

User.hasMany(Group)
Group.belongsTo(User)

Card.belongsToMany(Tag, { through: CardTag });
Tag.belongsToMany(Card, { through: CardTag });

Module.belongsToMany(Card, { through: ModuleCard });
Card.belongsToMany(Module, { through: ModuleCard });

Group.belongsToMany(Module, { through: GroupModule });
Module.belongsToMany(Group, { through: GroupModule });

module.exports = {
    User,
    Card,
    Tag,
    Module,
    Group,
    CardTag,
    ModuleCard,
    GroupModule,
}