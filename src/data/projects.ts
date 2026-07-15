export interface Project {
  title: string
  description: string
  tags: string[]
  vercelUrl: string
  repoUrl?: string
  image?: string
}

export const projects: Project[] = [
  {
    title: 'VG Picker',
    description:
      'Ranks games by critic score divided by hours-to-beat, so a great 6-hour game beats an equally great 80-hour epic. Scope the ranking globally or to a specific subscription service like Xbox Game Pass or PS Plus.',
    tags: ['React', 'TypeScript', 'Supabase'],
    vercelUrl: 'https://vg-picker.vercel.app',
  },
  {
    title: 'Finance Tracker',
    description:
      'A personal finance tracker for keeping tabs on spending and budgets, built as a React + TypeScript single-page app.',
    tags: ['React', 'TypeScript', 'Vite'],
    vercelUrl: 'https://finance-tracker-ruby-mu.vercel.app',
    repoUrl: 'https://github.com/mystraldev/finance-tracker',
  },
]
