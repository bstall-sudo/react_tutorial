package com.eazybytes.eazystore.controller;

import com.eazybytes.eazystore.dto.UserDto;
import org.apache.catalina.User;
import org.springframework.http.RequestEntity;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpHeaders;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/dummy")
public class DummyController {

    //http://localhost:8080/api/v1/dummy/create-user
    @PostMapping("/create-user")
    public String createUser(@RequestBody UserDto userDto){
        System.out.println(userDto);
        return "User created successfully";
    }

    //http://localhost:8080/api/v1/dummy/request-entity?name=madan&age=25
    @PostMapping("/request-entity")
    public String createUserWithEntity(RequestEntity<UserDto> requestEntity){
        requestEntity.getHeaders();
        UserDto userDto = requestEntity.getBody();
        String queryString = requestEntity.getUrl().getQuery();
        //String queryString = requestEntity.getUrl().getPath();
        return "User created successfully: " + userDto +"- - - - " + queryString;
    }

    @GetMapping("/headers")
    public String readHeaders(@RequestHeader(name="User-Agent") String userAgent, @RequestHeader(name="User-Location", required = false) String userLocation){

        return "Received headers with value: " + userAgent + " at: " + userLocation;
    }

    @GetMapping("/headerToString")
    public String readHeaderToString(@RequestHeader Map<String, String> headers){

        return "Received headers with value: " + headers.toString();
    }


    /*without @RequestParam(required = false) the request http://localhost:8080/api/v1/dummy/search (without search value
    will lead to an error. to accept requests without params you need to: @RequestParam(required = false)
    defaultValue = "Guest"
 */
    @GetMapping("/search")
    public String searchUser(@RequestParam(required = false, defaultValue = "Guest") String name){
        return "Searching for user: " + name;
    }

    //http://localhost:8080/api/v1/dummy/multiple-search-map?firstName=Madan&lastName=Reddy
    @GetMapping("/multiple-search")
    public String multipleSearchUser(@RequestParam String firstName, @RequestParam String lastName){
        return "Searching for user: " + firstName + " " + lastName;
    }


    @GetMapping("/multiple-search-map")
    public String multipleSearchUserMap(@RequestParam Map<String, String> params){
        return "Searching for user: " + params.get("firstName") + " " + params.get("lastName");
    }

    /*
    @GetMapping("/user/{userId}")
    public String getUser(@PathVariable String userId){
        return "User with ID: " + userId + " is Bertold";
    }

    @GetMapping("/user/{userId}/post/{postId}")
    public String getUserPost(@PathVariable(name = "userId") String id, @PathVariable(name = "postId") String postId){
        return "User with ID: " + id + " posts " + postId;
    }
    */

    @GetMapping({"/user/{userId}/post/{postId}", "/user/{userId}" })
    public String getUserPostVariableLength(@PathVariable(name = "userId") String id, @PathVariable(required = false) String postId){
        return "getUserPostVariableLength is returned: User with ID: " + id + " posts " + postId;
    }
}
