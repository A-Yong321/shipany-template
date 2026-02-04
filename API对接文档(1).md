# AI 中转平台 API 对接文档

> 本文档提供完整的 API 接入指南，包括认证方式、接口说明、请求示例和测试账号

---

## 📋 目录

1. [快速开始](#快速开始)
2. [认证方式](#认证方式)
3. [测试账号](#测试账号)
4. [接口列表](#接口列表)
5. [图片生成 API](#图片生成-api)
6. [视频生成 API](#视频生成-api)
7. [音乐生成 API](#音乐生成-api)
8. [任务查询 API](#任务查询-api)
9. [账户管理 API](#账户管理-api)
10. [文件上传 API](#文件上传-api)
11. [错误码说明](#错误码说明)
12. [平台支持列表](#平台支持列表)

---

## 🚀 快速开始

### 基础信息

- **API 基础地址**: `https://openapi.ai-studio.me`
- **协议**: HTTPS
- **请求方式**: POST
- **Content-Type**: `application/json`
- **字符编码**: UTF-8

### 快速测试

```bash
curl -X POST \
  -H "Authorization: Bearer sk-VVcGEpwwm4Thtra20N4ppN48xQJ4A7lh" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "a beautiful sunset over the ocean"}' \
  https://openapi.ai-studio.me/api/grok/images
```

---

## 🔐 认证方式

所有 API 请求需要在请求头中携带 Bearer Token：

```
Authorization: Bearer {your_api_key}
```

**示例**:
```
Authorization: Bearer sk-VVcGEpwwm4Thtra20N4ppN48xQJ4A7lh
```


---

## 🎫 测试账号

我们为您准备了 5 个测试账号，每个账号初始余额 **¥1000.00**，可直接用于接口测试：

| 租户名称 | API Key | 初始余额 | 限流配置 |
|---------|---------|---------|---------|
| demo6 | `sk-VVcGEpwwm4Thtra20N4ppN48xQJ4A7lh` | ¥1000.00 | 20次/分钟, 1000次/天 |

> ⚠️ **注意**: 请妥善保管您的 API Key，不要泄露给他人。测试账号仅供开发测试使用。

---

## 📚 接口列表

### 图片生成平台

| 平台 | 接口路径 | 说明 |
|------|---------|------|
| Grok | `/api/grok/images` | Grok 图像生成 |
| Dreamina | `/api/dreamina/images` | 字节跳动 Dreamina |
| Kling | `/api/kling/images` | 可灵 AI 图像生成 |
| Lovart | `/api/lovart/images` | Lovart 图像生成 |
| Krea | `/api/krea/images` | Krea 图像生成 |

### 视频生成平台

| 平台 | 接口路径 | 说明 |
|------|---------|------|
| Sora | `/api/sora/videos` | OpenAI Sora |
| Dreamina | `/api/dreamina/videos` | 字节跳动 Dreamina |
| Kling | `/api/kling/videos` | 可灵 AI 视频生成 |
| Hailuo | `/api/hailuo/videos` | 海螺 AI |
| Higgsfield | `/api/higgsfield/videos` | Higgsfield |
| HeyGen | `/api/heygen/videos` | HeyGen |
| Krea | `/api/krea/videos` | Krea 视频生成 |

### 音乐生成平台

| 平台 | 接口路径 | 说明 |
|------|---------|------|
| Suno | `/api/suno/music` | Suno 音乐生成 |

### 任务查询

所有平台都支持任务查询，路径格式为 `/api/{platform}/tasks`

### 账户管理

| 接口 | 路径 | 说明 |
|------|------|------|
| 查询余额 | `/api/account/balance` | 查询账户余额和限流信息 |
| 消费记录 | `/api/account/consumption` | 查询消费明细 |

### 文件上传

| 接口 | 路径 | 说明 |
|------|------|------|
| 上传文件 | `/api/upload/file` | 上传图片/视频文件 |

---

## 🖼️ 图片生成 API

### 请求格式

**POST** `/api/{platform}/images`

支持的平台: `grok`, `dreamina`, `kling`, `lovart`, `krea`

### 请求参数

```json
{
  "prompt": "a beautiful sunset over the ocean",
  "model": "flux-dev",
  "size": "1024x1024",
  "count": 1
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| prompt | string | ✅ | 图片描述提示词 |
| model | string | ❌ | 模型名称（如 flux-dev） |
| size | string | ❌ | 图片尺寸（如 1024x1024） |
| count | int | ❌ | 生成数量，默认 1 |

### 响应示例

```json
{
  "task_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

### 完整示例

```bash
curl -X POST \
  -H "Authorization: Bearer sk-VVcGEpwwm4Thtra20N4ppN48xQJ4A7lh" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "a cute cat sitting on a windowsill, digital art",
    "size": "1024x1024"
  }' \
  https://openapi.ai-studio.me/api/grok/images
```

---

## 🎬 视频生成 API

### 请求格式

**POST** `/api/{platform}/videos`

支持的平台: `sora`, `dreamina`, `kling`, `hailuo`, `higgsfield`, `heygen`, `krea`

### 文生视频请求参数

```json
{
  "action": "text2video",
  "prompt": "a cat playing with a ball in the garden",
  "model": "kling-v1",
  "duration": 5,
  "aspect_ratio": "16:9"
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| action | string | ✅ | 操作类型: `text2video`, `image2video`, `extend` |
| prompt | string | ✅ | 视频描述提示词 |
| model | string | ❌ | 模型名称 |
| duration | int | ❌ | 视频时长（秒）: 5, 10, 15 等 |
| aspect_ratio | string | ❌ | 宽高比: `16:9`, `9:16`, `1:1` |

### 图生视频请求参数

```json
{
  "action": "image2video",
  "prompt": "make this image come alive",
  "image_url": "https://example.com/image.jpg",
  "duration": 5
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| action | string | ✅ | 固定值: `image2video` |
| prompt | string | ✅ | 视频描述提示词 |
| image_url | string | ✅ | 参考图片 URL |
| duration | int | ❌ | 视频时长（秒） |

### 响应示例

```json
{
  "task_id": "dd01fc69-e1f7-4b68-aa8c-463f6b748d11"
}
```

### 完整示例

```bash
# 文生视频
curl -X POST \
  -H "Authorization: Bearer sk-VVcGEpwwm4Thtra20N4ppN48xQJ4A7lh" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "text2video",
    "prompt": "a beautiful sunset over mountains with birds flying",
    "duration": 5,
    "aspect_ratio": "16:9"
  }' \
  https://openapi.ai-studio.me/api/sora/videos

# 图生视频
curl -X POST \
  -H "Authorization: Bearer sk-VVcGEpwwm4Thtra20N4ppN48xQJ4A7lh" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "image2video",
    "prompt": "animate this scene with gentle movement",
    "image_url": "https://example.com/reference.jpg"
  }' \
  https://openapi.ai-studio.me/api/kling/videos
```

---

## 🎵 音乐生成 API

### 请求格式

**POST** `/api/suno/music`

### 请求参数

```json
{
  "prompt": "a happy pop song about summer vacation",
  "lyrics": "Summer days are here again\nSun is shining bright...",
  "style": "pop, upbeat, energetic"
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| prompt | string | ✅ | 音乐描述提示词 |
| lyrics | string | ❌ | 歌词内容 |
| style | string | ❌ | 音乐风格（如 pop, rock, jazz） |

### 响应示例

```json
{
  "task_id": "abc123-def456-ghi789"
}
```

### 完整示例

```bash
curl -X POST \
  -H "Authorization: Bearer sk-VVcGEpwwm4Thtra20N4ppN48xQJ4A7lh" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "a relaxing piano melody for meditation",
    "style": "ambient, peaceful, slow tempo"
  }' \
  https://openapi.ai-studio.me/api/suno/music
```

---

## 🔍 任务查询 API

### 请求格式

**POST** `/api/{platform}/tasks`

所有平台都支持任务查询，将 `{platform}` 替换为对应平台名称。

### 请求参数

```json
{
  "task_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| task_id | string | ✅ | 任务 ID（生成接口返回的 task_id） |

### 响应示例

#### 处理中

```json
{
  "task_id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "processing",
  "created_at": "2026-01-24T10:30:00+08:00"
}
```

#### 成功 - 图片

```json
{
  "task_id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "succeeded",
  "created_at": "2026-01-24T10:30:00+08:00",
  "completed_at": "2026-01-24T10:31:00+08:00",
  "images": [
    {
      "url": "https://cdn.example.com/image1.png"
    }
  ]
}
```

#### 成功 - 视频

```json
{
  "task_id": "dd01fc69-e1f7-4b68-aa8c-463f6b748d11",
  "status": "succeeded",
  "created_at": "2026-01-24T10:30:00+08:00",
  "completed_at": "2026-01-24T10:35:00+08:00",
  "video": {
    "url": "https://cdn.example.com/video.mp4",
    "duration": 5
  }
}
```

#### 成功 - 音乐

```json
{
  "task_id": "abc123-def456-ghi789",
  "status": "succeeded",
  "created_at": "2026-01-24T10:30:00+08:00",
  "completed_at": "2026-01-24T10:33:00+08:00",
  "music": [
    {
      "url": "https://cdn.example.com/song.mp3",
      "title": "Summer Vibes",
      "duration": 180
    }
  ]
}
```

#### 失败

```json
{
  "task_id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "failed",
  "created_at": "2026-01-24T10:30:00+08:00",
  "error": {
    "code": "GENERATION_FAILED",
    "message": "图像生成失败，请重试"
  }
}
```

### 任务状态说明

| status | 说明 |
|--------|------|
| pending | 待处理 |
| queued | 排队中 |
| processing | 处理中 |
| succeeded | 成功 |
| failed | 失败 |
| cancelled | 已取消 |
| timeout | 超时 |

### 完整示例

```bash
curl -X POST \
  -H "Authorization: Bearer sk-VVcGEpwwm4Thtra20N4ppN48xQJ4A7lh" \
  -H "Content-Type: application/json" \
  -d '{
    "task_id": "550e8400-e29b-41d4-a716-446655440000"
  }' \
  https://openapi.ai-studio.me/api/grok/tasks
```

---

## 💰 账户管理 API

### 查询余额

**POST** `/api/account/balance`

#### 请求参数

无需请求体，直接发送 POST 请求即可。

#### 响应示例

```json
{
  "success": true,
  "data": [{
    "balance_cents": 100000,
    "balance_display": "¥1000.00",
    "tier": 2,
    "tier_name": "标准版",
    "usage_today": {
      "request_count": 50,
      "cost_cents": 500
    },
    "rate_limit": {
      "per_minute": 20,
      "per_day": 1000,
      "remaining_today": 950
    }
  }],
  "trace_id": "abc123def456"
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| balance_cents | int | 账户余额（分），100000 = ¥1000.00 |
| balance_display | string | 格式化的余额显示 |
| tier | int | 套餐等级: 1=免费版, 2=标准版, 3=专业版 |
| tier_name | string | 套餐名称 |
| usage_today.request_count | int | 今日请求次数 |
| usage_today.cost_cents | int | 今日消费金额（分） |
| rate_limit.per_minute | int | 每分钟请求限制 |
| rate_limit.per_day | int | 每天请求限制 |
| rate_limit.remaining_today | int | 今日剩余请求次数 |

#### 完整示例

```bash
curl -X POST \
  -H "Authorization: Bearer sk-VVcGEpwwm4Thtra20N4ppN48xQJ4A7lh" \
  -H "Content-Type: application/json" \
  https://openapi.ai-studio.me/api/account/balance
```

---

### 查询消费记录

**POST** `/api/account/consumption`

#### 请求参数

```json
{
  "start_date": "2026-01-01",
  "end_date": "2026-01-31",
  "platform": "grok"
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| start_date | string | ❌ | 开始日期（YYYY-MM-DD） |
| end_date | string | ❌ | 结束日期（YYYY-MM-DD） |
| platform | string | ❌ | 平台名称筛选 |

#### 响应示例

```json
{
  "success": true,
  "data": [{
    "total": 100,
    "records": [
      {
        "id": "log-id-001",
        "task_id": "550e8400-e29b-41d4-a716-446655440000",
        "platform": "grok",
        "task_type": "images",
        "cost_cents": 10,
        "created": "2026-01-24T10:30:00+08:00"
      }
    ]
  }],
  "trace_id": "xyz789"
}
```

#### 完整示例

```bash
curl -X POST \
  -H "Authorization: Bearer sk-VVcGEpwwm4Thtra20N4ppN48xQJ4A7lh" \
  -H "Content-Type: application/json" \
  -d '{
    "start_date": "2026-01-01",
    "end_date": "2026-01-31"
  }' \
  https://openapi.ai-studio.me/api/account/consumption
```

---

## 📤 文件上传 API

### 请求格式

**POST** `/api/upload/file`

Content-Type: `multipart/form-data`

### 请求参数

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| file | file | ✅ | 文件对象（图片或视频） |

### 文件限制

- **最大文件大小**: 100 MB
- **支持格式**: 
  - 图片: jpg, jpeg, png, gif, webp
  - 视频: mp4, mov, avi, webm

### 响应示例

```json
{
  "success": true,
  "data": [{
    "url": "https://cdn.example.com/uploads/abc123.jpg",
    "filename": "image.jpg",
    "size": 1024000,
    "content_type": "image/jpeg"
  }],
  "trace_id": "xyz789"
}
```

### 完整示例

```bash
curl -X POST \
  -H "Authorization: Bearer sk-VVcGEpwwm4Thtra20N4ppN48xQJ4A7lh" \
  -F "file=@/path/to/your/image.jpg" \
  https://openapi.ai-studio.me/api/upload/file
```

### 使用场景

上传文件后，可以将返回的 `url` 用于图生视频等需要图片输入的接口：

```bash
# 1. 先上传图片
UPLOAD_RESPONSE=$(curl -X POST \
  -H "Authorization: Bearer sk-VVcGEpwwm4Thtra20N4ppN48xQJ4A7lh" \
  -F "file=@image.jpg" \
  https://openapi.ai-studio.me/api/upload/file)

# 2. 提取图片 URL
IMAGE_URL=$(echo $UPLOAD_RESPONSE | jq -r '.data[0].url')

# 3. 使用图片 URL 生成视频
curl -X POST \
  -H "Authorization: Bearer sk-VVcGEpwwm4Thtra20N4ppN48xQJ4A7lh" \
  -H "Content-Type: application/json" \
  -d "{
    \"action\": \"image2video\",
    \"prompt\": \"animate this scene\",
    \"image_url\": \"$IMAGE_URL\"
  }" \
  https://openapi.ai-studio.me/api/kling/videos
```

---

## ⚠️ 错误码说明

### 通用错误响应格式

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "错误描述信息"
  },
  "trace_id": "abc123def456"
}
```

### 错误码列表

| HTTP 状态码 | 错误码 | 说明 | 解决方案 |
|-----------|--------|------|---------|
| 400 | MISSING_REQUIRED_FIELD | 缺少必填字段 | 检查请求参数是否完整 |
| 400 | INVALID_PARAMETER | 参数格式错误 | 检查参数类型和格式 |
| 400 | API_NOT_IMPLEMENTED | 接口未实现 | 确认平台是否支持该功能 |
| 401 | UNAUTHORIZED | 无效的 API Key | 检查 Authorization 头是否正确 |
| 401 | INVALID_TOKEN | Token 验证失败 | 确认 API Key 是否有效 |
| 402 | INSUFFICIENT_BALANCE | 账户余额不足 | 充值或联系管理员 |
| 403 | FORBIDDEN | 无权访问 | 检查账户权限 |
| 403 | ACCOUNT_FROZEN | 账户已冻结 | 联系管理员解冻 |
| 404 | TASK_NOT_FOUND | 任务不存在 | 确认 task_id 是否正确 |
| 404 | NOT_FOUND | 资源不存在 | 检查请求路径 |
| 429 | RATE_LIMIT_EXCEEDED | 请求频率超限 | 降低请求频率或升级套餐 |
| 429 | TOO_MANY_REQUESTS | 请求过多 | 稍后重试 |
| 500 | INTERNAL_ERROR | 服务器内部错误 | 联系技术支持 |
| 500 | API_ERROR | API 调用失败 | 稍后重试或联系技术支持 |

### 错误处理示例

```python
import requests

url = "http://10.200.0.6:8000/api/grok/images"
headers = {
    "Authorization": "Bearer sk-VVcGEpwwm4Thtra20N4ppN48xQJ4A7lh",
    "Content-Type": "application/json"
}
data = {
    "prompt": "a beautiful landscape"
}

response = requests.post(url, headers=headers, json=data)

if response.status_code == 200:
    result = response.json()
    task_id = result.get("task_id")
    print(f"任务创建成功: {task_id}")
elif response.status_code == 401:
    print("认证失败，请检查 API Key")
elif response.status_code == 402:
    print("余额不足，请充值")
elif response.status_code == 429:
    print("请求过于频繁，请稍后重试")
else:
    error = response.json().get("error", {})
    print(f"错误: {error.get('code')} - {error.get('message')}")
```

---

## 🌐 平台支持列表

### 图片生成平台

| 平台 | 平台标识 | 接口路径 | 特色功能 |
|------|---------|---------|---------|
| Grok | `grok` | `/api/grok/images` | X.AI 出品，高质量图像生成 |
| Dreamina | `dreamina` | `/api/dreamina/images` | 字节跳动，支持中文提示词 |
| Kling | `kling` | `/api/kling/images` | 可灵 AI，国产优质模型 |
| Lovart | `lovart` | `/api/lovart/images` | 艺术风格图像生成 |
| Krea | `krea` | `/api/krea/images` | 创意图像生成 |

### 视频生成平台

| 平台 | 平台标识 | 接口路径 | 特色功能 |
|------|---------|---------|---------|
| Sora | `sora` | `/api/sora/videos` | OpenAI 出品，顶级视频生成 |
| Dreamina | `dreamina` | `/api/dreamina/videos` | 字节跳动，支持中文 |
| Kling | `kling` | `/api/kling/videos` | 可灵 AI，支持长视频 |
| Hailuo | `hailuo` | `/api/hailuo/videos` | 海螺 AI，MiniMax 出品 |
| Higgsfield | `higgsfield` | `/api/higgsfield/videos` | 专业视频生成 |
| HeyGen | `heygen` | `/api/heygen/videos` | 数字人视频生成 |
| Krea | `krea` | `/api/krea/videos` | 创意视频生成 |

### 音乐生成平台

| 平台 | 平台标识 | 接口路径 | 特色功能 |
|------|---------|---------|---------|
| Suno | `suno` | `/api/suno/music` | 专业音乐生成，支持歌词 |

### 平台能力对比

| 功能 | Grok | Dreamina | Kling | Sora | Hailuo | Suno |
|------|------|----------|-------|------|--------|------|
| 图片生成 | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| 文生视频 | ❌ | ✅ | ✅ | ✅ | ✅ | ❌ |
| 图生视频 | ❌ | ✅ | ✅ | ✅ | ✅ | ❌ |
| 音乐生成 | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| 中文支持 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 自定义模型 | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |

---

## 💡 最佳实践

### 1. 异步轮询模式

由于 AI 生成任务通常需要较长时间，建议使用异步轮询模式：

```python
import requests
import time

def create_image_task(prompt):
    """创建图片生成任务"""
    url = "https://openapi.ai-studio.me/api/grok/images"
    headers = {
        "Authorization": "Bearer sk-VVcGEpwwm4Thtra20N4ppN48xQJ4A7lh",
        "Content-Type": "application/json"
    }
    data = {"prompt": prompt}
    
    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        return response.json().get("task_id")
    else:
        raise Exception(f"任务创建失败: {response.text}")

def query_task_status(task_id):
    """查询任务状态"""
    url = "https://openapi.ai-studio.me/api/grok/tasks"
    headers = {
        "Authorization": "Bearer sk-VVcGEpwwm4Thtra20N4ppN48xQJ4A7lh",
        "Content-Type": "application/json"
    }
    data = {"task_id": task_id}
    
    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"查询失败: {response.text}")

def wait_for_task_completion(task_id, max_wait=300, interval=5):
    """等待任务完成"""
    start_time = time.time()
    
    while time.time() - start_time < max_wait:
        result = query_task_status(task_id)
        status = result.get("status")
        
        if status == "succeeded":
            return result
        elif status == "failed":
            raise Exception(f"任务失败: {result.get('error')}")
        
        print(f"任务状态: {status}, 等待中...")
        time.sleep(interval)
    
    raise Exception("任务超时")

# 使用示例
task_id = create_image_task("a beautiful sunset over the ocean")
print(f"任务已创建: {task_id}")

result = wait_for_task_completion(task_id)
print(f"生成成功: {result.get('images')[0].get('url')}")
```

### 2. 错误重试机制

```python
import time
from functools import wraps

def retry_on_error(max_retries=3, delay=2):
    """错误重试装饰器"""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_retries):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_retries - 1:
                        raise
                    print(f"第 {attempt + 1} 次尝试失败: {e}, {delay}秒后重试...")
                    time.sleep(delay)
        return wrapper
    return decorator

@retry_on_error(max_retries=3, delay=2)
def create_task_with_retry(prompt):
    return create_image_task(prompt)
```

### 3. 批量任务处理

```python
from concurrent.futures import ThreadPoolExecutor, as_completed

def batch_create_images(prompts, max_workers=5):
    """批量创建图片生成任务"""
    task_ids = []
    
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = {executor.submit(create_image_task, prompt): prompt 
                  for prompt in prompts}
        
        for future in as_completed(futures):
            prompt = futures[future]
            try:
                task_id = future.result()
                task_ids.append({"prompt": prompt, "task_id": task_id})
                print(f"任务创建成功: {prompt} -> {task_id}")
            except Exception as e:
                print(f"任务创建失败: {prompt} -> {e}")
    
    return task_ids

# 使用示例
prompts = [
    "a cat sitting on a windowsill",
    "a beautiful mountain landscape",
    "a futuristic city at night"
]

tasks = batch_create_images(prompts)
```

### 4. 余额监控

```python
def check_balance():
    """检查账户余额"""
    url = "https://openapi.ai-studio.me/api/account/balance"
    headers = {
        "Authorization": "Bearer sk-VVcGEpwwm4Thtra20N4ppN48xQJ4A7lh",
        "Content-Type": "application/json"
    }
    
    response = requests.post(url, headers=headers)
    if response.status_code == 200:
        data = response.json().get("data", [{}])[0]
        balance = data.get("balance_cents", 0) / 100
        remaining = data.get("rate_limit", {}).get("remaining_today", 0)
        
        print(f"账户余额: ¥{balance:.2f}")
        print(f"今日剩余请求: {remaining}")
        
        if balance < 10:
            print("⚠️ 警告: 余额不足 ¥10，请及时充值")
        
        return data
    else:
        raise Exception(f"查询余额失败: {response.text}")

# 在创建任务前检查余额
check_balance()
```

---

## 🔧 SDK 示例

### Python SDK 示例

```python
import requests
import time
from typing import Optional, Dict, Any

class AIGenerationClient:
    """AI 生成平台客户端"""
    
    def __init__(self, api_key: str, base_url: str = "https://openapi.ai-studio.me"):
        self.api_key = api_key
        self.base_url = base_url
        self.headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
    
    def _request(self, method: str, path: str, data: Optional[Dict] = None) -> Dict[str, Any]:
        """发送 HTTP 请求"""
        url = f"{self.base_url}{path}"
        response = requests.request(method, url, headers=self.headers, json=data)
        
        if response.status_code >= 400:
            error = response.json().get("error", {})
            raise Exception(f"API Error: {error.get('code')} - {error.get('message')}")
        
        return response.json()
    
    def generate_image(self, platform: str, prompt: str, **kwargs) -> str:
        """生成图片"""
        data = {"prompt": prompt, **kwargs}
        result = self._request("POST", f"/api/{platform}/images", data)
        return result.get("task_id")
    
    def generate_video(self, platform: str, prompt: str, action: str = "text2video", **kwargs) -> str:
        """生成视频"""
        data = {"action": action, "prompt": prompt, **kwargs}
        result = self._request("POST", f"/api/{platform}/videos", data)
        return result.get("task_id")
    
    def generate_music(self, prompt: str, **kwargs) -> str:
        """生成音乐"""
        data = {"prompt": prompt, **kwargs}
        result = self._request("POST", "/api/suno/music", data)
        return result.get("task_id")
    
    def query_task(self, platform: str, task_id: str) -> Dict[str, Any]:
        """查询任务状态"""
        data = {"task_id": task_id}
        return self._request("POST", f"/api/{platform}/tasks", data)
    
    def wait_for_completion(self, platform: str, task_id: str, 
                          max_wait: int = 300, interval: int = 5) -> Dict[str, Any]:
        """等待任务完成"""
        start_time = time.time()
        
        while time.time() - start_time < max_wait:
            result = self.query_task(platform, task_id)
            status = result.get("status")
            
            if status == "succeeded":
                return result
            elif status == "failed":
                error = result.get("error", {})
                raise Exception(f"任务失败: {error.get('message')}")
            
            time.sleep(interval)
        
        raise Exception("任务超时")
    
    def get_balance(self) -> Dict[str, Any]:
        """查询账户余额"""
        result = self._request("POST", "/api/account/balance")
        return result.get("data", [{}])[0]
    
    def upload_file(self, file_path: str) -> str:
        """上传文件"""
        url = f"{self.base_url}/api/upload/file"
        headers = {"Authorization": f"Bearer {self.api_key}"}
        
        with open(file_path, "rb") as f:
            files = {"file": f}
            response = requests.post(url, headers=headers, files=files)
        
        if response.status_code >= 400:
            raise Exception(f"上传失败: {response.text}")
        
        result = response.json()
        return result.get("data", [{}])[0].get("url")

# 使用示例
if __name__ == "__main__":
    # 初始化客户端
    client = AIGenerationClient("sk-VVcGEpwwm4Thtra20N4ppN48xQJ4A7lh")
    
    # 查询余额
    balance = client.get_balance()
    print(f"账户余额: {balance.get('balance_display')}")
    
    # 生成图片
    task_id = client.generate_image("grok", "a beautiful sunset over the ocean")
    print(f"图片任务已创建: {task_id}")
    
    # 等待完成
    result = client.wait_for_completion("grok", task_id)
    image_url = result.get("images", [{}])[0].get("url")
    print(f"图片生成成功: {image_url}")
    
    # 生成视频
    task_id = client.generate_video("sora", "a cat playing in the garden", duration=5)
    print(f"视频任务已创建: {task_id}")
    
    # 图生视频
    image_url = client.upload_file("reference.jpg")
    task_id = client.generate_video("kling", "animate this scene", 
                                    action="image2video", image_url=image_url)
    print(f"图生视频任务已创建: {task_id}")
```

### Node.js SDK 示例

```javascript
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

class AIGenerationClient {
    constructor(apiKey, baseUrl = 'https://openapi.ai-studio.me') {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
        this.headers = {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        };
    }

    async request(method, path, data = null) {
        try {
            const response = await axios({
                method,
                url: `${this.baseUrl}${path}`,
                headers: this.headers,
                data
            });
            return response.data;
        } catch (error) {
            const errorData = error.response?.data?.error || {};
            throw new Error(`API Error: ${errorData.code} - ${errorData.message}`);
        }
    }

    async generateImage(platform, prompt, options = {}) {
        const data = { prompt, ...options };
        const result = await this.request('POST', `/api/${platform}/images`, data);
        return result.task_id;
    }

    async generateVideo(platform, prompt, action = 'text2video', options = {}) {
        const data = { action, prompt, ...options };
        const result = await this.request('POST', `/api/${platform}/videos`, data);
        return result.task_id;
    }

    async generateMusic(prompt, options = {}) {
        const data = { prompt, ...options };
        const result = await this.request('POST', '/api/suno/music', data);
        return result.task_id;
    }

    async queryTask(platform, taskId) {
        const data = { task_id: taskId };
        return await this.request('POST', `/api/${platform}/tasks`, data);
    }

    async waitForCompletion(platform, taskId, maxWait = 300, interval = 5) {
        const startTime = Date.now();

        while (Date.now() - startTime < maxWait * 1000) {
            const result = await this.queryTask(platform, taskId);
            const status = result.status;

            if (status === 'succeeded') {
                return result;
            } else if (status === 'failed') {
                const error = result.error || {};
                throw new Error(`任务失败: ${error.message}`);
            }

            await new Promise(resolve => setTimeout(resolve, interval * 1000));
        }

        throw new Error('任务超时');
    }

    async getBalance() {
        const result = await this.request('POST', '/api/account/balance');
        return result.data[0];
    }

    async uploadFile(filePath) {
        const formData = new FormData();
        formData.append('file', fs.createReadStream(filePath));

        const response = await axios.post(
            `${this.baseUrl}/api/upload/file`,
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    ...formData.getHeaders()
                }
            }
        );

        return response.data.data[0].url;
    }
}

// 使用示例
(async () => {
    const client = new AIGenerationClient('sk-VVcGEpwwm4Thtra20N4ppN48xQJ4A7lh');

    // 查询余额
    const balance = await client.getBalance();
    console.log(`账户余额: ${balance.balance_display}`);

    // 生成图片
    const taskId = await client.generateImage('grok', 'a beautiful sunset');
    console.log(`图片任务已创建: ${taskId}`);

    // 等待完成
    const result = await client.waitForCompletion('grok', taskId);
    console.log(`图片生成成功: ${result.images[0].url}`);
})();
```

---

## 📞 技术支持

### 常见问题

#### Q1: 如何获取正式的 API Key？

A: 测试账号仅供开发测试使用。如需正式 API Key，请联系管理员申请。

#### Q2: 任务一直处于 processing 状态怎么办？

A: AI 生成任务通常需要 30 秒到 5 分钟不等，具体取决于平台和任务复杂度。如果超过 10 分钟仍未完成，请联系技术支持。

#### Q3: 如何处理 429 限流错误？

A: 当前测试账号限制为 20 次/分钟，1000 次/天。如需更高配额，请升级套餐或联系管理员。

#### Q4: 支持哪些图片格式？

A: 支持 jpg, jpeg, png, gif, webp 格式，单个文件最大 100MB。

#### Q5: 视频生成需要多长时间？

A: 根据平台和视频时长不同，通常需要 1-5 分钟。Sora 等高质量平台可能需要更长时间。

#### Q6: 如何查看消费明细？

A: 使用 `/api/account/consumption` 接口可以查询详细的消费记录。

#### Q7: API 是否支持 HTTPS？

A: 是的，API 已全面支持 HTTPS 协议，确保数据传输安全。

#### Q8: 如何实现回调通知？

A: 部分平台支持 `callback_url` 参数，任务完成后会自动回调您的服务器。详见 api-format-spec.md 文档。

### 联系方式

- **技术支持邮箱**: support@example.com
- **API 文档**: 查看 `tt-openapi-gateway/architecture/` 目录下的详细文档
- **问题反馈**: 请提供 `trace_id` 以便快速定位问题

---

## 📝 更新日志

### v1.0.0 (2026-01-24)

- ✅ 支持 Grok、Dreamina、Kling、Lovart、Krea 图片生成
- ✅ 支持 Sora、Dreamina、Kling、Hailuo、Higgsfield、HeyGen、Krea 视频生成
- ✅ 支持 Suno 音乐生成
- ✅ 支持任务查询和状态追踪
- ✅ 支持账户余额查询和消费记录
- ✅ 支持文件上传功能
- ✅ 提供 5 个测试账号，每个初始余额 ¥1000

---

## 📄 附录

### 相关文档

- [API 格式规范](./api-format-spec.md) - 详细的 API 格式说明
- [API 接口规范](./API接口规范.md) - 接口设计规范
- [业务架构设计](./01-业务架构设计.md) - 系统业务架构
- [系统架构设计](./02-系统架构设计.md) - 技术架构说明

### 术语表

| 术语 | 说明 |
|------|------|
| task_id | 任务唯一标识符，用于查询任务状态 |
| trace_id | 链路追踪 ID，用于问题排查 |
| prompt | 提示词，描述要生成的内容 |
| platform | 平台标识，如 grok、sora、kling 等 |
| action | 操作类型，如 text2video、image2video |
| balance_cents | 账户余额（分），100 分 = 1 元 |
| tier | 套餐等级，1=免费版，2=标准版，3=专业版 |

---

## 🎉 开始使用

现在您已经了解了所有接口的使用方法，可以开始集成了！

**快速开始步骤**:

1. 选择一个测试账号的 API Key
2. 使用 curl 或 SDK 发送第一个请求
3. 查询任务状态获取生成结果
4. 查看余额和消费记录

**推荐流程**:

```bash
# 1. 查询余额
curl -X POST \
  -H "Authorization: Bearer sk-VVcGEpwwm4Thtra20N4ppN48xQJ4A7lh" \
  https://openapi.ai-studio.me/api/account/balance

# 2. 生成图片
curl -X POST \
  -H "Authorization: Bearer sk-VVcGEpwwm4Thtra20N4ppN48xQJ4A7lh" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "a beautiful sunset"}' \
  https://openapi.ai-studio.me/api/grok/images

# 3. 查询任务（使用返回的 task_id）
curl -X POST \
  -H "Authorization: Bearer sk-VVcGEpwwm4Thtra20N4ppN48xQJ4A7lh" \
  -H "Content-Type: application/json" \
  -d '{"task_id": "your-task-id"}' \
  https://openapi.ai-studio.me/api/grok/tasks
```

祝您使用愉快！🚀

---

**文档版本**: v1.0.0  
**最后更新**: 2026-01-24  
**维护者**: AI 中转平台技术团队
