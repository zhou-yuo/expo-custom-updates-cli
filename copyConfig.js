const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, 'app.json'); // 当前目录的 app.json
const destDir = path.join(__dirname, 'dist');       // 目标目录 dist
const destFileName = 'expoConfig.json';             // 目标文件名

const destPath = path.join(destDir, destFileName);

// 确保 dist 目录存在，如果不存在则创建
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
  console.log(`目录 '${destDir}' 已创建。`);
}

fs.copyFile(sourcePath, destPath, (err) => {
  if (err) {
    console.error('复制文件时发生错误:', err);
    return;
  }
  console.log(`'${sourcePath}' 已成功复制到 '${destPath}' 并重命名。`);
});