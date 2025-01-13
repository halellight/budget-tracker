import Image from 'next/image'
import { useState } from 'react'

interface StateImageProps {
  state: string
  name: string
}

export function StateImage({ state, name }: StateImageProps) {
  const [src, setSrc] = useState(`/states/${state.toLowerCase()}.jpg`)

  return (
    <Image
      src={src}
      alt={`${name} State`}
      layout="fill"
      objectFit="cover"
      onError={() => setSrc('/placeholder.jpg')}
    />
  )
}

