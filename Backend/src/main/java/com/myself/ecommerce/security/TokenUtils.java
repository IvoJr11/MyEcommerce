package com.myself.ecommerce.security;

import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

public class TokenUtils {
  
  private static final String ACCESS_TOKEN_SECRET = ")$d%?Q#rQK?%,U/m%v%i@.w#]U}Bp(Bg&-nrPH.j";
  private static final Long ACCESS_TOKEN_LIFETIME = 2_592_000L;

  private TokenUtils(){};

  public static String createToken(String name, String email) {
    long expirationTime = ACCESS_TOKEN_LIFETIME * 1000;
    Date expirationDate = new Date(System.currentTimeMillis() + expirationTime);
  
    Map<String, Object> extra = new HashMap<>();
    extra.put("name", name);

    return Jwts.builder()
      .setSubject(email)
      .setExpiration(expirationDate)
      .addClaims(extra)
      .signWith(Keys.hmacShaKeyFor(ACCESS_TOKEN_SECRET.getBytes()))
      .compact();
  }

  public static UsernamePasswordAuthenticationToken getAuthentication(String token) {
    
    try {
      Claims claims = Jwts.parserBuilder()
      .setSigningKey(ACCESS_TOKEN_SECRET.getBytes())
      .build()
      .parseClaimsJws(token)
      .getBody();
  
      String email = claims.getSubject();
  
      return new UsernamePasswordAuthenticationToken(email, null, Collections.emptyList());
    } catch (JwtException exception) {
      return null;
    }
  }
}
