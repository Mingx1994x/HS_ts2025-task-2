import type { TProductContentFormat } from "@/types/customer/product"
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


export function formatContent(content:string):TProductContentFormat{
  const data= content.split(';').reduce((acc,item)=>{
    const [key,value]=item.split('：')
    switch(key){
      case '加護能力':
        acc.ability=value
      case '稀有度':
        acc.rarity=Number(value)
      case '建議場合':
        acc.recommend=value
    }
    return acc
  },{ability:'',rarity:0,recommend:''})
  return data
}