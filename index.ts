import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { placeOrder } from "./trade.js";

// Create an MCP server
const server = new McpServer({
  name: "Demo",
  version: "1.0.0"
});

// Add an addition tool
server.tool("add",
  { a: z.number(), b: z.number() },
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }]
  })
);

server.tool("Buy-a-Stock",
  { stock: z.string(), qty: z.number() },
  async ({ stock, qty }) => {
    await placeOrder(stock, qty, "BUY");
    return {
      content: [{ type: "text", text: "Stock has been bought" }]
    };
  }
);

server.tool("Sell-a-Stock",
  { stock: z.string(), qty: z.number() },
  async ({ stock, qty }) => {
    await placeOrder(stock, qty, "SELL");
    return {
      content: [{ type: "text", text: "Stock has been sold" }]
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);