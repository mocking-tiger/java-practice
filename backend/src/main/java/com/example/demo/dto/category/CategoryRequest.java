package com.example.demo.dto.category;

// 생성,수정 시 클라이언트에서 받는 데이터
public class CategoryRequest {
    private String name;

    public String getName(){
        return name;
    }
    public void setName(String name){
        this.name = name;
    }
}
