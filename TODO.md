# TODO - feltwith.love 网站优化

## P0 - 功能性问题

- [x] **升级 Next.js 到最新版本** ✅ 已升级到 15.5.12

## P1 - SEO & 安全

### Google Search Console 数据洞察（2026-03-28）

3 个月数据，共 10 个关键词。网站还很新，Google 仍在建立认知。

**品牌词（已有流量）：**
- `felt with love` — 6 点击 / 61 展示，CTR ≈ 10%（健康）
- `felt with love designs` — 2 点击 / 24 展示
- `feltwithlove` — 1 点击 / 10 展示

**非品牌词（机会词，展示极低但已被 Google 关联）：**
- `felted pets` — 1 展示
- `framed pet felt art` — 1 展示 ← 与产品直接相关，值得优化
- `custom felted pet` — 1 展示 ← 高购买意图
- `custom felt pet` — 1 展示

**行动项：**
- [x] 在 pricing 页和博客中自然融入 `custom felted pet`、`framed pet felt art` 等词 ✅
- [ ] 持续写博客增加非品牌关键词覆盖（每篇瞄准一个目标词）
- [ ] 一个月后（2026-04-28）再次检查 Search Console 数据变化

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

- [x] **图片优化** ✅

  - [x] Hero 图片加 `priority` 属性（LCP 元素）
  - [x] 配置 `images.remotePatterns` 替代废弃的 `images.domains`
  - [x] 外部图片统一使用 `next/image`（Video SVG 已替换；Common/Image.tsx 的 `<img>` fallback 是无尺寸时的合理降级）

- [ ] **简化图片服务架构**
  - 构建时图片已复制到 `public/images/`，考虑去掉 API route 中间层
  - 减少运行时文件系统读取

## P1.5 - SEO Audit Findings (2026-03-24)

Based on a full-site SEO audit of feltwith.love.

### High Impact

- [ ] **全站缺少 Schema 结构化数据**（部分完成）
  - [x] 首页：已添加 `LocalBusiness` + `Product` + `Offer` schema
  - [x] Pricing：添加 `Product` + `Offer` schema ✅ — 部署后用 [Rich Results Test](https://search.google.com/test/rich-results) 验证
  - [x] About：添加 `Person` schema ✅
  - [x] Blog 文章：添加 `Article` + `FAQPage` schema ✅（"How to Order" 包含 FAQ 富摘要）
  - [x] Gallery：添加 `ImageGallery` schema ✅

- [x] **Gallery 页面未加入 sitemap.xml** ✅ Gallery 页面已创建，sitemap 已包含

### Long-Term Growth

- [ ] **增加博客内容频率**
  - 当前 3 篇文章，建议每月 1-2 篇
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

## P2 - SEO 内容（博客）

按 SEO 价值排序，优先写高购买意图的关键词文章。

已发布：
- [x] **"How to Order a Custom Needle Felted Pet Portrait"** ✅ 已发布

### 接下来 5 篇（按优先级，建议每 2-3 周一篇，3 个月内完成）

| 顺序 | 目标关键词 | 标题 | 为什么优先 |
|------|----------|------|-----------|
| 1 | `needle felted pet memorial` | Needle Felted Pet Memorial: A Unique Way to Honor Your Beloved Pet | "pet memorial gift" 搜索量大，购买意图强，核心客户群 |
| 2 | `custom felted pet portrait` `framed pet felt art` | Framed Needle Felted Pet Portrait: The Perfect Wall Art Gift | Search Console 已出现这两个词，一篇同时强化两个关键词 |
| 3 | `pet fur needle felting` | Can You Use Your Pet's Real Fur in Needle Felting? | 最常被问的问题，问题型关键词容易拿到 "People Also Ask" |
| 4 | `custom pet portrait process` | What to Expect When Commissioning a Custom Felted Pet | 解答购买前疑虑（照片要求、时间、价格），直接推动转化 |
| 5 | `needle felting behind the scenes` | Behind the Scenes: How I Create a Needle Felted Cat From Scratch | 过程展示建立信任，图片丰富有利于图片搜索流量 |

- [x] #1 Needle Felted Pet Memorial ✅ 草稿已写好（`scripts/create-blog-draft.ts`），待推送到 Notion 并发布
- [ ] #2 Framed Needle Felted Pet Portrait
  - 开头：为什么 framed portrait 是最好的展示方式
  - 不同尺寸和框架选项展示（需要拍产品照片）
  - 挂在家里的效果图 / 场景展示
  - 作为礼物的场景：生日、节日、纪念日
  - 内链：Pet Memorial 文章、Pricing、Gallery
- [ ] #3 Can You Use Your Pet's Real Fur in Needle Felting?
  - 直接回答：可以！
  - 什么类型的毛发适合（长毛 vs 短毛、猫 vs 狗）
  - 怎么收集和保存毛发
  - 融入毛发的成品效果展示（需要照片）
  - 不适合的情况
  - 内链：How to Order、Pet Memorial
- [ ] #4 What to Expect When Commissioning a Custom Felted Pet
  - 完整时间线：下单 → 选照片 → 沟通确认 → 制作中途预览 → 完成 → 配送
  - 好照片 vs 坏照片的对比（需要示例图）
  - 价格范围和影响因素
  - 修改政策
  - FAQ 部分（加 FAQ schema 获得富摘要）
  - 内链：How to Order、Pricing、Real Fur 文章
- [ ] #5 Behind the Scenes: How I Create a Needle Felted Cat From Scratch
  - 从一张客户照片开始
  - 选毛色、打底稿
  - 逐层铺色过程（大量过程图）
  - 细节处理：眼睛、胡须
  - 完成对比：原照片 vs 成品
  - 制作时间和心得
  - 内链：How to Order、Gallery、Commissioning 文章
  - 同步发 Instagram Reels / TikTok

### 更多选题（后续考虑）

- [ ] **"Needle Felted Cat vs Dog: Which is Harder to Create?"** — 有天然搜索兴趣的话题
- [ ] **"5 Best Photos to Send for Your Custom Pet Portrait"** — 实用指南，也减少沟通成本
- [ ] **"Why Needle Felted Gifts Are the Most Meaningful Handmade Present"** — 针对 "handmade gift ideas"

## P3 - 依赖清理

- [ ] **清理过时/重复依赖**
  - 移除 `@next/font`（Next.js 15 内置 `next/font`）
  - 升级 `katex` 0.12.0 -> 0.16.x（安全漏洞）
  - `eslint` 从 dependencies 移到 devDependencies
  - `react-share` 去重（同时在 deps 和 devDeps）
  - 评估是否需要 `less` / `less-loader`（当前用 Tailwind）
