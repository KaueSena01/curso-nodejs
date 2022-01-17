const { redirect } = require('express/lib/response')
const Task = require('../models/Task')

module.exports = class TaskController {
    // Metodos estaticos
    // Handlebars já entende que taks está na pasta de views
    static createTask(req, res) {
        res.render('tasks/create')
    }

    // async para esperar o banco de dados
    static async createTaskSave(req, res) {
        const task = {
            title: req.body.title,
            description: req.body.description,
            done: false
        }

        await Task.create(task)

        res.redirect('/tasks')
    }

    static async updateTask(req, res) {
        const id = req.params.id

        const task = await Task.findOne({ raw: true, where: { id: id } })

        res.render('tasks/edit', { task })
    }

    static async removeTask(req, res) {
        const id = req.body.id

        await Task.destroy({ where: { id: id } })

        res.redirect('/tasks')
    }

    static async updateTaskPost(req, res) {
        const id = req.body.id

        const task = {
            title: req.body.title,
            description: req.body.description
        }

        await Task.update(task, { where: { id: id } })

        res.redirect('/tasks')
    }

    static async toggleTaskStatus(req, res) {
        const id = req.body.id

        const task = {
            done: req.body.done === '0' ? true : false
        }

        await Task.update(task, { where: { id: id } })

        res.redirect('/tasks')
    }

    static async showTasks(req, res) {

        const tasks = await Task.findAll({ raw: true })

        res.render('tasks/all', { tasks })
    }

}