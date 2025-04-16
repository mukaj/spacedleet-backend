import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Problem from '#models/problem'

export default class extends BaseSeeder {
  async run() {
    await Problem.createMany([
      {
        id: 1,
        title: 'Two Sum',
        link: 'https://leetcode.com/problems/two-sum/',
      },
      {
        id: 2,
        title: 'Longest Substring Without Repeating Characters',
        link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
      },
      {
        id: 3,
        title: 'Median of Two Sorted Arrays',
        link: null,
      },
    ])
  }
}
