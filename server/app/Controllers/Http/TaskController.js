'use strict'

const Task = use('App/Models/Task')

class TaskController {
    async index({response}){
        let tasks = await Task.all()

        return response.json(tasks)
    }

    async store({request,response}){
        const taskInfo = request.only(['task_name'])

        const task = new Task()
        task.task_name = taskInfo.task_name

        await task.save()
        return response.status(201).json(task)
    }
}


module.exports = TaskController
