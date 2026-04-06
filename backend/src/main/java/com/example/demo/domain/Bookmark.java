package com.example.demo.domain;
import jakarta.persistence.*;
import java.time.LocalDateTime;
@Entity
@Table(name = "bookmark")
public class Bookmark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 2048)
    private String url;
    @Column(nullable = false)
    private String name;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String imageUrl;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
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
    public Long getId() { return id; }
    // url
    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
    // name
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    // description
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    // imageUrl
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    // category
    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }
    // createdAt, updatedAt (setter 불필요 — @PrePersist/@PreUpdate가 자동 세팅)
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}