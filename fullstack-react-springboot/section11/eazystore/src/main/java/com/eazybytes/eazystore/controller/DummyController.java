package com.eazybytes.eazystore.controller;

import com.eazybytes.eazystore.dto.UserDto;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/dummy")
public class DummyController {

    @PostMapping("/create-user")
    public String createUser(@RequestBody UserDto userDto){
        System.out.println(userDto);
        return "User created successfully";
    }

    /*without @RequestParam(required = false) the request http://localhost:8080/api/v1/dummy/search (without search value
    will lead to an error. to accept requests without params you need to: @RequestParam(required = false)
    defaultValue = "Guest"
 */
    @GetMapping("/search")
    public String searchUser(@RequestParam(required = false, defaultValue = "Guest") String name){
        return "Searching for user: " + name;
    }

    @GetMapping("/multiple-search")
    public String multipleSearchUser(@RequestParam String firstName, @RequestParam String lastName){
        return "Searching for user: " + firstName + " " + lastName;
    }


    @GetMapping("/multiple-search-map")
    public String multipleSearchUserMap(@RequestParam Map<String, String> params){
        return "Searching for user: " + params.get("firstName") + " " + params.get("lastName");
    }
}
