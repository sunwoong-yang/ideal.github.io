# IDEA LAB Website — Claude Instructions

## News 업데이트 규칙

뉴스를 추가하거나 수정할 때 **반드시 아래 세 곳을 모두 업데이트**한다:

1. `news/` 폴더에 상세 페이지 HTML 파일 생성
   - 파일명은 `YYMMDD_설명.html` 형식 (예: `260507_news-26CAE-conference.html`)
2. `news.html` — 뉴스 목록에 항목 추가 (최신순, 맨 위)
3. `index.html` — 홈 화면 하단 News 섹션을 **최신 3개**로 유지 (링크 포함)

news.html과 index.html의 링크는 항상 실제 파일명과 일치해야 한다.

## Invited Talk 업데이트 규칙

뉴스가 Invited Talk에 해당하는 경우, `team-advisor.html`의 Invited Talks 목록 **맨 위**에도 추가한다.
형식: `<li>[기관명], "[발표 제목]", [월] [연도].</li>`
