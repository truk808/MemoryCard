const db = require('../db')
const { DataTypes } = require('sequelize');

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
    example_sentence: { type: DataTypes.TEXT },
    level: { type: DataTypes.INTEGER, defaultValue: 0 },
});

const Tag = db.define('tag', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    userId: { type: DataTypes.INTEGER, allowNull: false, field: 'user_id' },
});

const Module = db.define('module', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    icon: { type: DataTypes.STRING },
    userId: { type: DataTypes.INTEGER, allowNull: false, field: 'user_id' },
});

const Group = db.define('group', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    img: { type: DataTypes.STRING },
    userId: { type: DataTypes.INTEGER, allowNull: false, field: 'user_id' },
});

const CardTag = db.define('card_tag', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const ModuleCard = db.define('module_card', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    moduleId: { type: DataTypes.INTEGER, allowNull: false, field: 'module_id' },
    cardId: { type: DataTypes.INTEGER, allowNull: false, field: 'card_id' },
});

const GroupModule = db.define('group_module', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    groupId: { type: DataTypes.INTEGER, allowNull: false, field: 'group_id' },
    moduleId: { type: DataTypes.INTEGER, allowNull: false, field: 'module_id' },
});

User.hasMany(Card); Card.belongsTo(User);
User.hasMany(Module); Module.belongsTo(User);
User.hasMany(Group); Group.belongsTo(User);
User.hasMany(Tag); Tag.belongsTo(User);

Card.belongsToMany(Tag, { through: CardTag, foreignKey: 'cardId' });
Tag.belongsToMany(Card, { through: CardTag, foreignKey: 'tagId' });
CardTag.belongsTo(Card, { foreignKey: 'cardId',  onDelete: 'CASCADE',});
CardTag.belongsTo(Tag, { foreignKey: 'tagId',  onDelete: 'CASCADE'});
Card.hasMany(CardTag, { foreignKey: 'cardId',  onDelete: 'CASCADE', hooks: true });
Tag.hasMany(CardTag, { foreignKey: 'tagId',  onDelete: 'CASCADE', hooks: true });

Module.belongsToMany(Card, { through: ModuleCard, foreignKey: 'moduleId' });
Card.belongsToMany(Module, { through: ModuleCard, foreignKey: 'cardId' });
ModuleCard.belongsTo(Module, { foreignKey: 'moduleId',  onDelete: 'CASCADE',});
ModuleCard.belongsTo(Card, { foreignKey: 'cardId',  onDelete: 'CASCADE'});
Module.hasMany(ModuleCard, { foreignKey: 'moduleId',  onDelete: 'CASCADE', hooks: true });
Card.hasMany(ModuleCard, { foreignKey: 'cardId',  onDelete: 'CASCADE', hooks: true });

Group.belongsToMany(Module, { through: GroupModule, foreignKey: 'groupId' });
Module.belongsToMany(Group, { through: GroupModule, foreignKey: 'moduleId' });
GroupModule.belongsTo(Group, { foreignKey: 'groupId',   onDelete: 'CASCADE' });
GroupModule.belongsTo(Module, { foreignKey: 'moduleId',  onDelete: 'CASCADE' });
Group.hasMany(GroupModule, {foreignKey: 'groupId', onDelete: 'CASCADE', hooks: true});
Module.hasMany(GroupModule, { foreignKey: 'moduleId',  onDelete: 'CASCADE', hooks: true });

module.exports = {
    User,
    Card,
    Tag,
    Module,
    Group,
    CardTag,
    ModuleCard,
    GroupModule,
};
