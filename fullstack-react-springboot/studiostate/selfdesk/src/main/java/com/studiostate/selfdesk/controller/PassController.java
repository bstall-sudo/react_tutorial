package com.studiostate.selfdesk.controller;

import com.studiostate.selfdesk.dto.PassCreateRequestDto;
import com.studiostate.selfdesk.dto.PassCreateResponseDto;
import com.studiostate.selfdesk.dto.PassResponseDto;
import com.studiostate.selfdesk.entity.Pass;
import com.studiostate.selfdesk.repository.PassRepository;
import com.studiostate.selfdesk.service.IPassService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
public class PassController {

    private final PassRepository passRepository;
    private final IPassService passService;

    @PostMapping("/admin/passes/create")
    public ResponseEntity<PassCreateResponseDto> savePass(@RequestBody  @Valid PassCreateRequestDto passCreateRequestDto) {

        //passService.savePass(passCreateRequestDto);

        Pass saved = passService.savePass(passCreateRequestDto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new PassCreateResponseDto(
                        saved.getUserId(),
                        saved.getPassId(),
                        saved.getUserName(),
                        saved.getRemainingSeconds(),
                        saved.getPassType(),
                        saved.getPaid(),
                        saved.getActive()


                ));
    }



}

