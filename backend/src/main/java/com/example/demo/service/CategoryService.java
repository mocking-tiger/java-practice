package com.example.demo.service;

//서비스는 비즈니스 로직이 들어가는 중간 계층입니다.
//컨트롤러가 요청을 받으면 → 서비스를 호출하고 → 서비스가 리포지토리를 사용.

import com.example.demo.domain.Category;
import com.example.demo.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> getAll(){
        return categoryRepository.findAll();
    }

    public Category create(String name){
        Category category = new Category();
        category.setName(name);
        return categoryRepository.save(category);
    }

    public Category update(Long id, String name) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("카테고리를 찾을 수 없습니다."));
        category.setName(name);
        return categoryRepository.save(category);
    }

    public void delete(Long id) {
        categoryRepository.deleteById(id);
    }
}
