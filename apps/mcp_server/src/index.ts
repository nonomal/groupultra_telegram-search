import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'

const server = new McpServer({
  name: 'tg-search-mcp-server',
  version: '0.0.1',
})

server.connect(new StdioServerTransport())
