# TODO - feltwith.love 网站优化

## P0 - 功能性问题

- [x] **根布局去掉 `"use client"`** ✅

  - 已将 GTM/GA 脚本抽离到 `app/Analytics.tsx` 客户端组件
  - 布局改为 Server Component，metadata 通过 Next.js Metadata API 导出
  - 删除了旧的 `app/head.tsx`

- [ ] **修复 Cusdis pageUrl 硬编码 localhost**

  - `app/blog/[slug]/page.tsx:105` — `pageUrl: "http://localhost:3000"` 需要替换为实际域名
  - 使用环境变量 `NEXT_PUBLIC_SITE_URL` 管理

- [ ] **升级 Next.js 到最新版本**
  - Vercel 构建因安全漏洞被拒绝，已本地升级到 15.5.12，待提交推送

## P1 - SEO & 安全

- [x] **添加全站 SEO metadata** ✅

  - 根布局添加 metadataBase、title template、OpenGraph 默认值
  - 各页面（about、contact、pricing、blog、error）添加页面级 metadata
  - 博客文章补充 og:type=article 和 og:image（使用特色图片）

- [x] **添加 sitemap.xml** ✅

  - `app/sitemap.ts` 动态生成，包含静态页面 + 已发布博客文章
  - 提交到 Google Search Console（待手动操作）

- [x] **添加 robots.txt** ✅

  - `app/robots.ts` 生成，指向 sitemap，屏蔽 /api/ 和 /error/

- [x] **修复首页多个 H1** ✅

  - 检查后发现首页只有 1 个 H1（Hero 组件），其余均为 H2，无需修改

- [x] **图片 API 路径遍历校验** ✅

  - 添加 `path.resolve` + `startsWith` 校验，防止路径遍历
  - 移除 `console.log` 调试语句

- [x] **Stripe / GTM / GA 脚本按需加载** ✅
  - Stripe JS 从根布局移到 `CustomOrderProductList` 组件，使用 `lazyOnload` 策略
  - 移除独立 GA 脚本（应通过 GTM 管理），只保留 GTM

## P2 - UI 视觉重新设计

整体方向：围绕 needle felting（羊毛毡）主题，打造**复古、温暖、手工感**的视觉风格。

### 色彩体系

- [x] **重新定义调色板** ✅
  - 全面转向暖棕色系，所有颜色通过 CSS 变量管理（`:root` in `styles/index.css`）
  - 背景：`#FAF6F0` 暖奶油白 | 文字：`#3A3028` 暖炭棕 | 正文：`#5D4E42` 温暖棕灰
  - 品牌：`#7A5A30` 焦糖棕 | 点缀：`#D4A567` 蜂蜜金 | CTA 统一用金色
  - 新增暖灰色阶（gray-50 ~ gray-900），修复博客 gray 类不生效问题
  - 去掉 `orange`，CTA 用 `primary`（深棕+白字）
  - 修复所有 `bg-opacity` 与 CSS 变量不兼容的问题

### 字体

- [x] **更换字体，体现手工/复古气质** ✅
  - 标题 h1-h6：Lora（优雅衬线体）via `next/font/google`
  - 正文：Nunito（圆润无衬线体）via `next/font/google`
  - 移除未使用的 Inter Google Fonts 外链
  - Tailwind `font-sans` / `font-serif` 可按需切换

### 首页 Hero

- [ ] **重新设计 Hero 区域**
  - 当前是居中文字 + 底部图片的通用 SaaS 模板布局
  - 考虑：大幅手工作品特写作为背景/主视觉，文字叠加或侧边排版 - 我可以提供手工作品特写照片和视频。你看看有没有合适的。我放在最外面的 tmp/ folder 下了
  - 加入手写风格的装饰元素（针线、毛线团、小羊毛毡插图）
  - CTA 按钮换成更柔和的形状（圆角更大、去掉硬边）

### 产品展示

- [ ] **优化产品/作品展示区**
  - 画廊式布局，让作品本身说话
  - 考虑瀑布流或交错网格，避免整齐划一的卡片
  - 加入作品细节（材料、制作时间等手工故事）
  - 图片可以加柔和的阴影或纸张质感边框

### 博客列表

- [ ] **博客卡片重设计**
  - 当前方形网格偏硬朗，考虑更有杂志感/手帐感的排版
  - 日期格式可以更有设计感
  - 加入标签的视觉展示

### 博客文章页

- [ ] **优化阅读体验**
  - 正文宽度控制（当前 container 可能过宽）
  - 增加行高、段间距，提升阅读舒适度
  - 图片展示可以更优雅（带圆角、柔和阴影）

### 全局元素

- [ ] **Header 导航优化**

  - 当前导航栏风格偏 SaaS，考虑更简洁/文艺的导航
  - Logo 区域可以加入手工元素

- [ ] **Footer 重设计**

  - 加入品牌故事的温度感
  - 社交链接用更手工风的图标

- [ ] **添加全局纹理/质感**
  - 考虑亚麻布/毛毡/牛皮纸等微妙的背景纹理
  - 分割线可以用针线/缝纫线的装饰

## P2 - 性能

- [ ] **图片优化**

  - Hero 图片加 `priority` 属性（LCP 元素）
  - 配置 `images.remotePatterns` 替代废弃的 `images.domains`
  - 外部图片统一使用 `next/image`

- [ ] **简化图片服务架构**
  - 构建时图片已复制到 `public/images/`，考虑去掉 API route 中间层
  - 减少运行时文件系统读取

## P2 - SEO 内容（博客）

按 SEO 价值排序，优先写高购买意图的关键词文章：

### 高价值（直接带转化）
- [ ] **"How to Order a Custom Needle Felted Pet Portrait"** — 核心转化页面，详细流程（提交照片→沟通→制作→交付）
- [ ] **"Needle Felted Pet Memorial: A Unique Way to Honor Your Beloved Pet"** — "pet memorial gift" 高搜索量，对应核心客户群
- [ ] **"Can You Use Your Pet's Real Fur in Needle Felting?"** — 最常被问的问题，搜索量大

### 中高价值（教育型，吸引潜在客户）
- [ ] **"What to Expect When Commissioning a Custom Felted Pet"** — 解答客户疑虑（照片要求、制作时间、价格）
- [ ] **"Needle Felted Cat vs Dog: Which is Harder to Create?"** — 有天然搜索兴趣的话题
- [ ] **"5 Best Photos to Send for Your Custom Pet Portrait"** — 实用指南，也减少沟通成本

### 长尾关键词（竞争小，精准流量）
- [ ] **"Framed Needle Felted Pet Portrait: The Perfect Wall Art Gift"** — 对应具体产品
- [ ] **"Why Needle Felted Gifts Are the Most Meaningful Handmade Present"** — 针对 "handmade gift ideas"
- [ ] **"Behind the Scenes: How I Create a Needle Felted Cat From Scratch"** — 过程展示，建立信任

## P3 - 依赖清理

- [ ] **清理过时/重复依赖**
  - 移除 `@next/font`（Next.js 15 内置 `next/font`）
  - 升级 `katex` 0.12.0 -> 0.16.x（安全漏洞）
  - `eslint` 从 dependencies 移到 devDependencies
  - `react-share` 去重（同时在 deps 和 devDeps）
  - 评估是否需要 `less` / `less-loader`（当前用 Tailwind）
