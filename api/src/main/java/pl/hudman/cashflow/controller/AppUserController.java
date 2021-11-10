package pl.hudman.cashflow.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import pl.hudman.cashflow.dto.AppUserDto;
import pl.hudman.cashflow.dto.OperationDto;
import pl.hudman.cashflow.exception.IncorrectModel;
import pl.hudman.cashflow.exception.IncorrectParameters;
import pl.hudman.cashflow.exception.NotFound;
import pl.hudman.cashflow.model.AppUser;
import pl.hudman.cashflow.service.AppUserService;
import pl.hudman.cashflow.utility.Helper;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/api")
public class AppUserController {

    @Autowired
    private AppUserService appUserService;

    @GetMapping("/user")
    public AppUser getUserByName(@RequestParam String username) {
        try {
            return this.appUserService.getUserByUserName(username);
        } catch (NotFound ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage());
        }
    }

    @GetMapping("/user/{id}")
    public AppUser getUserById(@PathVariable int id) {
        try {
            return this.appUserService.getUserById(id);
        } catch (NotFound ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage());
        }
    }

    @PostMapping("/user/add")
    public ResponseEntity<String> addOperation(@RequestBody AppUserDto appUserDto) {
        try {
            this.appUserService.addUser(appUserDto);
            return new ResponseEntity<>("Ok", HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/user/update/{id}")
    public ResponseEntity<String> updateOperation(@RequestBody AppUserDto appUserDto, @PathVariable int id) {
        try {
            this.appUserService.updateUser(appUserDto, id);
            return new ResponseEntity<>("Ok", HttpStatus.OK);
        } catch (NotFound ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/user/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable int id) {
        this.appUserService.deleteUser(id);
        return new ResponseEntity<>("Ok", HttpStatus.OK);
    }

    @GetMapping("/refreshtoken")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authorization = request.getHeader(AUTHORIZATION);
        if (authorization != null && authorization.startsWith(Helper.tokenStartWith)) {
            try {
                String refreshToken = authorization.substring(Helper.tokenStartWith.length());
                Algorithm algorithm = Algorithm.HMAC256("appcashflow".getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refreshToken);
                String username = decodedJWT.getSubject();
                AppUser user = appUserService.getUserByUserName(username);
                List<GrantedAuthority> authorities = new ArrayList<>();

                String accessToken = JWT.create()
                        .withSubject(user.getCompanyName())
                        .withExpiresAt(new Date(System.currentTimeMillis() + 20 * 60 * 1000))
                        .withIssuer(request.getRequestURL().toString())
                        .withClaim("roles", authorities)
                        .sign(algorithm);

                Map<String, String> tokens = new HashMap<>();
                tokens.put("access_token", accessToken);
                tokens.put("resfresh_token", refreshToken);
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), tokens);
            } catch (Exception ex) {
                response.setHeader("error", ex.getMessage());
                response.setStatus(FORBIDDEN.value());
                Map<String, String> error = new HashMap<>();
                error.put("error_message", ex.getMessage());
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), error);
            }
        } else {
            throw new RuntimeException("Refresh token is missing");
        }
    }
}
