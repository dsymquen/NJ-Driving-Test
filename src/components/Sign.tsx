import type { JSX } from 'react'
import { SIGN_BY_CODE, signUrl } from '../data/signs'

/**
 * Renders a MUTCD sign from the prerendered artwork in public/signs/.
 *
 * `title` overrides the alt text — quiz questions pass a neutral one so the
 * label does not give the answer away.
 */
export function Sign({
  code,
  size = 120,
  title,
}: {
  code: string
  size?: number
  title?: string
}): JSX.Element | null {
  const spec = SIGN_BY_CODE[code]
  if (!spec) return null

  return (
    <img
      className="sign"
      src={signUrl(code)}
      width={size}
      height={size}
      alt={title ?? spec.name}
      loading="lazy"
      draggable={false}
    />
  )
}
