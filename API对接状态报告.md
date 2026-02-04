# API 对接状态报告

## 🟢 已成功对接接口 (Connected Interfaces)

经过严格的代码审计与测试，确认以下接口已完全符合《AI 中转平台 API 对接文档》的要求：

1.  **图片生成 (Image Generation)**
    *   **状态**: ✅ 已严格对接
    *   **API 路径**: `/api/{platform}/images` (支持 Grok, Dreamina, Kling, Lovart, Krea)
    *   **参数映射**:
        *   `prompt`: 必须，传递用户输入。
        *   `model`: 可选，`tool-config.js` 中已配置默认模型 (如 Grok 为 `flux-dev`)。
        *   `size`: 已实现从 `aspect_ratio` (16:9, 9:16) 到具体分辨率 (1280x720, 720x1280) 的自动转换。
        *   `count`: 默认为 1。

2.  **视频生成 (Video Generation)**
    *   **状态**: ✅ 已严格对接
    *   **API 路径**: `/api/{platform}/videos` (支持 Sora, Dreamina, Kling, Hailuo, Higgsfield, HeyGen, Krea)
    *   **参数映射**:
        *   `action`: 自动判断。若包含上传图片则为 `image2video`，否则为 `text2video`。
        *   `model`: 动态传递，如 Kling 使用 `kling-v1`，Hailuo 使用 `hailuo-v1`。
        *   `image_url`: 上传文件后获得的 URL，用于图生视频。
        *   `aspect_ratio`: 直接传递 (16:9, 9:16, 1:1)。
        *   `duration`: 传递秒数 (5, 10 等)。

3.  **音乐生成 (Music Generation)**
    *   **状态**: ✅ 已严格对接
    *   **API 路径**: `/api/suno/music`
    *   **参数**: `prompt`, `style`, `lyrics` 已正确透传。

4.  **任务查询 (Task Query)**
    *   **状态**: ✅ 已严格对接
    *   **API 路径**: `/api/{platform}/tasks`
    *   **逻辑**: 使用 POST 方法 + `task_id` 查询，符合文档要求（而非 GET）。
    *   **轮询**: 前端实现了每秒轮询，直到状态为 `succeeded` 或 `failed`。

5.  **文件上传 (File Upload)**
    *   **状态**: ✅ 已严格对接
    *   **API 路径**: `/api/upload/file`
    *   **逻辑**: 使用 `multipart/form-data` 上传，解析返回的 `url` 用于后续生成任务。

6.  **账户管理 (Account)**
    *   **状态**: ✅ 已严格对接
    *   **API 路径**: `/api/account/balance`
    *   **功能**: 仪表盘可正确显示余额、套餐等级和剩余配额。

## 🔍 请求参数严格审计 (Parameter Strict Audit)

已对代码中的请求参数与文档进行逐字段比对，结果如下：

### A. 图片生成 (`POST /api/{platform}/images`)
| 字段 | 文档要求 | 代码实现 |虽然 | 结论 |
| :--- | :--- | :--- | :--- | :--- |
| `prompt` | string | `params.prompt` (string) | ✅ 一致 |
| `model` | string (可选) | `params.model` (string, e.g. "flux-dev") | ✅ 一致 |
| `size` | string | 自动转换逻辑: `16:9` -> `"1280x720"` | ✅ 类型一致 |
| `count` | int | 固定值 `1` | ✅ 一致 |

### B. 视频生成 (`POST /api/{platform}/videos`)
| 字段 | 文档要求 | 代码实现 | 结论 |
| :--- | :--- | :--- | :--- |
| `action` | string ("text2video"\|"image2video") | 逻辑判断: 有图则 `"image2video"` | ✅ 一致 |
| `prompt` | string | `params.prompt` (string) | ✅ 一致 |
| `model` | string | `params.model` (string, e.g. "kling-v1") | ✅ 一致 |
| `duration` | int | `config.duration` (number, 5) | ✅ 类型一致 (int) |
| `aspect_ratio` | string | `config.aspectRatio` (string, "16:9") | ✅ 一致 |
| `image_url` | string (图生视频必填) | `uploadResponse.url` (string) | ✅ 一致 |

### C. 任务查询 (`POST /api/{platform}/tasks`)
| 字段 | 文档要求 | 代码实现 | 结论 |
| :--- | :--- | :--- | :--- |
| `task_id` | string | `JSON.stringify({ task_id: ... })` | ✅ 一致 |
| **Method** | POST | `method: 'POST'` | ✅ 一致 |

**结论**: 当前前端代码 (`src/lib/api-client.js`) 的请求格式、参数名称、数据类型均**严格符合** `API对接文档(1).md` 的规范。
    *   **说明**: 支持 Grok, Dreamina, Kling 等平台。自动映射长宽比参数。
    *   **状态**: ✅ 已实现

2.  **视频生成 (Video Generation)**
    *   **API 路径**: `/api/{platform}/videos`
    *   **说明**: 支持文生视频 (Text-to-Video) 和图生视频 (Image-to-Video)。支持 Sora, Kling, Dreamina 等。
    *   **状态**: ✅ 已实现

3.  **音乐生成 (Music Generation)**
    *   **API 路径**: `/api/suno/music`
    *   **说明**: 支持 Suno 音乐生成。
    *   **状态**: ✅ 已实现

4.  **文件上传 (File Upload)**
    *   **API 路径**: `/api/upload/file`
    *   **说明**: 用于上传参考图片（图生视频功能）。
    *   **状态**: ✅ 已实现

5.  **任务状态查询 (Task Query)**
    *   **API 路径**: `/api/{platform}/tasks`
    *   **说明**: 实现了轮询机制，支持获取生成进度和最终结果 URL。
    *   **状态**: ✅ 已实现

6.  **账户余额/套餐信息 (Account Balance)**
    *   **API 路径**: `/api/account/balance`
    *   **说明**: 用户仪表盘 (Dashboard) 的 "Subscription" 标签页现在显示真实的套餐名称、余额和每日限额使用情况。
    *   **状态**: ✅ 已实现

---

## 🟡 未对接/保留 Mock 接口 (Mock Interfaces)

以下功能由于 API 文档未提供对应接口或接口功能限制，目前仍使用 Mock 假数据：

1.  **用户创作历史 (User Creations History)**
    *   **位置**: Dashboard -> My Creations
    *   **原因**: API 提供的消费记录接口 (`/api/account/consumption`) 仅返回任务元数据 (Task ID, Cost)，不包含生成的图片/视频 URL。无法直接用于展示作品画廊。
    *   **现状**: 使用静态 Mock 数据展示。

2.  **用户个人资料 (User Profile)**
    *   **位置**: Dashboard -> Settings (Name, Email)
    *   **原因**: API 文档中没有提供获取用户昵称、邮箱等个人信息的接口。
    *   **现状**: 使用 Mock 数据 ("John Doe", "you@example.com")。

## 📝 备注

*   **API Key**: 目前使用测试 Key `sk-VVcGEpwwm4Thtra20N4ppN48xQJ4A7lh`。
*   **跨域问题**: 如果在本地开发环境 (`localhost`) 遇到 CORS 错误，建议配置 Next.js `rewrites` 或在后端启用 CORS。目前代码直接从前端发起请求。
