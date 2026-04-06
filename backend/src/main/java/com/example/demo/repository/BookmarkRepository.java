package com.example.demo.repository;

import com.example.demo.domain.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    List<Bookmark> findByCategoryId(Long categoryId);
}

//interface
//클래스가 아니라 인터페이스. 구현은 Spring이 자동으로 해줌

//extends JpaRepository<Category, Long>
//        Category 엔티티를, id 타입은 Long으로. 기본 CRUD 메서드가 전부 제공됨

//findByCategoryId(Long categoryId)
//메서드 이름만 규칙에 맞게 지으면 Spring이 자동으로 WHERE category_id = ? 쿼리를 만들어줌

//JpaRepository가 기본으로 제공하는 메서드들
//save(entity)
//저장 (없으면 INSERT, 있으면 UPDATE)

//findById(id)
//id로 단건 조회

//findAll()
//전체 조회

//deleteById(id)
//id로 삭제

//existsById(id)
//존재 여부 확인
