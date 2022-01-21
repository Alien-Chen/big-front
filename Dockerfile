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
FROM node:10 as build-stage

LABEL maintainer=522864794@qq.com

# 创建一个工作区
WORKDIR /app

# 复制项目文件资源到镜像中
COPY . .
RUN yarn install --registry=https://registry.npm.taobao.org
RUN npm run build

# 将dist 中的内容拷贝到 nginx中
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

