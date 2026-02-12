#!/usr/bin/env python3
import requests

# Test with real credentials
url = "https://request.base.com.vn/extapi/v1/group/list"
data = {
    "access_token_v2": "2329~eMDmZEieiSwCJV3Ybv7BHsJNL996E9S0GvWiL0xBx66CUK9kNh73hwLJbq4nI_UF_OsgV4tzjm6_m8rs6otdIMb6S6YAQNqfI4LY-y4ILd66BGBbgMdIzuwrg82PJr2R35m7ApqDhJtRi2K8v61ptg",
    "page": 0
}

headers = {
    "Content-Type": "application/x-www-form-urlencoded"
}

response = requests.post(url, data=data, headers=headers)
print("Status Code:", response.status_code)
print("Response JSON:")
import json
print(json.dumps(response.json(), indent=2)[:500])
