---
title: cmd 输出 git log 中文乱码
date: 2021-11-10 15:38:26
tags:
---

设置 Windows 系统常量-解决 `PowerShell` 或 `CMD` 等命令行工具输出 `git log` 中文乱码

Windows键+R打开运行，输入`sysdm.cpl`打开系统属性，选中“高级”这个Tab，点击“环境变量”。新建系统变量

image.png

验证 关闭 `PowerShell` 重新打开，输入`echo $env:LESSCHARSET`，如果输出`utf-8`证明设置成功！此时输入`git log`可以看到中文乱码问题已得到解决！

image.png

docker run -d --restart always --name PandoraNext --net=bridge -p 8811:8811 -v ./data:/data -v ./sessions:/root/.cache/PandoraNext pengzhile/pandora-next