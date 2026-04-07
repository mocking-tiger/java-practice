package com.example.demo.dto.bookmark;
import com.example.demo.domain.Bookmark;
import java.time.LocalDateTime;
public class BookmarkResponse {
    private Long id;
    private Long categoryId;
    private String url;
    private String name;
    private String description;
    private String imageUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    public BookmarkResponse(Bookmark bookmark) {
        this.id = bookmark.getId();
        this.categoryId = bookmark.getCategory().getId();
        this.url = bookmark.getUrl();
        this.name = bookmark.getName();
        this.description = bookmark.getDescription();
        this.imageUrl = bookmark.getImageUrl();
        this.createdAt = bookmark.getCreatedAt();
        this.updatedAt = bookmark.getUpdatedAt();
    }
    public Long getId() { return id; }
    public Long getCategoryId() { return categoryId; }
    public String getUrl() { return url; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public String getImageUrl() { return imageUrl; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}