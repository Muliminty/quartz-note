# BAT 脚本编写指南

## 1. **什么是 BAT 脚本？**
BAT 脚本（批处理脚本）是 Windows 系统下的脚本文件，用于自动化执行一系列命令。它通过 `.bat` 或 `.cmd` 文件扩展名来标识。

---

## 2. **BAT 脚本的基本结构**
### 示例脚本
```bat
@echo off
REM 这是一个简单的 BAT 脚本示例

REM 显示当前日期和时间
echo 当前日期和时间：
date /t
time /t

REM 创建一个新文件夹
set folderName=NewFolder
echo 正在创建文件夹：%folderName%
mkdir %folderName%

REM 检查文件夹是否创建成功
if exist %folderName% (
    echo 文件夹创建成功！
) else (
    echo 文件夹创建失败！
)

REM 结束脚本
echo 脚本执行完毕。
pause
```

### 结构解析
- **`@echo off`**：
  - 关闭命令回显，避免脚本中的命令显示在命令行中。
- **`REM`**：
  - 注释，用于说明脚本的功能。
- **`echo`**：
  - 输出文本到命令行。
- **`set`**：
  - 定义变量。
- **`if`**：
  - 条件判断。
- **`pause`**：
  - 暂停脚本执行，等待用户按任意键继续。

---

## 3. **常用 BAT 脚本命令**

| 命令                | 描述                                   |
|---------------------|----------------------------------------|
| `echo`              | 输出文本到命令行。                     |
| `set`               | 定义变量。                             |
| `if`                | 条件判断。                             |
| `for`               | 循环操作。                             |
| `mkdir`             | 创建文件夹。                           |
| `del`               | 删除文件。                             |
| `copy`              | 复制文件。                             |
| `move`              | 移动文件或文件夹。                     |
| `start`             | 启动程序或打开文件。                   |
| `pause`             | 暂停脚本执行，等待用户按任意键继续。   |
| `exit`              | 退出脚本。                             |

---

## 4. **编写和运行 BAT 脚本**
### 编写步骤
1. 打开记事本（Notepad）或任何文本编辑器。
2. 编写脚本内容。
3. 保存文件，文件扩展名为 `.bat`。例如，`example.bat`。
   - 确保文件类型选择为 **所有文件**，而不是 `.txt`。

### 运行方式
1. 双击保存的 `.bat` 文件，脚本会自动运行。
2. 或者在命令行中运行：
   ```cmd
   example.bat
   ```

---

## 5. **进阶示例**
### 遍历当前目录下的所有 `.txt` 文件
```bat
@echo off
REM 遍历当前目录下的所有 .txt 文件

echo 当前目录下的 .txt 文件：
for %%f in (*.txt) do (
    echo %%f
)

pause
```

---

## 6. **注意事项**
- **权限**：某些命令（如删除系统文件）可能需要管理员权限。
- **路径**：如果脚本中涉及文件路径，建议使用绝对路径，避免路径错误。
- **调试**：如果脚本未按预期运行，可以去掉 `@echo off`，查看每条命令的执行情况。

---

## 7. **应用场景**
- **文件管理**：批量重命名、复制、移动、删除文件。
- **系统管理**：启动服务、清理临时文件、设置环境变量。
- **自动化任务**：定时备份、批量处理数据。

---

## 8. **参考资料**
- [Windows 批处理脚本官方文档](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/windows-commands)
- [BAT 脚本教程](https://www.tutorialspoint.com/batch_script/index.htm)

---

通过以上笔记，你可以快速掌握 BAT 脚本的基本用法和编写技巧。如果有更复杂的需求，欢迎随时提问！