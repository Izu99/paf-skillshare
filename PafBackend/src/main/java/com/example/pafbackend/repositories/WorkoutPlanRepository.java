package com.example.pafbackend.repositories;

import com.example.pafbackend.models.WorkoutPlan;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkoutPlanRepository extends MongoRepository<WorkoutPlan, String> {
    List<WorkoutPlan> findByUserId(String userId);
}
