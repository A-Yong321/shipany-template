# 项目快速概览 (Project Overview)

这份文档旨在帮助开发者快速理解 `shipany-template` 项目的结构、技术栈和关键功能。

## 1. 项目简介
这是一个基于 **Next.js 16** 和 **React 19** 的全栈 AI SaaS 模板项目。它集成了现代化的开发工具链，旨在快速构建高性能、可扩展的 AI 应用或内容网站。

## 2. 核心技术栈

- **框架**: [Next.js 16](https://nextjs.org/) (App Router), React 19
- **语言**: TypeScript
- **样式**: [Tailwind CSS v4](https://tailwindcss.com/), Radix UI (Headless UI)
- **数据库 ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **认证**: [Better Auth](https://www.better-auth.com/)
- **内容管理**: [Fumadocs](https://fumadocs.vercel.app/) (用于文档和博客)
- **国际化**: [next-intl](https://next-intl-docs.vercel.app/)
- **部署**:配置了 Cloudflare Pages (`opennextjs-cloudflare`) 支持

## 3. 目录结构说明

```
/
├── content/                # MDX 内容文件 (博客、文档等)
│   ├── docs/               # 文档内容
│   ├── pages/              # 静态页面内容
│   └── posts/              # 博客文章
├── public/                 # 静态资源 (图片、图标等)
├── src/                    # 源代码
│   ├── app/                # Next.js App Router 页面路由
│   ├── config/             # 项目全局配置
│   ├── core/               # 核心逻辑模块
│   │   ├── auth/           # 认证配置
│   │   ├── db/             # 数据库 schema 和配置
│   │   └── i18n/           # 国际化配置
│   ├── shared/             # 共享组件、工具函数、Types
│   │   ├── components/     # UI 组件 (Buttons, Dialogs 等)
│   │   ├── hooks/          # 自定义 React Hooks
│   │   └── utils/          # 工具函数
│   └── themes/             # 主题样式定义
├── next.config.mjs         # Next.js 配置 (集成 MDX, i18n)
├── package.json            # 依赖和脚本
└── [其他配置文件]
```

## 4. 关键脚本 (Scripts)

在 [package.json](file:///d:/shipany-template/package.json) 中定义的常用命令：

- **开发**:
  - `npm run dev`: 启动本地开发服务器
- **构建**:
  - `npm run build`: 构建生产版本
- **数据库**:
  - `npm run db:generate`: 生成数据库迁移文件
  - `npm run db:migrate`: 执行数据库迁移
  - `npm run db:studio`: 打开 Drizzle Studio 可视化管理数据库
- **其他**:
  - `npm run auth:generate`: 生成认证相关配置
  - `npm run cf:deploy`: 部署到 Cloudflare

## 5. 开发指南

### 启动项目
确保已安装 Node.js (推荐 v20+)，然后运行：
```bash
npm install
npm run dev
```

### 数据模型
数据库 Schema 定义在 `src/core/db` 中。修改 Schema 后，记得运行 `npm run db:generate` 和 `npm run db:migrate`。

### 内容管理
项目使用 Fumadocs 处理内容。虽然是代码优先的内容管理，但也支持 MDX 的丰富特性。内容文件位于 `content/` 目录下。

### 国际化
所有文本内容应通过 `next-intl` 进行管理。相关的字典文件和配置位于 `src/core/i18n`。
