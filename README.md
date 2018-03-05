# runbox-node

一个生产级的`node`运行环境。

## 项目背景

线上补丁每次更新时，都需要重新编译镜像，这个过程忽长忽短，若网络不佳，更会出现频繁失败的情况，所以我们编译了这个镜像，希望可以借此缩短线上补丁的更新时间。

## 使用规范

使用这个镜像需要遵循一些规范，具体如下：

1. `package.json`的脚本命令定义
    - **prestart** - 项目依赖安装命令，一般设置为`NODE_ENV=production npm install --only=production`
    - **start** - 项目启动命令，一般设置为`NODE_ENV=production node index.js`

1. 代码目录挂载
    - **/opt/app** - 在新建容器运行时，需要使用`-v`参数将你的补丁目录映射到该目录下

## 使用示例

1. 假设`package.json`文件已按以上要求设置；

1. 且当前目录下的`dist`文件夹为你的补丁目录；

则我们可以这样定义项目启动脚本（假设为`up.sh`）：

```bash
#!/bin/bash

name="myApp"

docker rm -f $name
docker run --restart=always -d \
    --name $name \
    -v `pwd`/dist:/opt/app \
    yinfxs/runbox-node:carbon-alpine
```

执行该脚本即可启动项目：

```bash
sh up.sh
```
