# TODO - feltwith.love 网站优化

## P0 - 功能性问题


- [ ] **升级 Next.js 到最新版本**
  - Vercel 构建因安全漏洞被拒绝，已本地升级到 15.5.12，待提交推送

## P1 - SEO & 安全

## P2 - UI 视觉重新设计

整体方向：围绕 needle felting（羊毛毡）主题，打造**复古、温暖、手工感**的视觉风格。

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

## P1.5 - SEO Audit Findings (2026-03-24)

Based on a full-site SEO audit of feltwith.love.

### High Impact

- [ ] **全站缺少 Schema 结构化数据**
  - 首页：添加 `Organization` + `Product` schema
  - Pricing：添加 `Product` + `Offer` schema
  - About：添加 `Person` schema
  - Blog 文章：添加 `Article` + `FAQPage` schema（"How to Order" 有 FAQ 区域可获得富摘要）
  - Gallery：添加 `ImageGallery` schema

- [ ] **Gallery 页面未加入 sitemap.xml**
  - `/gallery` 页面尚未创建，sitemap 中已预留注释，待页面创建后取消注释



### Long-Term Growth

- [ ] **增加博客内容频率**
  - 当前仅 2 篇文章，建议每月 1-2 篇
  - 推荐选题：
    - "needle felted pet portrait review"
    - "custom pet memorial gift ideas"
    - "needle felting vs other pet portraits"
    - "best gift for pet loss"
    - "how needle felting works"

- [ ] **创建对比页面**
  - "Needle Felting vs Painted Pet Portraits" 等对比内容，针对高购买意向关键词

- [ ] **利用 testimonials 添加 Review schema**
  - 首页已有客户评价，可转化为结构化数据

## P3 - 依赖清理

- [ ] **清理过时/重复依赖**
  - 移除 `@next/font`（Next.js 15 内置 `next/font`）
  - 升级 `katex` 0.12.0 -> 0.16.x（安全漏洞）
  - `eslint` 从 dependencies 移到 devDependencies
  - `react-share` 去重（同时在 deps 和 devDeps）
  - 评估是否需要 `less` / `less-loader`（当前用 Tailwind）
