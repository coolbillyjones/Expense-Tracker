const Data = require('../model/Data')

const getUserData = async (req,res) => {
    if (!req?.params?.username) return res.status(400).json({'message': 'Username Required'})
    
    const userData = await Data.findOne({ username: req.params.username }).exec()
    if (!userData) {
        return res.status(401).json({'message': 'Data Not Found'})
    }
    res.json(userData)
}

const addUser = async (req,res) => {
    if (!req?.body?.username) {
        console.log('missing name')
        return res.status(400).json({'message': 'Username Required'})
    }
    try {
        const result = await Data.create({
            username: req.body.username
        })
        res.status(201).json(result)
    } catch (err) {
        console.log(err)
    }
}

const updateData = async(req,res) => {
    if (!req.params?.username) {
        return res.status(400).json({'message': 'Username Required'})
    }

    const userData = await Data.findOne({ username: req.params.username}).exec()
    if (!userData) {
        return res.status(201).json({'messsage': 'Data not Found'})
    }
    if (req.body?.expenses) userData.expenses = req.body.expenses
    if (req.body?.income) userData.income = req.body.income
    const result = await userData.save()
    res.json(result)
}

module.exports = {
    getUserData,
    addUser,
    updateData
}