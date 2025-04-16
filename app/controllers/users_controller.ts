import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UsersController {
  async store({ request, auth }: HttpContext) {
    const { email, password, full_name } = request.only(['email', 'password', 'full_name'])
    const user = await User.create({
      fullName: full_name,
      password: password,
      email: email,
    })

    return await auth.use('api').createToken(user)
  }
}
