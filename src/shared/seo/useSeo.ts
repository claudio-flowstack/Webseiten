import { useEffect } from 'react'

const PROD_ORIGIN = 'https://www.flowstack-agentur.de'

export type SeoConfig = {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article'
  noindex?: boolean
}

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string): () => void {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  let created = false
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
    created = true
  }
  const prev = el.getAttribute('content')
  el.setAttribute('content', content)
  return () => {
    if (created) el?.remove()
    else if (prev !== null && el) el.setAttribute('content', prev)
  }
}

function setLink(rel: string, href: string): () => void {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  let created = false
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
    created = true
  }
  const prev = el.getAttribute('href')
  el.setAttribute('href', href)
  return () => {
    if (created) el?.remove()
    else if (prev !== null && el) el.setAttribute('href', prev)
  }
}

export function useSeo(config: SeoConfig): void {
  const { title, description, path, image, type = 'website', noindex = false } = config

  useEffect(() => {
    const origin =
      typeof window !== 'undefined' && window.location.hostname !== 'localhost'
        ? window.location.origin
        : PROD_ORIGIN
    const url = `${origin}${path}`
    const ogImage = image ? `${origin}${image}` : `${origin}/claudio-hero-1200.jpg`

    const prevTitle = document.title
    document.title = title

    const cleanups: Array<() => void> = [
      setMeta('meta[name="description"]', 'name', 'description', description),
      setMeta('meta[property="og:title"]', 'property', 'og:title', title),
      setMeta('meta[property="og:description"]', 'property', 'og:description', description),
      setMeta('meta[property="og:url"]', 'property', 'og:url', url),
      setMeta('meta[property="og:type"]', 'property', 'og:type', type),
      setMeta('meta[property="og:image"]', 'property', 'og:image', ogImage),
      setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image'),
      setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title),
      setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description),
      setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage),
      setLink('canonical', url),
    ]

    if (noindex) {
      cleanups.push(setMeta('meta[name="robots"]', 'name', 'robots', 'noindex, nofollow'))
    }

    return () => {
      document.title = prevTitle
      cleanups.forEach(fn => fn())
    }
  }, [title, description, path, image, type, noindex])
}
