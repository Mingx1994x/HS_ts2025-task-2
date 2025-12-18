export function pickRandomItemsByCategory<T extends { category: string }>(
  data: T[],
  count: number
): T[] {
  const grouped = data.reduce<Record<string, T[]>>((acc, item) => {
    acc[item.category] ??= []
    acc[item.category].push(item)
    return acc
  }, {})

  return Object.keys(grouped)
    .sort(() => Math.random() - 0.5)
    .slice(0, count)
    .map(category => {
      const items = grouped[category]
      return items[Math.floor(Math.random() * items.length)]
    })
}

