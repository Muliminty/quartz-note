Quartz 附带了一个 Docker 镜像,它可以让你在不安装 Node 的情况下在本地预览你的 Quartz。

你可以运行下面这个一行命令来在 Docker 中运行 Quartz。

```sh
docker run --rm -itp 8080:8080 $(docker build -q .)
```
