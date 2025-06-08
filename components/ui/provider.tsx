"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { Provider as ReduxProvider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "@/store/store" // Using path alias @/
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"

export function Provider(props: ColorModeProviderProps) {
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
