import { BaseSeeder } from '@adonisjs/lucid/seeders'
import UserProblem from '#models/user_problem'

export default class extends BaseSeeder {
  async run() {
    await UserProblem.create({
      userId: 1,
      problemId: 1,
    })
  }
}
