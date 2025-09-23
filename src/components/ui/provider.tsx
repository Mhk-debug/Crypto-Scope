"use client"

import { ChakraProvider } from "@chakra-ui/react"
import { createSystem, defaultConfig } from "@chakra-ui/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: "var(--font-bricolage)" },
        body: { value: "var(--font-bricolage)" },
      },
    },
  },
})

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider  value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
