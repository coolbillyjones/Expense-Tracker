const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dataSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    income: {
        type: Number 
    },
    expenses: [{
        name: String, 
        amount: Number  
    }]
        
})

module.exports = mongoose.model('Data', dataSchema)