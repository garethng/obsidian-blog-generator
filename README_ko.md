# 블로그 생성기

[English](README.md) | [简体中文](README_zh-CN.md) | [日本語](README_ja.md)

## 소개

블로그 생성기 Obsidian 노트를 구조화된 블로그 포스트로 쉽게 변환할 수 있는 강력한 플러그인입니다. OpenAI의 언어 모델을 사용하여 콘텐츠를 최적화하고, 다국어 출력을 지원하며, 노트 내의 이미지도 처리할 수 있습니다.

## 특징

- 🤖 OpenAI API를 사용한 스마트한 블로그 생성
- 🌍 다국어 지원 (중국어, 영어, 일본어, 한국어)
- 🖼️ 이미지 자동 처리 및 변환
- 🎨 사용자 정의 프롬프트
- 🔧 유연한 API 설정
- 💻 사용자 친화적 인터페이스

## 설치

1. Obsidian에서 설정 열기
2. '서드파티 플러그인'으로 이동
3. '안전 모드' 비활성화
4. '찾아보기'를 클릭하고 "Blog Generator" 검색
5. 설치 클릭

## 설정

1. 설치 후 플러그인 설정으로 이동
2. OpenAI API 키 설정
3. (선택사항) 사용자 정의 API 엔드포인트 설정
4. 블로그 생성 언어 선택
5. (선택사항) 프롬프트 사용자 정의

## 사용 방법

1. 변환하고 싶은 노트 열기
2. 왼쪽 사이드바의 연필 아이콘을 클릭하거나 명령 팔레트에서 "블로그 생성" 입력
3. 생성이 완료될 때까지 대기
4. 생성된 블로그 글은 새로운 Markdown 파일로 저장됩니다

## 개발 가이드

### 필수 조건

- Node.js (v16 이상)
- npm 또는 yarn
- Git

### 빌드 단계

1. 저장소 복제:
```bash
git clone https://github.com/yourusername/obsidian-blog-generator.git
cd obsidian-blog-generator
```

2. 의존성 설치:
```bash
npm install
# 또는
yarn install
```

3. 플러그인 빌드:
```bash
npm run build
# 또는
yarn build
```

4. 개발 모드 (핫 리로드 지원):
```bash
npm run dev
# 또는
yarn dev
```

### Obsidian에서 테스트

1. Obsidian에서 테스트 볼트 생성
2. `.obsidian/plugins/obsidian-blog-generator/` 디렉토리 생성
3. 빌드된 파일(main.js, manifest.json, styles.css)을 이 디렉토리에 복사
4. Obsidian 설정에서 플러그인 활성화

### Obsidian 플러그인 스토어 게시

1. `manifest.json`의 플러그인 정보 업데이트
2. GitHub에서 새 릴리스 생성:
   - 태그 버전은 `manifest.json`의 버전과 일치해야 함
   - 릴리스 이름을 버전 번호로 지정
   - 릴리스 노트 생성
3. Obsidian 플러그인 스토어에 제출:
   - [Obsidian 플러그인 스토어 제출](https://github.com/obsidianmd/obsidian-releases) 방문
   - 저장소 포크
   - `community-plugins.json`에 플러그인 정보 추가
   - 풀 리퀘스트 생성
4. Obsidian 팀의 검토와 승인 대기

#### 플러그인 스토어 제출 요구사항

- 명확한 문서가 포함된 README
- 소스 코드가 공개적으로 사용 가능해야 함
- Obsidian의 가이드라인과 모범 사례를 따라야 함
- Manifest에 필수 필드가 모두 포함되어야 함:
  ```json
  {
    "id": "obsidian-blog-generator",
    "name": "Blog Generator",
    "version": "1.0.2",
    "minAppVersion": "0.15.0",
    "description": "Generate blog posts from your notes using OpenAI",
    "author": "당신의 이름",
    "authorUrl": "https://github.com/yourusername",
    "isDesktopOnly": false
  }
  ```

## 주의사항

- 사용 전 유효한 OpenAI API 키가 설정되어 있는지 확인하세요
- 이미지 처리는 크기와 수량에 따라 시간이 걸릴 수 있습니다
- 생성 전 노트 내용을 검토하고 형식이 올바른지 확인하세요 

## 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요. 