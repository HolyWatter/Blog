## 블로그 프로젝트

### 기능
[ x ] 회원가입 로그인 (acessToken, refreshToken)
[ x ] 게시글 작성(권한 : creator만 가능) (일상 게시글, 블로그 게시글)
[ x ] 댓글 작성 수정 및 삭제 (모든유저 가능)
[ x ] 방명록 작성 (모든유저 가능)
[ x ] 마이페이지 활동 로그 확인 가능 및 회원탈퇴 및 프로필 사진 수정

### 미구현 추후 추가할 사항
[ ] 리팩토링
[ ] infinityscroll

### 기술
#### 프론트
nextjs(react) + typescript
스타일 : tailwindcss
상태관리 : recoil + apollo-client

#### 백
api : graphql + apollo-server-micro
데이터 베이스 : mysql
orm : prisma