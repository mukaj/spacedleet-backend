import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_problems'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('user_id').unsigned().notNullable()
      table.integer('problem_id').unsigned().notNullable()

      table.integer('review_count').unsigned().defaultTo(0)
      table.datetime('last_reviewed').nullable()
      table.datetime('next_review').nullable()
      table.float('ease_factor').defaultTo(2.5)
      table.integer('interval').unsigned().defaultTo(1)
      table.text('user_notes').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
