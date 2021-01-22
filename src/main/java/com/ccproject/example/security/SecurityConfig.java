package com.ccproject.example.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig  extends WebSecurityConfigurerAdapter {

   /* @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .anyRequest()
                .permitAll()
                .and().csrf().disable(); //allowing unrestricted access to all endpoints
    }*/

    @Override
    protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
                .withUser("username1").password(("username1")).roles("USER")
                .and()
                .withUser("username2").password("username2").roles("USER")
                .and()
                .withUser("admin").password("admin").roles("ADMIN");
    }
/*
    //security for all API
   @Override
    protected void configure(final HttpSecurity http) throws Exception {
        // http builder configurations for authorize requests and form login (see below)
    http.csrf().disable();
    http.authorizeRequests().anyRequest().authenticated().and().formLogin();
    }
    */


    //security based on URL
    @Override
    protected void configure(final HttpSecurity http) throws Exception {
        // http builder configurations for authorize requests and form login (see below)
        http.csrf().disable(); //TODO: csrf
        http.authorizeRequests()/*.antMatchers("/api/*").hasRole("USER")
                .antMatchers("/admin").hasRole("ADMIN")*/
                .anyRequest().fullyAuthenticated()
                .and()
                        .formLogin()
                .and()
                .logout()
               // .logoutUrl("/perform_logout")
                .deleteCookies("JSESSIONID");
            //    .logoutSuccessHandler(logoutSuccessHandler())
    }

    @Bean
    public static NoOpPasswordEncoder passwordEncoder(){
        return (NoOpPasswordEncoder ) NoOpPasswordEncoder.getInstance();
    }
}