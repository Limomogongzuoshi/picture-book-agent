# 绘本生成智能体

使用 Next.js 和 Seedream 4.5 生成连环绘本的智能体应用。

## 功能特性

- 🎨 **智能分镜拆分** - 根据用户需求自动拆分为 2-10 页的绘本分镜
- 📸 **统一风格控制** - 生成角色卡片作为风格参考，确保画风一致
- ⚡ **并发生成** - 同时生成所有页面，提高效率
- 🔄 **图生图修改** - 支持对单张图片进行修改调整
- 📝 **Markdown 输出** - 自动生成 Markdown 格式的结果

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env.local` 并配置你的 Seedream API 密钥：

```bash
cp .env.example .env.local
```

编辑 `.env.local`：

```
SEEDREAM_API_KEY=your_seedream_api_key_here
SEEDREAM_API_URL=https://api.seedream.ai/v1
```

### 3. 运行开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 开始使用。

## 项目结构

```
src/
├── app/
│   ├── api/
│   │   ├── generate/route.ts  # 绘本生成 API
│   │   └── modify/route.ts    # 图片修改 API
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx               # 主页面
├── components/
│   ├── PictureBookForm.tsx    # 生成表单组件
│   └── PictureBookViewer.tsx  # 绘本查看组件
├── services/
│   ├── llmService.ts          # LLM 服务（分镜拆分等）
│   ├── seedreamService.ts     # Seedream 图片生成服务
│   └── pictureBookService.ts  # 绘本生成核心逻辑
└── types/
    └── index.ts               # TypeScript 类型定义
```

## 工作流程

1. **理解需求** - 使用 LLM 分析用户需求，进行漫画分镜拆分
2. **生成角色卡片** - 创建包含全部角色的风格参考卡片
3. **并发生成** - 使用角色卡片作为风格参考，生成所有绘本页面
4. **展示结果** - 以 Markdown 格式渲染文字和图片
5. **支持修改** - 使用图生图功能修改单张图片

## 使用说明

1. 在输入框中填写绘本主题
2. （可选）填写绘本标题
3. 选择绘本页数（2-10页）
4. 点击"开始生成绘本"
5. 生成完成后可查看并修改任意页面

## 注意事项

- 当前使用占位图片，配置真实的 Seedream API 后可替换为真实生成的图片
- 请在 `.env.local` 中正确配置 API 密钥

## 🚀 部署到 IGA Pages

### 方式一：使用官方 Skill (推荐)

```bash
# 安装 IGA Pages Skill
npx skills add volc-iga-pages/iga-pages-skills --yes --global

# 然后使用部署功能
# 在聊天中说: "部署这个应用到 IGA Pages"
```

### 方式二：手动部署

```bash
# 1. 构建项目
npm run build

# 2. 安装 IGA Pages CLI
npm install -g @iga-pages/cli

# 3. 配置 Volcengine AK/SK (参考文档)

# 4. 执行部署
npx @iga-pages/cli deploy
```

### 方式三：使用部署脚本

```bash
npm run deploy
```

详细部署说明请查看 [DEPLOY.md](./DEPLOY.md)

## 🔗 相关资源

- IGA Pages 文档: https://www.volcengine.com/docs/6559/93535
- IGA Pages Skill: https://github.com/volc-iga-pages/iga-pages-skills

