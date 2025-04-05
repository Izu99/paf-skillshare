package com.example.pafbackend.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "mealPlans")
@Getter
@Setter
public class MealPlan {
    @Id
    private String id;
    private String userId;
    private String mealDetails;  // Consider using a structured type or JSON
    private String dietaryPreferences;
    private String mediaUrl;
    private String ingredients;



}
