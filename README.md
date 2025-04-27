# V Rising 服务器配置工具

![版本](https://img.shields.io/badge/版本-0.1.0-blueviolet)
![Next.js](https://img.shields.io/badge/Next.js-15.2.2-black)
![React](https://img.shields.io/badge/React-19.0.0-blue)
![许可证](https://img.shields.io/badge/许可证-Apache--2.0-green)

## 📖 项目介绍

V Rising 服务器配置工具是一个现代化的Web应用程序，旨在简化V Rising游戏服务器的配置过程。通过直观的用户界面，管理员可以轻松调整各种游戏参数，并导出兼容的JSON配置文件。

该工具集成了V Rising所有可配置选项，包括游戏模式、资源修改器、城堡系统、PVP设置等，使服务器管理变得更加简单高效。

## ✨ 主要功能

- **直观的用户界面**：现代化、响应式的设计，适合各种设备使用
- **全面的配置选项**：包含V Rising所有可配置参数
- **实时可视化**：日夜循环、资源倍率等参数的直观展示
- **导入/导出功能**：便捷的JSON配置导入导出
- **模块化设计**：分类清晰的配置模块
- **默认值预设**：基于官方推荐的默认配置

## 🛠️ 技术栈

- **Next.js 15.2.2**: React框架，用于服务端渲染和静态生成
- **React 19.0.0**: 用户界面库
- **TypeScript 5**: 类型安全的JavaScript超集
- **CSS Modules**: 组件级样式隔离

## 🚀 快速开始

### 前置条件

- Node.js 18.0.0 或更高版本
- npm 或 yarn 包管理器

### 安装步骤

1. 克隆仓库
```bash
git clone https://github.com/zeus200019/VRisingConfig.git
cd VRisingConfig
```

2. 安装依赖
```bash
npm install
# 或
yarn install
```

3. 启动开发服务器
```bash
npm run dev
# 或
yarn dev
```

4. 打开浏览器访问 http://localhost:3000

### 生产环境构建

```bash
npm run build
npm run start
# 或
yarn build
yarn start
```

## 📋 配置模块

该工具包含以下配置模块：

### 基本信息配置
- 服务器名称和描述设置

### 游戏模式设置
- 游戏难度（简单/普通/残酷）
- 游戏模式（PVP/PVE/无破坏城堡PVP）
- 死亡掉落和物品绑定规则

### 资源修改器设置
- 资源采集倍率
- 成本倍率
- 建造和研究速度
- 商人货币掉落倍率

### 游戏时间设置
- 昼夜循环长度
- 白天/黑夜时长比例
- 血月出现频率和持续时间

### 战斗系统设置
- 吸血鬼能力倍率
- 敌人生命值和伤害倍率
- 装备属性倍率

### 城堡系统设置
- 城堡数量限制
- 城堡心脏等级限制
- 城堡各种结构数量上限

### PVP系统设置
- 玩家伤害模式
- 城堡伤害规则
- 攻城时间和保护时间

### 莫尔提姆裂隙设置（战争活动）
- 活动时间设置
- 玩家数量缩放

## 💾 配置导入导出

### 导出配置
1. 调整所有参数后，进入"配置管理"模块
2. 点击"复制JSON"按钮将配置复制到剪贴板，或点击"下载配置文件"

### 导入配置
1. 进入"配置管理"模块
2. 点击"导入配置"按钮
3. 选择有效的V Rising服务器配置JSON文件
4. 确认导入以应用设置

## 📱 响应式设计

工具支持各种设备使用：
- 桌面电脑
- 平板电脑
- 移动设备

界面会根据屏幕大小自动调整，确保在任何设备上都有良好的用户体验。

## ⚠️ 免责声明

本工具为非官方第三方工具，与V Rising游戏开发商Stunlock Studios没有任何从属关系。使用本工具的风险由用户自行承担。我们不对因使用本工具而导致的任何服务器故障、数据丢失或游戏体验问题承担责任。

V Rising及其相关图像、标志和内容归Stunlock Studios所有。本工具仅用于帮助服务器管理，不提供任何游戏内容的复制或分发。

详细的免责声明内容可在工具内查看。

## 🔧 开发指南

### 项目结构

```
vrising-server-config/
├── public/               # 静态资源
├── src/                  # 源代码
│   ├── app/              # Next.js 应用页面
│   ├── components/       # React组件
│   │   ├── Layout/       # 布局组件
│   │   ├── ServerConfig/ # 服务器配置组件
│   │   └── ui/           # UI基础组件
│   ├── contexts/         # React上下文
│   ├── styles/           # 全局样式
│   └── types/            # TypeScript类型定义
├── .eslintrc.json        # ESLint配置
├── next.config.js        # Next.js配置
├── package.json          # 项目依赖
└── tsconfig.json         # TypeScript配置
```

### 添加新配置项

1. 在适当的上下文中定义新配置项类型
2. 在相应的组件文件中实现UI元素
3. 确保在导入/导出功能中包含新配置项

## 📄 许可证

该项目采用Apache-2.0许可证 - 详情请查看 [LICENSE](LICENSE) 文件

## 👥 贡献

欢迎贡献！请随时提交问题报告或功能建议。如果您想贡献代码，请先创建一个issue讨论您的想法。

## 📢 致谢

- [V Rising](https://www.playvrising.com/) - 提供了这款出色的游戏
- [Stunlock Studios](https://www.stunlockstudios.com/) - 游戏开发商
- 以及所有为这个项目做出贡献的人
