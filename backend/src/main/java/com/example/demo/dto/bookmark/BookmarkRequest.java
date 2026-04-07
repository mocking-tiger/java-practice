package com.example.demo.dto.bookmark;

public class BookmarkRequest {
    private Long categoryId;
    private String url;
    private String name;
    private String description;
    public Long getCategoryId() { return categoryId; }
    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }
    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}