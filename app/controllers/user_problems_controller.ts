import type { HttpContext } from '@adonisjs/core/http'
import UserProblem from '#models/user_problem'
import { DateTime } from 'luxon'

export default class UserProblemsController {
  /**
   * Display a list of resource
   */
  async index({ auth }: HttpContext) {
    return await UserProblem.query().where('user_id', auth.user!.id)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ auth, request, response }: HttpContext) {
    const userProblem = await UserProblem.query()
      .where('user_id', auth.user!.id)
      .andWhere('problem_id', request.input('problem_id'))
      .first()
    if (userProblem != null) {
      return response.badRequest({
        message: 'A problem-repetition already exists for this problem.',
      })
    }

    return await UserProblem.create({
      userId: auth.user?.id,
      problemId: request.input('problem_id'),
    })
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    return await UserProblem.query().where('id', params.id).firstOrFail()
  }

  /**
   * Review individual record
   */
  public async review({ auth, params, request, response }: HttpContext) {
    const user = auth.user!
    const score = request.input('score')

    if (score == null || score < 0 || score > 5) {
      return response.badRequest({ message: 'Score must be between 0 and 5' })
    }

    const userProblem = await UserProblem.query()
      .where('id', params.id)
      .andWhere('user_id', user.id)
      .firstOrFail()

    await userProblem.review(score) // uses model method

    return userProblem
  }

  /**
   * View the Problems due today
   */

  public async due({ auth }: HttpContext) {
    const user = auth.user!

    return await UserProblem.query()
      .where('user_id', user.id)
      .andWhere('next_review', '<=', DateTime.now().toUTC().toString())
      .preload('problem') // includes problem details
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
