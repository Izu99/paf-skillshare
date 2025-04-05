package com.example.pafbackend.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "skillPlans")
@Getter
@Setter
public class SkillPlan {
    @Id
    private String id;
    private String userId;
    private String skillDetails;  // Details about the skill
    private String skillLevel; // Changed from difficultyLevel for consistency
    private String resources; // Changed from toolsRequired for consistency
    private String date; // Date when the skill plan is scheduled
    private boolean isFinished; // Whether the skill plan is completed (checkbox)
    // Removed mediaUrl
}