# Copyright 2022 chenzhiqiang
# 
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
# 
#     http://www.apache.org/licenses/LICENSE-2.0
# 
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# 告诉linux这个是个shell脚本
#!/bin/sh

# 如果没有结束到一个非0的数值的话就推出shell脚本的执行
set -e

# 打印当前的工作路径
pwd
remote=$(git config remote.origin.url)

echo 'remote is: '$remote

# 新建一个发布目录
mkdir gh-pages-branch
cd gh-pages-branch
# 创建一个新的仓库
# 设置发布的用户与邮箱
git config --global user.email "$GH_EMAIL" >/
dev/null 2>&1
git config --global user.name "$GH_NAME" >/
dev/null 2>&1
git init
git remote add --fetch origin "$remote"

echo 'email is: '$GH_EMAIL
echo 'name is: '$GH_NAME
echo 'sitesource is: '$siteSource

# 切换gh-pages分支
if git rev-parse --verify origin/gh-pages >/
dev/null 2>&1; then
   git checkout gh-pages
   # 删除掉旧的文件内容
   git rm -rf .
else
  git checkout --orphan gh-pages
fi

# 把构建好的文件目录给拷贝进来
cp -a "../${siteSource}/." .

ls -la

# 把所有的文件添加到git中
git add -A

# 添加一条提交内容
git commit --allow-empty -m "Deploy to Github page [ci skip]"
# 推送文件
git push --force --quiet origin gh-pages
# 资源回收，删除临时分支与目录
cd ..
rm -rf gh-pages-branch

echo "Finished"


