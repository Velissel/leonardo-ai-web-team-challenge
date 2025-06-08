"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { Provider as ReduxProvider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "@/store/store" // Using path alias @/
import {
  ColorModeProvider,
} from "./color-mode"
import { ThemeProviderProps } from "next-themes"

export function Provider(props: ThemeProviderProps) {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider value={defaultSystem}>
          <ColorModeProvider {...props} />
        </ChakraProvider>
      </PersistGate>
    </ReduxProvider>
  )
}
