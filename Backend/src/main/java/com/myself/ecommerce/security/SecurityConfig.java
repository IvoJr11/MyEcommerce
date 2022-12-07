package com.myself.ecommerce.security;

import com.myself.ecommerce.filter.CustomAuthenticationFilter;
import com.myself.ecommerce.filter.CustomAuthorizationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration @EnableWebSecurity @RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  private final UserDetailsService userDetailsService;
  private final BCryptPasswordEncoder bCryptPasswordEncoder;

  //@Bean
  //public PasswordEncoder passwordEncoder() {
    //return new BCryptPasswordEncoder();
  //}
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter(authenticationManagerBean());
    customAuthenticationFilter.setFilterProcessesUrl("/api/login");
    http.csrf().disable();
    http.sessionManagement().sessionCreationPolicy(STATELESS);
    http.authorizeRequests().antMatchers("/api/login/**", "/api/token/refresh/**").permitAll();
    http.authorizeRequests().antMatchers(GET, "/api/clients/**").hasAnyAuthority("CLIENT");
    http.authorizeRequests().antMatchers(POST, "/api/clients/**").hasAnyAuthority("CLIENT");
    http.authorizeRequests().antMatchers(POST, "/api/role/**").hasAnyAuthority("ADMIN");
    http.authorizeRequests().anyRequest().authenticated();
    http.cors().configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues());
    http.addFilter(customAuthenticationFilter);
    http.addFilterBefore(new CustomAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
  }
  @Bean
  @Override
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
  }

}
