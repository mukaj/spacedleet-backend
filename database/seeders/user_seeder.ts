import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    await User.create({
      id: 1,
      fullName: 'Adnan Mukaj',
      email: 'n01685939@humber.ca',
      password: 'testPassword123#',
    })
  }
}
