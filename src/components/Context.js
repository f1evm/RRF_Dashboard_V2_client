import React from 'react'

const NodesContext = React.createContext({})

export const NodesProvider = NodesContext.Provider
export const NodesConsumer = NodesContext.Consumer
export default NodesContext
