# TODO - feltwith.love 网站优化

## P0 - 功能性问题

- [ ] **根布局去掉 `"use client"`**
  - `app/layout.tsx` 整个根布局是客户端组件，导致所有子页面失去 Server Components 优势
  - 将 Providers、GTM 脚本抽离为独立客户端组件，布局本身保持为 Server Component
  - 这也是 SEO metadata 无法正常 export 的根本原因

- [ ] **修复 Cusdis pageUrl 硬编码 localhost**
  - `app/blog/[slug]/page.tsx:105` — `pageUrl: "http://localhost:3000"` 需要替换为实际域名
  - 使用环境变量 `NEXT_PUBLIC_SITE_URL` 管理

## P1 - SEO & 安全

- [ ] **添加全站 SEO metadata**
  - 根布局添加默认 title / description / og:image
  - 博客文章补充 description、og:image（使用特色图片）
  - 首页、关于页等静态页面添加页面级 metadata

- [ ] **图片 API 路径遍历校验**
  - `app/api/images/[postId]/[filename]/route.ts` 未校验路径参数
  - 验证解析后的路径在 `cache/images/` 目录内，移除 console.log

- [ ] **Stripe / GTM / GA 脚本按需加载**
  - Stripe JS 只在需要支付的页面加载
  - GTM 和 GA 合并（通过 GTM 管理 GA），统一用 `next/script afterInteractive`

## P2 - UI 视觉重新设计

整体方向：围绕 needle felting（羊毛毡）主题，打造**复古、温暖、手工感**的视觉风格。

### 色彩体系

- [ ] **重新定义调色板**
  - 当前配色过于通用模板感，缺乏手工艺的温度
  - 参考方向：暖米色/奶油白背景、焦糖棕/陶土色主色、干燥玫瑰/莫兰迪色点缀
  - 考虑加入羊毛质感的柔和灰调
  - 去掉 `orange: #ea580c`（太数码感），换成更沉稳的暖色

### 字体

- [ ] **更换字体，体现手工/复古气质**
  - 当前用 Helvetica/Arial — 太冷、太工业
  - 标题：考虑衬线字体（如 Playfair Display、Lora、DM Serif Display）
  - 正文：温暖的无衬线（如 Nunito、Source Serif 4）或搭配衬线正文
  - 移除未使用的 Inter 字体导入（`styles/index.css:1`）

### 首页 Hero

- [ ] **重新设计 Hero 区域**
  - 当前是居中文字 + 底部图片的通用 SaaS 模板布局
  - 考虑：大幅手工作品特写作为背景/主视觉，文字叠加或侧边排版
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

## P3 - 依赖清理

- [ ] **清理过时/重复依赖**
  - 移除 `@next/font`（Next.js 15 内置 `next/font`）
  - 升级 `katex` 0.12.0 -> 0.16.x（安全漏洞）
  - `eslint` 从 dependencies 移到 devDependencies
  - `react-share` 去重（同时在 deps 和 devDeps）
  - 评估是否需要 `less` / `less-loader`（当前用 Tailwind）
