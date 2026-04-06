package com.example.demo.service;
import com.example.demo.domain.Bookmark;
import com.example.demo.domain.Category;
import com.example.demo.repository.BookmarkRepository;
import com.example.demo.repository.CategoryRepository;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class BookmarkService {
    private final BookmarkRepository bookmarkRepository;
    private final CategoryRepository categoryRepository;
    public BookmarkService(BookmarkRepository bookmarkRepository,
                           CategoryRepository categoryRepository) {
        this.bookmarkRepository = bookmarkRepository;
        this.categoryRepository = categoryRepository;
    }
    public List<Bookmark> getByCategoryId(Long categoryId) {
        return bookmarkRepository.findByCategoryId(categoryId);
    }
    public Bookmark getById(Long id) {
        return bookmarkRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("북마크를 찾을 수 없습니다."));
    }
    public Bookmark create(Long categoryId, String url, String name, String description) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("카테고리를 찾을 수 없습니다."));
        Bookmark bookmark = new Bookmark();
        bookmark.setUrl(url);
        bookmark.setName(name);
        bookmark.setDescription(description);
        bookmark.setCategory(category);
        return bookmarkRepository.save(bookmark);
    }
    public Bookmark update(Long id, String url, String name, String description) {
        Bookmark bookmark = bookmarkRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("북마크를 찾을 수 없습니다."));
        bookmark.setUrl(url);
        bookmark.setName(name);
        bookmark.setDescription(description);
        return bookmarkRepository.save(bookmark);
    }
    public void delete(Long id) {
        bookmarkRepository.deleteById(id);
    }
}
