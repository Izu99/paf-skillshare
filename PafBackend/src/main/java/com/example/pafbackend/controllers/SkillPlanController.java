package com.example.pafbackend.controllers;

import com.example.pafbackend.models.SkillPlan;
import com.example.pafbackend.repositories.SkillPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skillPlans")
public class SkillPlanController {

    private final SkillPlanRepository skillPlanRepository;

    @Autowired
    public SkillPlanController(SkillPlanRepository skillPlanRepository) {
        this.skillPlanRepository = skillPlanRepository;
    }

    @GetMapping
    public ResponseEntity<List<SkillPlan>> getSkillPlans() {
        List<SkillPlan> skillPlans = skillPlanRepository.findAll();
        return new ResponseEntity<>(skillPlans, HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<SkillPlan>> getSkillPlansByUserId(@PathVariable String userId) {
        List<SkillPlan> skillPlans = skillPlanRepository.findByUserId(userId);
        return new ResponseEntity<>(skillPlans, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<SkillPlan> createSkillPlan(@RequestBody SkillPlan skillPlan) {
        SkillPlan savedSkillPlan = skillPlanRepository.save(skillPlan);
        return new ResponseEntity<>(savedSkillPlan, HttpStatus.CREATED);
    }

    @DeleteMapping("/{skillPlanId}")
    public ResponseEntity<Void> deleteSkillPlan(@PathVariable String skillPlanId) {
        skillPlanRepository.deleteById(skillPlanId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{skillPlanId}")
    public ResponseEntity<SkillPlan> updateSkillPlan(@PathVariable String skillPlanId, @RequestBody SkillPlan updatedSkillPlan) {
        // Check if the skill plan with the given ID exists
        if (!skillPlanRepository.existsById(skillPlanId)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // Set the ID of the updated skill plan
        updatedSkillPlan.setId(skillPlanId);

        // Update the skill plan
        SkillPlan savedSkillPlan = skillPlanRepository.save(updatedSkillPlan);

        return new ResponseEntity<>(savedSkillPlan, HttpStatus.OK);
    }
}
