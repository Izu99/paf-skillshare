package com.example.pafbackend.controllers;

import com.example.pafbackend.models.WorkoutPlan;
import com.example.pafbackend.repositories.WorkoutPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/api/workoutPlans")
public class WorkoutPlanController {

    private final WorkoutPlanRepository workoutPlanRepository;

    @Autowired
    public WorkoutPlanController(WorkoutPlanRepository workoutPlanRepository) {
        this.workoutPlanRepository = workoutPlanRepository;
    }

    @GetMapping
    public ResponseEntity<List<WorkoutPlan>> getWorkoutPlans() {
        List<WorkoutPlan> workoutPlans = workoutPlanRepository.findAll();
        return new ResponseEntity<>(workoutPlans, HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<WorkoutPlan>> getWorkoutPlansByUserId(@PathVariable String userId) {
        List<WorkoutPlan> workoutPlans = workoutPlanRepository.findByUserId(userId);
        return new ResponseEntity<>(workoutPlans, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<WorkoutPlan> createWorkoutPlan(@RequestBody WorkoutPlan workoutPlan) {
        WorkoutPlan savedWorkoutPlan = workoutPlanRepository.save(workoutPlan);
        return new ResponseEntity<>(savedWorkoutPlan, HttpStatus.CREATED);
    }

    @DeleteMapping("/{workoutPlanId}")
    public ResponseEntity<Void> deleteWorkoutPlan(@PathVariable String workoutPlanId) {
        workoutPlanRepository.deleteById(workoutPlanId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @PutMapping("/{workoutPlanId}")
    public ResponseEntity<WorkoutPlan> updateWorkoutPlan(@PathVariable String workoutPlanId, @RequestBody WorkoutPlan updatedWorkoutPlan) {
        Optional<WorkoutPlan> existingWorkoutPlanOptional = workoutPlanRepository.findById(workoutPlanId);
        if (existingWorkoutPlanOptional.isPresent()) {
            WorkoutPlan existingWorkoutPlan = existingWorkoutPlanOptional.get();
            // Update the existing workout plan with the new details
            existingWorkoutPlan.setUserId(updatedWorkoutPlan.getUserId());
            existingWorkoutPlan.setRoutines(updatedWorkoutPlan.getRoutines());
            existingWorkoutPlan.setPlanName(updatedWorkoutPlan.getPlanName());
            existingWorkoutPlan.setDescription(updatedWorkoutPlan.getDescription());
            existingWorkoutPlan.setGoal(updatedWorkoutPlan.getGoal());

            // Save the updated workout plan
            WorkoutPlan savedWorkoutPlan = workoutPlanRepository.save(existingWorkoutPlan);
            return new ResponseEntity<>(savedWorkoutPlan, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
