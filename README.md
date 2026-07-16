# 🎸 吉他每日练习

一个用于吉他每日练习的 SPA 应用，部署在 GitHub Pages。

## 功能

1. **基础练习** - 从 `public/content/practice.md` 加载静态内容（爬格子、泛音等）
2. **随机乐章生成** - 随机生成 8 小节的练习乐章，包含随机和弦 + 随机节奏型

## 如何添加内容

### 添加和弦

把和弦图片丢进 `public/images/chords/` 即可，文件名就是和弦名（如 `G.png` → 显示为 "G"）。

### 添加节奏型

把节奏型图片丢进 `public/images/rhythms/` 即可，文件名就是节奏型名。

### 更新基础练习内容

直接编辑 `public/content/practice.md`，支持 Markdown 格式。

## 开发

```bash
npm install
npm run dev
```

## 部署

Push 到 `main` 分支后会自动通过 GitHub Actions 部署到 GitHub Pages。
确保在 GitHub repo Settings > Pages 中选择 "GitHub Actions" 作为 source。
