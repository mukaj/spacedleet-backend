import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Problem from '#models/problem'

export default class UserProblem extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare problemId: number

  @column()
  declare reviewCount: number

  @column.dateTime()
  declare lastReviewed: DateTime

  @column.dateTime()
  declare nextReview: DateTime

  @column()
  declare easeFactor: number

  @column()
  declare interval: number

  @column()
  declare userNotes: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // relationships
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Problem)
  declare problem: BelongsTo<typeof Problem>

  public async review(score: number) {
    score = Math.max(0, Math.min(5, score))

    if (score >= 3) {
      this.reviewCount += 1
      this.easeFactor = this.easeFactor || 2.5
      this.easeFactor = this.easeFactor - 0.8 + 0.28 * score - 0.02 * score * score
      this.easeFactor = Math.max(this.easeFactor, 1.3)

      if (this.reviewCount === 1) {
        this.interval = 1
      } else if (this.reviewCount === 2) {
        this.interval = 6
      } else {
        this.interval = Math.round(this.interval * this.easeFactor)
      }
    } else {
      this.reviewCount = 0
      this.interval = 1
    }

    this.lastReviewed = DateTime.now()
    this.nextReview = this.lastReviewed.plus({ days: this.interval })

    await this.save()
  }
}
