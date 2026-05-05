// IGA Pages 部署脚本
const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 开始部署到 IGA Pages...\n');

try {
  // 1. 构建项目
  console.log('📦 1. 构建项目...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ 构建完成！\n');

  // 2. 检查是否安装了 @iga-pages/cli
  console.log('🔍 2. 检查 IGA Pages CLI...');
  try {
    execSync('npx @iga-pages/cli --version', { stdio: 'inherit' });
  } catch (e) {
    console.log('⚠️  需要安装 @iga-pages/cli');
    console.log('💡 运行: npm install -g @iga-pages/cli\n');
  }

  // 3. 创建部署说明
  console.log('📋 3. 创建部署说明...');
  const deployInfo = `
绘本生成智能体 - 部署说明
=========================

项目名称: picture-book-agent
构建目录: out/
部署平台: IGA Pages

前置要求:
- Node.js >= 20
- Volcengine 账号 (需要配置 AK/SK)
- @iga-pages/cli 已安装

部署步骤:
1. 构建项目: npm run build
2. 安装 CLI: npm install -g @iga-pages/cli
3. 配置认证: 按照 IGA Pages 文档配置 AK/SK
4. 执行部署: npx @iga-pages/cli deploy

或者使用官方 skill:
npx skills add volc-iga-pages/iga-pages-skills --yes --global

更多信息:
https://www.volcengine.com/docs/6559/93535
  `;

  fs.writeFileSync('DEPLOY.md', deployInfo);
  console.log('✅ 已创建 DEPLOY.md\n');

  console.log('🎉 准备工作完成！请按照 DEPLOY.md 中的说明进行部署。\n');
  console.log('📖 当前项目已成功构建，可以开始部署流程。\n');

} catch (error) {
  console.error('❌ 部署过程中出错:', error.message);
  process.exit(1);
}
