# n8n-nodes-basevn-request

n8n community node for [BaseVN Request Public API](https://base.vn) integration.

[![NPM Version](https://img.shields.io/npm/v/n8n-nodes-basevn-request)](https://www.npmjs.com/package/n8n-nodes-basevn-request)

## Installation

Install from npm in your n8n root directory:

```bash
npm install n8n-nodes-basevn-request
```

Or install via n8n Community Nodes:
1. Go to **Settings → Community Nodes**
2. Click **Install**
3. Enter `n8n-nodes-basevn-request`

## Prerequisites

- n8n instance (self-hosted or cloud)
- Base.vn account with BaseVN Request Public API access
- API access token (`access_token_v2`)

## Configuration

1. Add new credentials: **BaseVN Request Public API**
2. Enter your Base.vn domain (e.g., `example.base.vn`)
3. Provide your `access_token_v2`

## Features

### Resources

#### Group
- **Get**: Retrieve group by ID
- **Get Many**: List all groups with pagination

#### Request
- **Get**: Get request details by ID
- **Get Many**: List requests with filters
- **Get with Custom Table**: Retrieve requests with custom table data
- **Add Follower**: Add follower to request

##### Direct (Sub-resource)
- **Create via Direct Group**: Create request through direct group

##### Custom (Sub-resource)
- **Create via Custom Group**: Create request through custom group

##### Post (Sub-resource)
- **Get Posts**: Load posts from request with pagination

##### Comment (Sub-resource)
- **Get Comments**: Load comments from post with pagination

## API Documentation

For complete API reference and detailed documentation, see:
📘 [Base.vn Request API - Postman Documentation](https://documenter.getpostman.com/view/1345096/SzzheyWQ?version=latest)

## Operations Examples

**Create Request via Direct Group:**
```json
{
  "group_id": 123,
  "title": "New Request",
  "content": "Request description",
  "priority": "high"
}
```

**Get Posts with Pagination:**
```json
{
  "request_id": 456,
  "last_id": 0,
  "returnAll": false
}
```

## Support

- Issues: [GitHub Issues](https://github.com/QuangChinhDE/n8n-nodes-basevn-request/issues)
- Documentation: [Base.vn API Docs](https://documenter.getpostman.com/view/1345096/SzzheyWQ?version=latest)

## License

MIT

### 4. Build Your Node

Edit the example nodes to fit your use case, or create new node files by copying the structure from [nodes/Example/](nodes/Example/).

> [!TIP]
> If you want to scaffold a completely new node package, use `npm create @n8n/node` to start fresh with the CLI's interactive generator.


