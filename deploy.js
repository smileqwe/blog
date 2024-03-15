const execSync = require('child_process').execSync;

function getCurrentVersion() {
  return execSync('npm version --no-git-tag-version patch').toString().trim();
}

function deploy() {
  // 清理、生成和部署 Hexo
  execSync('hexo clean && hexo generate && hexo deploy', { stdio: 'inherit' });

  // 获取当前版本号并更新之
  const version = getCurrentVersion();

  // 添加所有更改并进行提交
  execSync(`git add .`, { stdio: 'inherit' });
  execSync(`git commit -m "chore: bump version to ${version}"`, { stdio: 'inherit' });

  // 推送到远程仓库
  execSync('git push origin HEAD', { stdio: 'inherit' });
  execSync('git push --tags', { stdio: 'inherit' });
}

deploy();