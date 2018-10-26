# Workowl
Workowl is a **fun web service to record your office hours**.  
When you go to your work and leave the office, you can click button and record the exact time.

Workowl은 웹 기반의 **출퇴근 기록 시스템**입니다.

유연근무제를 시행하게 되면서, 서로 다른 근무 시간을 가진 팀원들 끼리 업무시간을 공유할 목적으로 개발하게 되었습니다.

## Workowl 구축 방법
### 1. Docker 기반 구축
기존에 Docker를 이용 중이신 서버가 있다면 **Dockerfile과 docker-compose 파일**을 이용하여 서비스를 오픈할 수 있습니다.
#### 1-1. Git clone
```git
git clone https://github.com/uandi4446/workowl.git
```
#### 1-2. DB 환경파일 생성
```git
cd workowl  
touch db.env  
  
// db.env 내 아래 내용 추가  
MYSQL_ROOT_PASSWORD=[DB 루트 비밀번호]  
MYSQL_DATABASE=Workowl // 변경 가능  
MYSQL_USER=[DB 접근용 계정명]
MYSQL_PASSWORD=[MYSQL_USER의 패스워드]
```  
#### 1-3. Docker Image 및 Container 생성
```git
docker-compose up -d --build
```  
#### 1-4. 초기 DB 테이블 생성
```git  
// workowl 컨테이너 내 접속  
sudo docker-compose exec workowl /bin/bash  
  
// DB table 생성 스크립트 실행
npm run deploy:db
```  
#### 1-5. Workowl 접속
```git  
http://localhost:3000
```  
***
## 현재 개발 중  
1. 출퇴근 이력 표시 페이지 추가  
***
## 지금까지의 제공 기능
1. 회원 가입 / 로그인
2. 출퇴근 기록
3. 다른 회원들의 근무 상태와 출퇴근 시간 확인
  - 출근 전 : 계획 혹은 기본 설정되어 있는 출퇴근 시간 표시
  - 근무 중 : 실제 출근 시간과 계획/기본설정 퇴근 시간 표시
  - 퇴근 후 : 실제 출근/퇴근 시간 표시
 
## 작업 예정
1. 초기 설정 파일 생성 스크립트 추가
2. Deploy 모드 추가  
~~3. 출퇴근 이력 표시 페이지 추가~~
4. 유연근무제 계획 등록 페이지 추가
5. 개인 설정 페이지 추가
