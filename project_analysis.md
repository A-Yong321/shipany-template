# 项目全量架构深度分析

本文档对当前项目的技术架构、目录结构及核心实现逻辑进行深度解析，旨在帮助开发者快速理解系统设计思路。

## 1. 总体技术架构分析

本项目是一个基于 **Next.js 16 (App Router)** 的现代全栈 AI SaaS 应用，采用了 **Modular Monolith (模块化单体)** 架构。其核心设计理念是**关注点分离 (Separation of Concerns)** 和 **插件化扩展 (Plugin-based Extensions)**。

### 核心技术栈
-   **框架**: Next.js 16 (App Router), React 19
-   **语言**: TypeScript
-   **数据库ORM**: Drizzle ORM (支持 MySQL/PostgreSQL/SQLite)
-   **认证**: Better Auth
-   **UI组件库**: Tailwind CSS 4, Radix UI, Shadcn/ui
-   **支付**: Stripe, PayPal
-   **AI集成**: Vercel AI SDK, Replicate, Fal.ai 等多模态模型集成

### 架构分层
系统主要分为以下四层：
1.  **表现层 (Presentation Layer)**: `src/app`, `src/components` - 负责页面渲染和交互。
2.  **业务逻辑层 (Business Logic Layer)**: `src/shared/services` - 负责协调核心业务流程，连接 UI 与底层资源。
3.  **核心基础设施层 (Core Infrastructure Layer)**: `src/core` - 提供认证、数据库连接、权限控制等基础能力。
4.  **扩展集成层 (Extension Layer)**: `src/extensions` - **（项目亮点）** 将 AI、支付、存储等第三方服务封装为独立插件，实现了高度解耦。
5.  **数据访问层 (Data Access Layer)**: `src/shared/models` - 封装数据库操作。

---

## 2. 项目目录结构详解

### 根目录
-   `src/`: 源代码主目录。
-   `public/`: 静态资源（图片、图标）。
-   `scripts/`: 运维脚本（数据库迁移、初始化 RBAC 等）。
-   `.env*`: 环境变量配置。
-   `next.config.mjs`: Next.js 配置文件。
-   `package.json`: 项目依赖定义。

### `src` 目录深度解析

#### 1. `src/app` (Next.js App Router)
这是应用的路由入口，采用 App Router 架构。
-   `src/app/[locale]/`: 国际化路由根目录。所有页面都在此目录下，以支持多语言。
    -   `src/app/[locale]/(auth)/`: 认证相关页面（登录、注册），`(group)` 语法用于组织路由但不影响 URL。
    -   `src/app/[locale]/(landing)/`: 落地页、营销页面（首页、价格页等）。
    -   `src/app/[locale]/(admin)/`: 管理后台页面。
    -   `src/app/[locale]/(chat)/`: AI 对话功能页面。
    -   `src/app/[locale]/(tools)/`: AI 工具集页面（如文生图、视频生成）。
-   `src/app/api/`: 后端 API 路由（注意：API 路由独立于 `[locale]` 目录）。
    -   `src/app/api/ai/`: AI 生成与查询接口。
    -   `src/app/api/auth/`: 认证相关接口。
    -   `src/app/api/webhooks/`: 支付等回调接口。

#### 2. `src/core` (核心基础设施)
系统的"底座"，不包含具体业务特性，只提供通用能力。
-   `src/core/auth/`: 认证配置（Better Auth）。
-   `src/core/db/`: 数据库连接与 Schema 定义。
    -   `src/core/db/schema/`: Drizzle ORM 的表结构定义。
-   `src/core/rbac/`: 角色权限控制 (Role-Based Access Control) 逻辑。
-   `src/core/i18n/`: 国际化配置。
-   `src/core/theme/`: 主题配置。

#### 3. `src/extensions` (扩展插件系统 - **核心设计**)
这是本项目最精彩的设计之一。所有与第三方服务的对接都封装在此，互不干扰。
-   `src/extensions/ai/`: AI 提供商封装 (OpenAI, Gemini, Claude, Midjourney, Replicate 等)。
    -   `src/extensions/ai/index.ts`: 统一导出。
    -   `src/extensions/ai/types.ts`: 定义统一的 AI 接口标准。
    -   `src/extensions/ai/[provider].ts`: 各个厂商的具体实现。
