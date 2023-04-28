const Category = require('./Category.js')
const Message = require('./Message.js')
const Price = require('./Price.js')
const Property = require('./Property.js')
const User = require('./User.js')

//Price.hasOne(Property)
Property.belongsTo(Price, {
    foreignKey: 'priceid'
})

Property.belongsTo(Category, {
    foreignKey: 'categoryid'
})

Property.belongsTo(User, {
    foreignKey: 'userid'
})

Property.hasMany(Message,{
    foreignKey: 'propertyid'
})

Message.belongsTo(Property,{
    foreignKey: 'propertyid'
})

Message.belongsTo(User,{
    foreignKey: 'userid'
})

module.exports = {
    Property,
    Price,
    Category,
    User,
    Message
}