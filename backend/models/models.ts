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

const Training = db.define('training', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: {type: DataTypes.INTEGER, allowNull: false, field: 'user_id',},
    type: {type: DataTypes.ENUM('repetition', 'memorization', 'test'), allowNull: false,},
    totalCards: {type: DataTypes.INTEGER, allowNull: false, field: 'total_cards',},
    correctAnswers: {type: DataTypes.INTEGER, allowNull: false, field: 'correct_answers',},
    wrongAnswers: {type: DataTypes.INTEGER, allowNull: false, field: 'wrong_answers',},
    durationSeconds: {type: DataTypes.INTEGER, allowNull: false, field: 'duration_seconds',},
    createdAt: {type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'created_at',},
});

const TrainingModule = db.define('training_module', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    trainingId: {type: DataTypes.INTEGER, allowNull: false, field: 'training_id',},
    moduleId: {type: DataTypes.INTEGER, allowNull: false, field: 'module_id',},
});

const DailyCardStats = db.define('daily_card_stats', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: {type: DataTypes.INTEGER, allowNull: false, field: 'user_id',},
    entityType: {type: DataTypes.ENUM('module', 'group'), allowNull: false, field: 'entity_type',},
    entityId: {type: DataTypes.INTEGER, allowNull: false, field: 'entity_id',},
    date: {type: DataTypes.DATEONLY, allowNull: false,},
    level0: { type: DataTypes.INTEGER, allowNull: false },
    level1: { type: DataTypes.INTEGER, allowNull: false },
    level2: { type: DataTypes.INTEGER, allowNull: false },
    level3: { type: DataTypes.INTEGER, allowNull: false },
});

const Publication = db.define('publication', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    entityType: {type: DataTypes.ENUM('group', 'module'), allowNull: false, field: 'entity_type',},
    entityId: {type: DataTypes.INTEGER, allowNull: false, field: 'entity_id',},
    authorUserId: {type: DataTypes.INTEGER, allowNull: false, field: 'author_user_id'},
    status: {type: DataTypes.ENUM('pending', 'approved', 'rejected'), defaultValue: 'approved'},
    downloadCount: {type: DataTypes.INTEGER, defaultValue: 0, field: 'download_count',},
});



User.hasMany(Card); Card.belongsTo(User);
User.hasMany(Module); Module.belongsTo(User);
User.hasMany(Group); Group.belongsTo(User);
User.hasMany(Tag); Tag.belongsTo(User);
User.hasMany(Training); Training.belongsTo(User);
User.hasMany(Publication);Publication.belongsTo(User);

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
Module.belongsToMany(Training, { through: TrainingModule, foreignKey: 'moduleId' });

Group.belongsToMany(Module, { through: GroupModule, foreignKey: 'groupId' });
Module.belongsToMany(Group, { through: GroupModule, foreignKey: 'moduleId' });
GroupModule.belongsTo(Group, { foreignKey: 'groupId',   onDelete: 'CASCADE' });
GroupModule.belongsTo(Module, { foreignKey: 'moduleId',  onDelete: 'CASCADE' });
Group.hasMany(GroupModule, {foreignKey: 'groupId', onDelete: 'CASCADE', hooks: true});
Module.hasMany(GroupModule, { foreignKey: 'moduleId',  onDelete: 'CASCADE', hooks: true });
Group.hasMany(Publication, {foreignKey: 'entityId', sourceKey: 'id', constraints: true, onDelete: 'CASCADE'});

Training.belongsToMany(Module, { through: TrainingModule, foreignKey: 'trainingId' });
Training.hasMany(TrainingModule, { foreignKey: 'trainingId', as: 'training_modules', onDelete: 'CASCADE' });

Publication.belongsTo(Group, {foreignKey: 'entityId', targetKey: 'id', constraints: true, onDelete: 'CASCADE',});

module.exports = {
    User,
    Card,
    Tag,
    Module,
    Group,
    CardTag,
    ModuleCard,
    GroupModule,
    Training,
    TrainingModule,
    DailyCardStats,
    Publication,
};