-   `src/extensions/payment/`: 支付渠道封装 (Stripe, LemonSqueezy 等)。
-   `src/extensions/storage/`: 对象存储封装 (S3, R2, AI Studio 等)。
-   `src/extensions/email/`: 邮件服务封装 (Resend, SMTP)。
-   `src/extensions/analytics/`: 统计分析封装 (Google Analytics 等)。

#### 4. `src/shared` (共享模块)
连接 UI 与 Core/Extensions 的胶水层。
-   `src/shared/services/`: **业务服务层**。例如 `src/shared/services/ai.ts` 会调用 `src/extensions/ai` 中的 Provider，对上层屏蔽具体厂商差异。
-   `src/shared/models/`: **数据模型层**。封装对数据库的 CRUD 操作，如 `src/shared/models/user.ts`, `src/shared/models/order.ts`。
-   `src/shared/components/`: 通用 UI 组件。
-   `src/shared/hooks/`: 自定义 React Hooks。
-   `src/shared/lib/`: 工具函数库 (hash, date, response helpers)。
-   `src/shared/types/`: TypeScript 类型定义。
-   `src/shared/contexts/`: React Context (如全局状态)。

#### 5. `src/config`
-   `src/config/`: 全站配置文件目录，包含站点信息、功能开关等。

---

## 3. 核心实现逻辑拆解：以 "AI 生成" 为例

为了让你真正理解这个架构是如何流动的，我们拆解一个 "用户点击生成图片" 的完整生命周期：

### 流程图解
`Frontend` -> `Next.js API Route` -> `Shared Service` -> `Extension Provider` -> `Third-party API`

### 详细步骤

#### 第一步：前端发起 (Presentation)
用户在 `src/app/[locale]/(tools)/text-to-image/page.tsx` 点击生成。前端调用 `/api/ai/generate` 接口。

#### 第二步：API 路由接收 (Controller)
文件：`src/app/api/ai/generate/route.ts`
1.  **鉴权**: 调用 `getUserInfo` (来自 `shared/models/user`) 确认用户身份。
2.  **计费**: 调用 `getRemainingCredits` (来自 `shared/models/credit`) 检查积分。
3.  **调度**: 获取 `mediaType` (如 `image`) 和 `provider` (如 `aistudio`) 参数。

#### 第三步：服务层调度 (Service)
文件：`src/shared/services/ai.ts`
API 路由调用 `getAIService()`。这个函数会实例化 `AIManager`，并根据配置加载所有可用的 `extensions`（如 `AIStudioProvider`, `ReplicateProvider`）。
*设计意图*: 这一层确保了 API 路由不需要知道具体的 AI 厂商实现细节，只需要找 Manager 要人。

#### 第四步：扩展层执行 (Extension)
文件：`src/extensions/ai/aistudio.ts` (以 AI Studio 为例)
1.  `AIStudioProvider` 接收到 `generate` 请求。
2.  它将通用的请求参数（Prompt, Model）转换为 AI Studio 专有的 API 格式。
3.  使用 `fetch` 向 `https://openapi.ai-studio.me` 发起 POST 请求。
4.  返回 `taskId` 给上层。

#### 第五步：结果持久化 (Data Access)
回到 API 路由，拿到 `taskId` 后，调用 `createAITask` (来自 `src/shared/models/ai_task.ts`)，将任务状态 `PENDING` 写入数据库。

#### 第六步：异步轮询
前端获得响应后，通过 `/api/ai/query` 接口轮询。该接口再次通过 `AIManager` -> `AIStudioProvider.query()` 去第三方查状态，并更新数据库。

# 前端开发指南 (写给初学者)

本指南旨在用最通俗易懂的语言（大白话），解释本项目的**前端代码结构**、**数据是如何显示在屏幕上的**，以及**如何修改页面**。我们不使用复杂的专业术语。

## 1. 我们的前端是如何"搭"起来的？ (组件化思想)

这个网站不是一张张画出来的，而是像拼图一样拼出来的。我们把网页拆成了一个个**小零件（组件）**。

### 1.1 三种不同级别的"零件"

