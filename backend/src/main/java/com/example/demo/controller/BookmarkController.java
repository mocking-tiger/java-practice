package com.example.demo.controller;

import com.example.demo.dto.bookmark.BookmarkRequest;
import com.example.demo.dto.bookmark.BookmarkResponse;
import com.example.demo.service.BookmarkService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookmarks")
public class BookmarkController {

    private final BookmarkService bookmarkService;

    public BookmarkController(BookmarkService bookmarkService) {
        this.bookmarkService = bookmarkService;
    }

    @GetMapping
    public ResponseEntity<List<BookmarkResponse>> getByCategoryId(
            @RequestParam Long categoryId) {
        List<BookmarkResponse> result = bookmarkService.getByCategoryId(categoryId)
                .stream()
                .map(BookmarkResponse::new)
                .toList();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookmarkResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(new BookmarkResponse(bookmarkService.getById(id)));
    }

    @PostMapping
    public ResponseEntity<BookmarkResponse> create(@RequestBody BookmarkRequest request) {
        BookmarkResponse result = new BookmarkResponse(
                bookmarkService.create(
                        request.getCategoryId(),
                        request.getUrl(),
                        request.getName(),
                        request.getDescription()
                )
        );
        return ResponseEntity.ok(result);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookmarkResponse> update(@PathVariable Long id,
                                                   @RequestBody BookmarkRequest request) {
        BookmarkResponse result = new BookmarkResponse(
                bookmarkService.update(
                        id,
                        request.getUrl(),
                        request.getName(),
                        request.getDescription()
                )
        );
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        bookmarkService.delete(id);
        return ResponseEntity.noContent().build();
    }
}