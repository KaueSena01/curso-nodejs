const Tought = require('../models/Tought')
const User = require('../models/User')

const { Op } = require('sequelize')

module.exports = class ToughtsController {
    static async showToughts(req, res) {

        let search = ''
        if(req.query.search){
            search = req.query.search
        }

        let order = 'DESC'

        if(req.query.order === 'old'){
            order = 'ASC'
        } else {
            order = 'DESC'
        }

        const toughtsData = await Tought.findAll({
            include: User,
            where: {
                title: {[Op.like]: `%${search}%`}
            },
            order: [['createdAt', order]]
        })

        // Pensamento e usuário jogados no mesmo array
        const toughts = toughtsData.map((result) => result.get({plain: true}))

        let toughtsQty = toughts.length

        if(toughtsQty === 0){
            toughtsQty = false
        }

        res.render('toughts/home', { toughts, search, toughtsQty })
    }

    static async dashboard(req, res){
        const userId = req.session.userid

        const user = await User.findOne({where: {id: userId}, include: Tought, plain: true})

        // check if user exists
        if(!user){
            res.redirect('/login')
        }

        // Toughts table
        const toughts = user.Toughts.map((result) => result.dataValues)
        // console.log(toughts)

        let emptyToughts = false

        if(toughts.length === 0){
            emptyToughts = true
        }

        res.render('toughts/dashboard', {toughts, emptyToughts})
    }

    static createTought(req, res){
        res.render('toughts/create')
    }

    static async createToughtSave(req, res){
        // pegando o id da sessão
        const tought = {
            title: req.body.title,
            UserId: req.session.userid
        }

        await Tought.create(tought)
        
        try {
            req.flash('message', 'Pensamento criado com sucesso!')
            req.session.save(() => {
                res.redirect('/toughts/dashboard')
        })
        } catch (error) {
            console.log('Aconteceu um erro: ' + error)
        }
    }

    static async updateTought(req, res){
        const id = req.params.id

        const tought = await Tought.findOne({raw: true, where: {id: id}})

        res.render('toughts/edit', {tought})
    }

    static async updateToughtSave(req, res){
        const id = req.body.id
        const UserId = req.session.userid

        const tought = {
            title: req.body.title
        }

        try {
            await Tought.update(tought, {where: {id: id, UserId: UserId}})
            req.flash('message', 'Pensamento editado!')
            req.session.save(() => {
                res.redirect('/toughts/dashboard')
        })
        } catch (error) {
            console.log('Aconteceu um erro: ' + error)
        }
        
    }

    static async removeTought(req, res){
        const id = req.body.id
        const UserId = req.session.userid

        try {
            await Tought.destroy({where: {id: id, UserId: UserId}})
            req.flash('message', 'Pensamento removido!')
            req.session.save(() => {
                res.redirect('/toughts/dashboard')
        })
        } catch (error) {
            console.log('Aconteceu um erro: ' + error)
        }
    }
}