1.  **基础零件 (Atomic Components)**
    *   **位置**: `src/shared/components/ui/`
    *   **是什么**: 它是最小的单位。比如一个 **按钮**、一个 **输入框**、一个 **滑动条**。
    *   **特点**: 它们很通用，没有任何业务逻辑，哪里都能用。

2.  **功能模块 (Blocks)**
    *   **位置**: `src/themes/default/blocks/`
    *   **是什么**: 把基础零件拼在一起，能干具体的事了。比如 **"生成操作区" (ToolContent)**，里面包含了输入框、上传按钮、生成按钮，它们组合在一起是为了完成"生成图片"这个任务。

3.  **页面模板 (Templates)**
    *   **位置**: `src/themes/default/templates/`
    *   **是什么**: 也就是页面的"骨架"。它规定了哪里放标题，哪里放操作区，哪里放底部的推荐列表。所有类似的页面都共用这一套骨架。

---

## 2. 核心揭秘：数据是如何变成画面的？ (Data Rendering)

这是初学者最容易困惑的地方：**"我在 `tools.ts` 里写了一行字，它最后怎么就变成网页上的卡片了？"**

这里有一条清晰的流水线，我们一步步看：

### 第一步：数据源头 (Source)
所有 AI 工具的配置都在 **`src/data/tools.ts`** 这个文件里。
打开它，你会看到类似这样的代码（这是一个数组，装着所有的工具）：

```typescript
// src/data/tools.ts
export const tools = [
  {
    slug: 'ai-kissing',       // 身份证号 (URL里显示的那个)
    title: 'AI Kissing',      // 标题
    items: [                  // 这个工具下有哪些特效
      {
        title: '法式接吻',     // 特效名
        effectSrc: 'path/to/image.png' // 效果图路径
      }
    ]
  }
  // ... 其他工具
];
```

### 第二步：页面获取数据 (Fetch)
当你访问 `/ai-kissing` 这个页面时，页面模板 **`ToolDetailTemplate.tsx`** 会先运行。它会根据你访问的网址（slug），去 `tools.ts` 里找对应的这部分数据。

```typescript
// ToolDetailTemplate.tsx
import { getToolConfig } from '@/data/tools';

// 1. 拿到网址里的 slug (比如 'ai-kissing')
const toolConfig = getToolConfig(slug);

// 2. 把 toolConfig 里的 items (特效列表) 提取出来，准备发给组件
const examples = toolConfig.items;
```

### 第三步：组件接收数据 (Props)
模板拿到 `examples` 数据后，把它传给 **`ToolContent`** 组件（就是页面中间那个操作区）。

```typescript
// ToolDetailTemplate.tsx 的渲染部分
<ToolContent 
  toolName="AI Kissing"
  examples={examples}  // <--- 关键！数据在这里传进去了
/>
```

### 第三步：组件循环渲染 (Loop & Render)
现在数据到了 **`ToolContent.tsx`** 内部。它通过一个**循环 (Map)**，把每一条数据变成一个按钮或卡片。

```typescript
// ToolContent.tsx 内部
{examples.map((example, index) => (
  <button key={index}>
    <img src={example.effectSrc} />  {/* 显示图片 */}
    <span>{example.title}</span>     {/* 显示文字 */}
  </button>
))}
```

**总结**:
1.  **写配置**: 你在 `tools.ts` 加一行数据。
2.  **读配置**: 模板通过 `slug` 找到这行数据。
3.  **传数据**: 模板把数据传给子组件。
4.  **画出来**: 子组件遍历数据，生成 HTML。

---

## 3. 专项深度解析：页面模板 (Template Mechanism)

既然所有工具都用同一个模板，那为什么有的页面有视频时长滑块，有的没有？这就涉及到**模板的具体实现原理**。

### 3.1 模板是谁？
模板是 `src/themes/default/templates/ToolDetailTemplate.tsx`。你可以把它想象成一个**"万能容器"**。它不关心具体装的是什么内容，它只关心**"结构"**（头、脚、中间区域）。

### 3.2 模板如何根据 `slug` 变形？
这就是我们常说的 "**条件渲染 (Conditional Rendering)**"。也就是写 `if...else` 代码来控制功能的开启和关闭。

