package com.example.demo.domain;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "category")
public class Category {
    // 1. 기본키
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 2. 일반 컬럼 필드
    @Column(nullable = false)
    private String name;

    // 3. 연관관계 필드
    @OneToMany(mappedBy = "category",cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Bookmark> bookmarks = new ArrayList<>();

    // 4. 타임스탬프
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // 5. 라이프사이클 메서드
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // id
    public Long getId() {
        return id;
    }

    // name
    public String getName() {
        return name;
    }

    public void setName(String name){
        this.name = name;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}