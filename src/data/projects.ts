export type ProjectIcon = 'gamepad' | 'chart' | 'ball'

export interface Project {
  title: string
  description: string
  tags: string[]
  icon: ProjectIcon
  liveUrl?: string
  repoUrl?: string
  image?: string
}

export const projects: Project[] = [
  {
    title: 'VG Picker',
    description:
      'Ranks games by critic score divided by hours-to-beat, so a great 6-hour game beats an equally great 80-hour epic. Scope the ranking globally or to a specific subscription service like Xbox Game Pass or PS Plus.',
    tags: ['React', 'TypeScript', 'Supabase'],
    icon: 'gamepad',
    image: '/projects/vg-picker.jpg',
    liveUrl: 'https://vg-picker.vercel.app',
  },
  {
    title: 'Finance Tracker',
    description:
      'A personal finance tracker for keeping tabs on spending and budgets, built as a React + TypeScript single-page app.',
    tags: ['React', 'TypeScript', 'Vite'],
    icon: 'chart',
    image: '/projects/finance-tracker.jpg',
    liveUrl: 'https://finance-tracker-ruby-mu.vercel.app',
    repoUrl: 'https://github.com/mystraldev/finance-tracker',
  },
  {
    title: 'Pokémon War Bot',
    description:
      'A Twitter bot that ran automated "Pokémon war" battles, posting matchups and results to followers.',
    tags: ['Python', 'Twitter API', 'Bot'],
    icon: 'ball',
    image: '/projects/pokemon-war-bot.jpg',
    liveUrl: 'https://twitter.com/PokemonWarBot1',
    repoUrl: 'https://github.com/hatsyio/pokemon-war-bot',
  },
]

export interface OpenSourceContribution {
  title: string
  description: string
  tags: string[]
  prUrl: string
}

export const openSourceContributions: OpenSourceContribution[] = [
  {
    title: 'SQLAlchemy',
    description:
      'Fixed a documentation bug in the reconnecting-engine example where the new cursor was assigned to an unused variable, causing the retry logic to reuse the stale cursor instead of the new one. Merged upstream via the project’s Gerrit review.',
    tags: ['Python', 'Documentation'],
    prUrl: 'https://github.com/sqlalchemy/sqlalchemy/pull/8075',
  },
  {
    title: 'JHipster',
    description:
      'Fixed a broken Bootswatch API URL on the JHipster project website, merged by the maintainers.',
    tags: ['Jekyll'],
    prUrl: 'https://github.com/jhipster/jhipster.github.io/pull/141',
  },
]