在 `ToolDetailTemplate.tsx` 里，有这样一段关键代码：

```typescript
// 1. 判断当前工具是不是 'image-to-video' (图生视频)
const isVideoTool = slug === 'image-to-video';

// 2. 如果是视频工具，就开启这些开关
const showDurationSelector = isVideoTool;    // 显示时长滑块
const showResolutionSelector = isVideoTool;  // 显示分辨率选择
const buttonText = isVideoTool ? "Generate Video" : "Generate"; // 改按钮名字
```

**实际效果**:
*   如果你访问 `/image-to-video`：`isVideoTool` 是 **真 (true)** -> 滑块显示。
*   如果你访问 `/ai-kissing`：`isVideoTool` 是 **假 (false)** -> 滑块隐藏。

### 3.3 模板的控制权
模板虽然叫"模板"，但它其实是**页面逻辑的总指挥官**。它负责：
1.  **加载数据**: 负责去 `tools.ts` 拿数据。
2.  **加载翻译**: 负责去 `messages/en.json` 拿多语言文案。
3.  **决定布局**: 决定是否显示底部的 "How To" 教程区域（如果有配置的话）。
4.  **组装页面**: 最后把所有东西打包返还给浏览器。

---

## 4. 一个"点击"背后的逻辑 (User Interaction)

当用户点击 **"Generate" (生成)** 按钮时，系统是怎么运作的？

1.  **收集信息**: `ToolContent` 组件会收集用户输入的 Prompt（提示词）和上传的图片。
2.  **改变状态**: 它会把页面的状态变量 `isGenerating` 设为 `true`。这就导致按钮变成了"转圈圈"的样子，防止用户重复点击。
3.  **发送请求**: 调用 `startGenerate` 函数，向后端 API (`/api/ai/generate`) 发送请求。
4.  **轮询等待**:
    *   后端很快返回一个 `taskId`（任务号），告诉你任务开始了。
    *   前端代码 (`tool-content-context.tsx`) 会启动一个定时器，每隔 3 秒去问一次后端："任务号 123 做好了吗？"
    *   如果后端回："做好了，这是图片链接"，前端就停止定时器。
5.  **展示结果**: 拿到链接后，前端把它存入 `generatedResult` 变量，屏幕上就会自动显示出这张生成好的图片。

---

## 5. 常见修改指南 (手把手教学)

### 场景一：我想加一个新的特效
不需要改任何代码！
1.  打开 `src/data/tools.ts`。
2.  找到你要加的工具分类（比如 `ai-kissing`）。
3.  在 `items` 数组里复制粘贴一段，改改 `title` 和图片路径。
4.  保存，刷新页面，新特效就出现了。

### 场景二：我想改整个网站的主题颜色
1.  打开 `src/app/globals.css`。
2.  找到 `:root` 下面的 `--primary`。那是一串颜色代码。
3.  把它改成你想要的颜色，全站按钮和重点色都会变。

### 场景三：我想修改页面上的文字（汉化）
这是一个多语言项目，文字不直接写在代码里。
1.  打开 `src/content/locales/zh.json` (中文) 或 `en.json` (英文)。
2.  搜索你要改的文字。
3.  修改冒号后面的内容。

### 场景四：我想让生成工具多一个输入框
1.  找到 **`src/themes/default/blocks/tool-content.tsx`**。
2.  在 `return (...)` 部分，找到现有的输入框 (`Textarea` 或 `Input`)。
3.  复制它，粘贴在下面。
4.  给它绑定一个新的状态变量 (`useState`)。
5.  在点击生成按钮时，把这个新变量也带上发给后端。

# 后端开发指南 (后端是怎么工作的？)

如果说前端是"表皮"，后端就是"骨肉脏腑"。这里解释一下当你点击生成时，服务器在背面都干了些什么。

## 1. 核心四层结构 (Layered Architecture)

我们的后端不像一团乱麻，而是像千层饼一样分层的。请求就像一颗珠子，一层层往下掉，处理完了再一层层送回来。

### 第一层：门卫 (API Routes)
*   **位置**: `src/app/api/...`
*   **职责**:
    1.  **接客**: 接收前端发来的请求。
    2.  **查验身份**: 检查用户登录没？(`getUserInfo`)
    3.  **查余额**: 检查用户积分够不够？(`getRemainingCredits`)
    4.  **分发**: 一切正常，就往下级派活。

