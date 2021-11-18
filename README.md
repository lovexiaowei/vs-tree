# Bigemap离线地图发布服务器 for Linux
当前版本：v0.2.7

一站式搭建离线地图服务器，支持多种地图离线发布；提供快速WEB应用、WMTS、TMS等服务；支持二次开发调用；

## [系统要求](#system-require) {#system-require}
Bigemap Server 支持以下操作系统：
* Windows 7, Windows Server 2008及以上\*
* CentOS 6
* CentOS 7
* Ubuntu 14.04
* Ubuntu 16.04

\* 部署到 **Windows** 系统直接下载[安装程序](http://www.bigemap.com/reader/download/detail201802017.html)。部署到 **Linux** 系统按照以下步骤。

## [安装依赖项](#install-deps) {#install-deps}
在安装Bigemap Server之前，需要安装一下依赖项：
* Wget
* OpenSSL (optional)
* Docker
* Docker Compose
* unzip

Wget、OpenSSL及unzip都是Bigemap Server安装脚本所需，Docker和Docker Compose是服务运行、集成容器。

### [CentOS 7](#centos-7-install-deps) {#centos-7-install-deps}
```bash
# Most of these commands need to be run by the root user
$ sudo su

$ yum check-update
$ yum install -y epel-release
$ yum install -y wget openssl python-pip unzip

# Install Docker
$ curl -fsSL https://get.docker.com/ | sh

# Add your user to the Docker group. i.e. centos
$ usermod -aG docker <your-user-name>

# Enable the Docker daemon to start at system boot
$ systemctl enable docker.service

# Start the Docker daemon
$ systemctl start docker.service

# Install Docker Compose
$ pip install docker-compose
```

### [Ubuntu 14.04](#ubuntu-14-install-deps) {#ubuntu-14-install-deps}
```bash
# Update the package database
$ sudo apt-get update

# Install Docker and Server dependencies
$ sudo apt-get install \
    linux-image-extra-$(uname -r) \
    linux-image-extra-virtual \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common \
    docker-ce \
    wget \
    openssl \
    unzip

# Add the Docker repository to APT sources
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
$ sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

# Update the package database with the Docker packages
$ sudo apt-get update

# Install Docker
$ sudo apt-get install -y docker-ce

# Add your user to the Docker group. i.e. ubuntu
$ sudo usermod -aG docker <your-user-name>

# Check the current release and, if necessary, update it in the command below
$ sudo curl -L \
    https://github.com/docker/compose/releases/download/1.18.0/docker-compose-`uname -s`-`uname -m` \
    -o /usr/local/bin/docker-compose

# Set execute permissions on docker-compose
$ sudo chmod +x /usr/local/bin/docker-compose
```

### [Ubuntu 16.04](#ubuntu-16-install-deps) {#ubuntu-16-install-deps}
```bash
# Update the package database
$ sudo apt-get update

# Install Docker and Server dependencies
$ sudo apt-get install -y wget openssl unzip

# Add the Docker repository to APT sources
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
$ sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

# Update the package database with the Docker packages
$ sudo apt-get update

# Make sure you are about to install from the Docker repo
$ sudo apt-cache policy docker-ce

# Install Docker
$ sudo apt-get install -y docker-ce

# Add your user to the docker group. i.e. ubuntu
$ sudo usermod -aG docker <your-user-name>

# Check the current release and, if necessary, update it in the command below
$ sudo curl -L \
    https://github.com/docker/compose/releases/download/1.18.0/docker-compose-`uname -s`-`uname -m` \
    -o /usr/local/bin/docker-compose

# Set execute permissions on docker-compose
$ sudo chmod +x /usr/local/bin/docker-compose
```

### [银河麒麟 Kyline 4.0.2 server sp2](#kyline-402-install-deps) {#kyline-402-install-deps}
```bash
# Update the package database
$ sudo apt-get update

# Install Docker and Server dependencies
$ sudo apt-get install -y wget openssl unzip

# Install Docker
$ curl -fsSL https://get.docker.com/ | sh

# Add your user to the docker group. i.e. ubuntu
$ sudo usermod -aG docker <your-user-name>

# Enable the Docker daemon to start at system boot
$ sudo systemctl enable docker

# Start the Docker daemon
$ sudo systemctl start docker

# Check the current release and, if necessary, update it in the command below
$ sudo curl -L \
    https://github.com/docker/compose/releases/download/1.18.0/docker-compose-`uname -s`-`uname -m` \
    -o /usr/local/bin/docker-compose

# Set execute permissions on docker-compose
$ sudo chmod +x /usr/local/bin/docker-compose
```

***
## [安装 Bigemap Server](#install-bm-server) {#install-bm-server}
### Bigemap Server Installer
Bigemap Server installer是命令行脚本(CLI)程序用于下载、安装Bigemap Server。

### [安装命令](#bm-server-installer-commands) {#bm-server-installer-commands}
命令 | 需要联网 | 描述
-------------------- | ---------- | -------------------------------
`install`  | 是 | 自动下载并安装Bigemap Server
`download` | 是 | 下载Bigemap Server
`setup`    | 否 | 安装Bigemap Server
`list`     | 是 | 查看发布的历史版本
`remove`   | 否 | 卸载Bigemap Server

### [下载 Installer](#download-installer) {#download-installer}
1. 下载安装脚本：`wget http://downloads.bigemap.com/bm-server/linux/bm-server-installer.zip` ([点击下载](http://downloads.bigemap.com/bm-server/linux/bm-server-installer.zip))
1. 解压下载的zip文件: `unzip bm-server-installer.zip`
1. 修改执行权限：`chmod +x ./bm-server-installer`
1. 查看命令帮助：`./bm-server-installer help`

### [一步安装](#one-step-installation) {#one-step-installation}
一步安装将自动下载并安装最新发布本版，需本机联网部署。
```bash
# Install Bigemap server, 'bm-server/' is the installation path.
$ sudo ./bm-server-installer install bm-server/

# Enter installation path
$ cd bm-server

# Start Bigemap server
$ ./bm-server.sh start
```
### [服务管理](#bm-server-commands) {#bm-server-commands}

```bash
# Restart Bigemap server
$ ./bm-server.sh restart

# Stop Bigemap server
$ ./bm-server.sh stop

# Show logs
$ ./bm-server.sh logs
```

### [离线安装](#offline-installation) {#offline-installation}
离线部署首先需手动下载并[安装依赖项](#install-deps)，才进行此离线安装步骤。按以下步骤进行，首先下载所需文件，然后将`bm-server-installer`以及下载目录`bm-server-files`一并拷贝到离线服务器上，最后执行`setup`命令安装。
#### [下载Bigemap Server](#download-command) {#download-command}
`download`命令将Bigemap Server所需文件下载一个指定目录，后续将在`setup`命令中使用。
```bash
# Download Bigemap Server, 'bm-server-files/' is the directory where the downloaded files will be saved。
$ ./bm-server-installer download bm-server-files/
```
##### 选项
* `--version`      (可选) 下载Bigemap Server指定的版本，可通过`list`命令[查看可用版本](#list-command)

#### [安装Bigemap Server](#setup-command) {#setup-command}
在将运行Bigemap Server的服务器上执行`setup`命令。其中参数`bm-server-files/`是`download`命令下载所需的文件；参数`bm-server/`是目标安装目录。
```bash
$ ./bm-server-installer setup bm-server-files/ bm-server/
```
安装完成后，执行`bm-server.sh`启动服务：
```bash
$ (cd bm-server && ./bm-server.sh start)
```

### [查看可用版本](#list-command) {#list-command}
`list`命令列出了所有可下载的Bigemap Server版本。
通过`bm-server.sh`查看当前安装的版本：
```bash
$ ./bm-server.sh version
```
查看所有可下载版本：
```bash
$ ./bm-server-installer list
```
通过`download`命令并指定`--version`参数下载指定的Bigemap Server版本。
```bash
$ ./bm-server-installer download bm-server-files/ --version <bm-server-version>
```

***
## [配置 Bigemap Server](#bm-server-settings) {#bm-server-settings}
Bigemap Server采用JSON文件配置，默认配置文件在`bm-server-installer`目录中。Linux默认配置如下：
```json
{
  "Hostname": "localhost",
  "Port": 3000,
  "ServicePort": 3001,
  "Password": "password",
  "TilesetPath": "./tilesets"
}
```

### [配置选项](#settings-options) {#settings-options}
1. `Hostname`服务主机名。
1. `Port`服务端口，默认3000。
1. `ServicePort`地图瓦片服务端口，默认3001；与服务端口不能相同。
1. `Password`登录服务管理密码，远程访问服务管理需登录，**建议修改密码**。
1. `TilesetPath`地图瓦片服务根目录，添加离线地图服务可浏览该目录下文件。

### [配置命令](#settings-command) {#settings-command}
修改配置文件后，通过`settings`命令应用配置。
```bash
$ ./bm-server-installer settings <target> --config <path to JSON file>
```
##### 参数
* `<target>`目标安装目录，例如`bm-server/`。
* `--config`配置文件路径。

#### 示例
```bash
# Update the server config
$ ./bm-server-installer settings bm-server/ --config ./config.json

# Restart Bigemap Server
$ (cd bm-server && ./bm-server.sh restart)
```

### [配置Https/Http](#settings-protocol) {#settings-protocol}
可以将BIgemap Server配置为使用Https进行通信以提高安全性。 在生产中，证书文件应由受信任的证书颁发机构签名。为了便于测试，提供了一个脚本来生成自签名证书。

#### 配置证书文件
```bash
$ ./bm-server-installer settings <target> --ssl-key <path to pkey file> --ssl-cert <path to cert file>
```
##### 参数
* `<target>`目标安装目录，例如`bm-server/`。
* `--ssl-key`证书的私钥文件。
* `--ssl-cert`证书文件。
* `--ssl-ca`(可选) CA证书文件。

#### 示例
```bash
# Use the certificate file
$ ./bm-server-installer settings bm-server/ --ssl-key ./cert/pri.key --ssl-cert ./cert/cert.crt

# Use self-signed certificate
$ ./bm-server-installer settings bm-server/ --self-signed

# Switch to HTTP
$ ./bm-server-installer settings bm-server/ --http

# Restart Bigemap Server
$ (cd bm-server && ./bm-server.sh restart)
```

### [配置授权服务](#settings-auth-service) {#settings-auth-service}
配置离线地图服务器授权服务，仅适用于特定终端授权程序。

1. 下载特定授权服务程序，并存放在安装目录下`docker`目录中；如`bm-server/docker`中。
2. 执行`settings`命令
```bash
$ ./bm-server-installer settings bm-server/ --init-auth
```
3. 重启服务
```bash
$ (cd bm-server && ./bm-server.sh restart)
```