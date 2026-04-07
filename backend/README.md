# 테이블 스키마

## Category

- id: number
- name: string
- createdAt: date
- updatedAt: date

## Bookmark

- id: number
- url: string
- name: string
- description: string
- createdAt: date
- updatedAt: date
- categoryId: number (삭제규칙: cascade, FK not null)

# 서비스 구조

HTTP 요청

↓

Controller (요청 받고 응답 돌려주기)

↓

Service (비즈니스 로직)

↓

Repository (DB 접근)

↓

Domain (DB 테이블 구조 정의)

↓

DB (H2)

- 각 계층이 한 가지 역할만 담당하고, 위에서 아래 방향으로만 호출.
- Controller: 웨이터 — 손님(클라이언트) 주문 받고, 완성된 음식 가져다 줌
- Service: 주방장 — 실제 조리 담당, "이 재료로 이렇게 만든다" 판단
- Repository: 냉장고 — 재료(데이터) 꺼내고 넣고 버리기
- Domain(엔티티): 식재료 자체 — 냉장고 안에 있는 실제 데이터 형태s
- DB: 식재료 창고 — 냉장고가 여기서 꺼내 옴
