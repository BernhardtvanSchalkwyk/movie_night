import type { SnackSelection } from '../App'

interface SnackItem {
  id: string
  emoji: string
  label: string
  category: string
}

export function formatEmailBody(selections: SnackSelection, items: SnackItem[], customNote?: string): string {
  const selected = items.filter(item => (selections[item.id] ?? 0) > 0)

  if (selected.length === 0) {
    return 'No items selected — just the movie and good company.'
  }

  const byCategory: Record<string, string[]> = {}
  selected.forEach(item => {
    if (!byCategory[item.category]) byCategory[item.category] = []
    byCategory[item.category].push(`${item.emoji} ${item.label}`)
  })

  const lines: string[] = ['🎬 Movie Night Order', '===================', '']

  if (byCategory['snacks']) {
    lines.push('🍿 SNACKS')
    byCategory['snacks'].forEach(s => lines.push(`  - ${s}`))
    lines.push('')
  }
  if (byCategory['drinks']) {
    lines.push('🥤 DRINKS')
    byCategory['drinks'].forEach(s => lines.push(`  - ${s}`))
    lines.push('')
  }
  if (byCategory['extras']) {
    lines.push('✨ FUN EXTRAS')
    byCategory['extras'].forEach(s => lines.push(`  - ${s}`))
    lines.push('')
  }

  if (customNote?.trim()) {
    lines.push('📝 SPECIAL REQUESTS')
    lines.push(`  - ${customNote.trim()}`)
    lines.push('')
  }

  lines.push(`Submitted: ${new Date().toLocaleString()}`)

  return lines.join('\n')
}
