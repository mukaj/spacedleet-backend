/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
// const UserProblemsController = () => import('#controllers/user_problems_controller')
const SessionController = () => import('#controllers/session_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .resource('problems', () => import('#controllers/user_problems_controller'))
  .apiOnly()
  .use(
    '*',
    middleware.auth({
      guards: ['api'],
    })
  )

router
  .post('problems/:id/review', [() => import('#controllers/user_problems_controller'), 'review'])
  .use(
    middleware.auth({
      guards: ['api'],
    })
  )

router.post('problems/due', [() => import('#controllers/user_problems_controller'), 'due']).use(
  middleware.auth({
    guards: ['api'],
  })
)

router.post('session', [SessionController, 'store'])
router.delete('session', [SessionController, 'destroy']).use(middleware.auth({ guards: ['api'] }))
