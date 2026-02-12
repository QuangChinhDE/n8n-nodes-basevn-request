# Testing n8n-nodes-basevn-request locally

## Method 1: Use npm link (Recommended)

1. In this package directory:
```bash
npm run build
npm link
```

2. In your n8n installation directory:
```bash
npm link n8n-nodes-basevn-request
```

3. Restart n8n:
```bash
n8n start
```

4. After testing, unlink:
```bash
# In n8n directory
npm unlink n8n-nodes-basevn-request

# In this package directory
npm unlink
```

## Method 2: Install from local path

1. Build the package:
```bash
npm run build
```

2. In your n8n installation:
```bash
npm install /path/to/n8n-nodes-basevn-request
```

3. Restart n8n

## Method 3: Test with n8n in development mode

1. Clone n8n repository
2. Build this package: `npm run build`
3. Copy dist files to n8n's custom nodes directory
4. Run n8n in development mode

## Quick API Testing

Test API endpoints directly with curl before implementing:

```bash
# Test List all groups
curl -X POST 'https://request.base.com.vn/extapi/v1/group/list' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'access_token_v2=YOUR_TOKEN&page=0'

# Test Get single group
curl -X POST 'https://request.base.com.vn/extapi/v1/group/get' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'access_token_v2=YOUR_TOKEN&id=GROUP_ID'
```
