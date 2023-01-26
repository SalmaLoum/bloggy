const User = require('./User');
const Bloggy = require('./Bloggy');
const Comments = require('./Comments');

User.hasMany(Bloggy, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Comments, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Bloggy.belongsTo(User, {
  foreignKey: 'user_id'
});

Bloggy.hasMany(Comments,{
  foreignKey: 'bloggy_id'
});

Comments.belongsTo(User, {
  foreignKey: 'user_id'
})

module.exports = { User, Bloggy, Comments };
