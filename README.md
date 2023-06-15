도커 설치 운영체제에 맞게

[WINDOW(WSL, Docker)](https://mire-snowflake-b04.notion.site/WINDOW-WSL-Docker-adb8feadfd1441a4ae0de5f71202b26b?pvs=4)

[MacOS (Docker)](https://mire-snowflake-b04.notion.site/MacOS-Docker-7104617bd85e4091bdbc0cecac724c98?pvs=4)

도커를 설치한 후

## 1. 프로젝트 디렉토리 작성

윈도우는 wsl에서, 맥은 터미널에서 다음 명령어를 실행해 프로젝트의 디렉토리 구성을 한다.

```bash
mkdir -p ichigo/api
mkdir -p ichigo/web
mkdir -p ichigo/db/logs
mkdir -p ichigo/db/conf
mkdir -p ichigo/db/backup
touch ichigo/docker-compose.yml
touch ichigo/.env
touch ichigo/db/logs/mysql-error.log
touch ichigo/db/logs/mysql-query.log
touch ichigo/db/logs/mysql-slow.log
touch ichigo/db/conf/my.cnf
```

![1](https://raw.githubusercontent.com/YJU-Jenga/Ichigo-Nest/main/readme_image/1.png)

## 2. docker-compose.yml 파일 편집

`ichigo/docker-compose.yml`파일을 다음과 같이 편집한다.

```yaml
# docker-compose 사용시의 설정파일: yml
version: '3'
services:
  db:
    image: mysql:8.0.32 # 실행할 이미지 설정
    environment:
      - MYSQL_ROOT_HOST=${DB_ROOT_HOST}
      - MYSQL_DATABASE=${DB_NAME}
      - MYSQL_USER=${DB_USER}
      - MYSQL_PASSWORD=${DB_PASS}
      - MYSQL_ROOT_PASSWORD=${DB_PASS}
      - TZ=${TZ}
    ports:  #host 포트번호 : 컨테이너 포트번호
      - '3306:3306'
    volumes:  # host 폴더 : 컨테이너 폴더 - 서로 대응하게 설정
      - ./db/conf:/etc/mysql/conf.d/:ro
      - mysqldata:/var/lib/mysql
      - ./db/logs:/var/log/mysql
      - ./db/backup:/var/lib/mysql-files
    networks:
      - backend
  api:
    image: node:19.6.0-buster
    environment:
      - MYSQL_SERVER=db
      - MYSQL_USER=${DB_USER}
      - MYSQL_PASSWORD=${DB_PASS}
      - MYSQL_DATABASE=${DB_NAME}
      - TZ=${TZ}
      - CHOKIDAR_USEPOLLING=true
    # 컨테이너 설정시 사용할 터미널 설정
    tty: true
    ports:  #hostOS 포트번호 : 도커 컨테이너 포트번호
      - '5000:5000'
    volumes: #hostOS 폴더 : 도커 컨테이너 폴더
      - ./api:/app
    working_dir: /app
    command: npm run start:dev
    networks:
      - backend
    # 의존관계 설정
    depends_on: # 컨테이너가 실행될 때 의존하는 컨테이너
      - db
  web:
    image: node:19.6.0-buster
    environment:
      - CHOKIDAR_USERPOLLING=true
    tty: true
    ports:
      - '3000:3000' # 배포할 경우 '80:80' 로 변경
    volumes:
      - ./web:/app
    working_dir: /app
    command: npm run serve
    networks:
      - backend
    depends_on:
      - api
networks:
  backend:
volumes:
  mysqldata:
```

## 3. my.cnf 편집

![2](https://raw.githubusercontent.com/YJU-Jenga/Ichigo-Nest/main/readme_image/2.png)

`ichigo/db/conf/my.cnf`를 다음과 같이 작성한다.

```yaml
# MySQLサーバーへの設定
[mysqld]
# 文字コード/照合順序の設定
character-set-server = utf8mb4
collation-server = utf8mb4_bin

# タイムゾーンの設定
default-time-zone = SYSTEM
log_timestamps = SYSTEM

# デフォルト認証プラグインの設定
default-authentication-plugin = mysql_native_password

# エラーログの設定
log-error = /var/log/mysql/mysql-error.log

# スロークエリログの設定
slow_query_log = 1
slow_query_log_file = /var/log/mysql/mysql-slow.log
long_query_time = 5.0
log_queries_not_using_indexes = 0

# 実行ログの設定
general_log = 1
general_log_file = /var/log/mysql/mysql-query.log

# mysqlオプションの設定
[mysql]
# 文字コードの設定
default-character-set = utf8mb4

# mysqlクライアントツールの設定
[client]
# 文字コードの設定
default-character-set = utf8mb4
```

## 만약 파일이 수정이 안된다면 권한을 수정해야 한다.

권한 변경

```bash
sudo chown -R (유저이름): .
```

## 4. .env 파일 편집

`ichigo/.env`파일을 다음과 같이 편집한다.

```
DB_ROOT_HOST=%
DB_NAME=ichigo
DB_USER=username
DB_PASS=mypassword
TZ=Asia/Seoul
```

## 5. 컨테이너 실행 및 설정

위와 같이 폴더 구조를 만들고 yml  파일이 있는 곳에서 명령어를 실행한다.

api, web 해당 폴더에 git clone 하고 설치

## api 실행 및 설정

```bash
docker-compose run --rm --no-deps  api /bin/bash

git clone https://github.com/YJU-Jenga/Ichigo-Nest.git .

npm i

exit
```

![3](https://raw.githubusercontent.com/YJU-Jenga/Ichigo-Nest/main/readme_image/3.png)

`ichigo/api/.env.dev`파일을 다음과 같이 편집한다.

```
ACCESS_SECRET_KEY=at-secretKey
ACCESS_EXPIRES_IN=15
REFRESH_SECRET_KEY=rt-secretKey
REFRESH_EXPIRES_IN=7
```

![4](https://raw.githubusercontent.com/YJU-Jenga/Ichigo-Nest/main/readme_image/4.png)

`ichigo/api/.env.local`파일을 다음과 같이 편집한다.

```
ACCESS_SECRET_KEY=
ACCESS_EXPIRES_IN=  // 숫자 
REFRESH_SECRET_KEY=
REFRESH_EXPIRES_IN= // 숫자
```

## web 실행 및 설정

```bash
docker-compose run --rm --no-deps  web /bin/bash

git clone https://github.com/YJU-Jenga/Ichigo_Web.git .

npm i

exit
```

도커 컨테이너 실행 명령어

```bash
docker-compose up -d
```

도커 컨테이너 중지 명령어

```bash
docker-compose down
```

위의 명령어를 실행한 후 권한 변경을 한다.

```bash
sudo chown -R (유저이름): .
```

# 데이터베이스

## dump 파일 만들기

컨테이너가 활성화 되어있는 상태에서 해당 컨테이너 접속

```bash
docker-compose up -d

docker-compose exec db /bin/bash

mysqldump -u root -p ichigo > /var/lib/mysql-files/backup.sql
```

## dump파일 import 하기

컨테이너가 활성화 되어있는 상태에서 해당 컨테이너 접속

```bash
docker-compose up -d

docker-compose exec db /bin/bash

mysql -u root -p ichigo < /var/lib/mysql-files/backup.sql
```

# 배포 시 설정

`ichigo/web/package.json` 에서 scripts 안에 serve를 아래와 같이  수정한다.

![5](https://raw.githubusercontent.com/YJU-Jenga/Ichigo-Nest/main/readme_image/5.png)

```bash
"scripts": {
    "start": "react-scripts start",
    "serve": "export PORT=80 && react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```

![6](https://raw.githubusercontent.com/YJU-Jenga/Ichigo-Nest/main/readme_image/6.png)

[참조](https://7942yongdae.tistory.com/4)

---

`ichigo/web/src/config.ts` 에서 주소를 변경해준다.

![7](https://raw.githubusercontent.com/YJU-Jenga/Ichigo-Nest/main/readme_image/7.png)

```bash
export const API_URL = "http://{배포한 곳의 IP주소}:5000";
```

---

`ichigo/docker-compose.yml`파일을 다음과 같이 편집한다.

![8](https://raw.githubusercontent.com/YJU-Jenga/Ichigo-Nest/main/readme_image/8.png)