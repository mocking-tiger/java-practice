# 테이블 스키마

## Category

- id: number
- title: string
- createdAt: date
- updatedAt: date

## Bookmark

- id: number
- url: string
- title: string
- description: string
- imageUrl: string(nullable)
- createdAt: date
- updatedAt: date
- categoryId: number (삭제규칙: cascade, FK not null)
