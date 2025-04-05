package com.example.pafbackend.controllers;

import com.example.pafbackend.models.MealPlan;
import com.example.pafbackend.repositories.MealPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mealPlans")
public class MealPlanController {

    private final MealPlanRepository mealPlanRepository;

    @Autowired
    public MealPlanController(MealPlanRepository mealPlanRepository) {
        this.mealPlanRepository = mealPlanRepository;
    }

    @GetMapping
    public ResponseEntity<List<MealPlan>> getMealPlans() {
        List<MealPlan> mealPlans = mealPlanRepository.findAll();
        return new ResponseEntity<>(mealPlans, HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<MealPlan>> getMealPlansByUserId(@PathVariable String userId) {
        List<MealPlan> mealPlans = mealPlanRepository.findByUserId(userId);
        return new ResponseEntity<>(mealPlans, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<MealPlan> createMealPlan(@RequestBody MealPlan mealPlan) {
        MealPlan savedMealPlan = mealPlanRepository.save(mealPlan);
        return new ResponseEntity<>(savedMealPlan, HttpStatus.CREATED);
    }

    @DeleteMapping("/{mealPlanId}")
    public ResponseEntity<Void> deleteMealPlan(@PathVariable String mealPlanId) {
        mealPlanRepository.deleteById(mealPlanId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{mealPlanId}")
    public ResponseEntity<MealPlan> updateMealPlan(@PathVariable String mealPlanId, @RequestBody MealPlan updatedMealPlan) {
        // Check if the meal plan with the given ID exists
        if (!mealPlanRepository.existsById(mealPlanId)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // Set the ID of the updated meal plan
        updatedMealPlan.setId(mealPlanId);

        // Update the meal plan
        MealPlan savedMealPlan = mealPlanRepository.save(updatedMealPlan);

        return new ResponseEntity<>(savedMealPlan, HttpStatus.OK);
    }
}