### 第二层：调度中心 (Service Layer)
*   **位置**: `src/shared/services/ai.ts`
*   **职责**:
    *   它是一个"大管家"。它不亲自去画图，它的工作是**找人**。
    *   比如你点名要 AI Studio 画图，它就去仓库里把 `AIStudioProvider` 叫出来干活。

### 第三层：外包工 (Extensions/Providers)
*   **位置**: `src/extensions/ai/aistudio.ts`
*   **职责**:
    *   这是真正干活的地方。
    *   它负责把我们的需求翻译成 AI 厂商（比如 AI Studio）能听懂的语言。
    *   它负责联网发送请求，拿着厂商的"取票号"回来。

### 第四层：记账员 (Database/Models)
*   **位置**: `src/shared/models/ai_task.ts`
*   **职责**:
    *   不管成功失败，每一笔账都要记下来。
    *   它负责把"任务开始"、"任务成功"、"扣除积分"这些事情永久写进数据库里。

---

## 2. 深度解析：一次 API 调用的全过程

让我们跟踪一下代码的流向，看看 `/api/ai/generate` 这个接口内部发生了什么。

### 步骤 1: 门卫安检
代码在 `src/app/api/ai/generate/route.ts`。

```typescript
// 1. 检查有没有带必要的参数（比如提示词 prompt）
if (!prompt) throw new Error('prompt required');

// 2. 检查用户是否登录
const user = await getUserInfo();
if (!user) throw new Error('no auth');

// 3. 检查积分够不够（比如画图要 2 分）
const remaining = await getRemainingCredits(user.id);
if (remaining < 2) throw new Error('not enough credits');
```

**人话翻译**: 任何不合规的请求，连门都进不去，直接在这里被弹回去。

### 步骤 2: 调度派活
代码在 `src/shared/services/ai.ts`。

```typescript
// 1. 读取后台配置（key填了没？）
const configs = await getAllConfigs();

// 2. 找到对应的服务商（比如 aistudio）
const provider = aiManager.getProvider('aistudio');
```

**人话翻译**: 就像包工头看看手底下谁有空，把活派给谁。

### 步骤 3: 联网办事
代码在 `src/extensions/ai/aistudio.ts`。

```typescript
// 1. 准备发给 AI 厂商的数据包
const body = {
  prompt: "一只可爱的小猫",
  model: "kling-v1",
  ratio: "16:9"
};

// 2. 真的发起网络请求了！
const res = await fetch('https://openapi.ai-studio.me/api/generate', {
  body: JSON.stringify(body)
});

// 3. 拿到一个任务ID (taskId)
const { task_id } = await res.json();
```

**人话翻译**: 这一步是请求走出了我们的服务器，跑到了 AI 公司的服务器上。我们拿到一个"排队号" (task_id)。

### 步骤 4: 记账存档
回到 `route.ts`，最后一步。

```typescript
// 把这个任务记在数据库里，状态是 "PENDING" (进行中)
await createAITask({
  userId: user.id,
  taskId: task_id,
  status: 'PENDING',
  costCredits: 2 // 预扣 2 积分
});
```

**人话翻译**: 这样就算服务器重启，我们也知道刚才用户发起了个任务，还没做完。

---

## 3. 为什么需要"轮询" (Polling)？

你可能注意到前端有个定时器在不断问后端。
这是因为 AI 画图很慢（可能要 10 秒到 1 分钟）。如果我们一直在这个接口等着，浏览器会超时报错。

**聪明的设计**：
1.  **发起接口** (`/generate`): 瞬间完成。只告诉你："我去做了，这是你的排队号"。
2.  **查询接口** (`/query`): 前端拿着排队号，每隔 3 秒问一次："好了没？"
    *   第 3 秒：后端查一下 AI 厂商，回："没呢，PROCESSING"。
    *   第 6 秒：后端查一下 AI 厂商，回："没呢，PROCESSING"。
    *   第 9 秒：后端查一下 AI 厂商，回："好了！这是图片地址"。

这种模式叫 **"异步处理"**，是处理慢任务的标准做法。
