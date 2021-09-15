// src/mocks/server.js
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

// This configures a request mocking server with the given request handlers.
//handlers file is an array of response objects to be spread into the mock server
export const server = setupServer(...handlers);