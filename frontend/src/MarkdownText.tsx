import type { ReactNode } from 'react'

/** Render Markdown strong markers as React text nodes, without injecting HTML. */
export function MarkdownText({ children }: { children: string }) {
  const nodes: ReactNode[] = []
  const bold = /(\*\*|__)(.+?)\1/g
  let last = 0
  let match: RegExpExecArray | null

  while ((match = bold.exec(children)) !== null) {
    if (match.index > last) nodes.push(children.slice(last, match.index))
    nodes.push(<strong key={match.index}>{match[2]}</strong>)
    last = match.index + match[0].length
  }

  if (last < children.length) nodes.push(children.slice(last))
  return <>{nodes}</>
}
