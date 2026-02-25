package com.studiostate.selfdesk.service.impl;

import com.studiostate.selfdesk.dto.PassCreateRequestDto;
import com.studiostate.selfdesk.dto.PassResponseDto;
import com.studiostate.selfdesk.entity.Pass;
import com.studiostate.selfdesk.repository.PassRepository;
import com.studiostate.selfdesk.service.IPassService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.Clock;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class PassServiceImpl implements IPassService {

    private final PassRepository passRepository;
    private final Clock clock;

    @Override
    public Pass savePass(PassCreateRequestDto passRequestDto) {
        Pass pass = transformToEntity(passRequestDto);
        return passRepository.save(pass);

    }


    @Override
    public List<PassResponseDto> getPassByUserName( String userName){
        return passRepository.findByUserNameContaining(userName)
                .stream()
                .map(this::transformToDTO)
                .collect(Collectors.toList());

    }


    //nachher noch umbauen, nur eine Testfunktion
    private Long calculateRemainingSecondsFromPassType(String passType, Long remainingSeconds){

        if (remainingSeconds==0) {
            if ("6_hours".equals(passType)) {
                return 60L;
            }

            if ("10_hours".equals(passType)) {
                return 300L;
            }

            if ("15_hours".equals(passType)) {
                return 600L;
            } else {
                return 9000L;
            }
        }
        else{
            return remainingSeconds;
        }
    }



    private Pass transformToEntity(PassCreateRequestDto passRequestDto) {
        Pass pass = new Pass();
        BeanUtils.copyProperties(passRequestDto, pass);
        pass.setActive(true);
        pass.setPaid(false);

        pass.setRemainingSeconds(calculateRemainingSecondsFromPassType(passRequestDto.getPassType(), passRequestDto.getRemainingSeconds()));

        //exchange with real data (after 30 days) after test phase
        pass.setExpiryDateTime(
                Instant.now(clock).plusSeconds(passRequestDto.getExpiryDateTime())
        );
        pass.setCreatedBy(passRequestDto.getUserName());
        pass.setCreatedAt(Instant.now(clock));
        return pass;
    }

    private PassResponseDto transformToDTO (Pass pass){
        PassResponseDto passResponseDto = new PassResponseDto();
        BeanUtils.copyProperties(pass, passResponseDto); // this copies all data to the data transfer model, only works, if the property names are the same
        return passResponseDto;

    }




}


