package com.ccproject.example.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig  extends WebSecurityConfigurerAdapter {
    @Bean
    public static NoOpPasswordEncoder passwordEncoder(){
        return (NoOpPasswordEncoder ) NoOpPasswordEncoder.getInstance();
    }
    /*
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .anyRequest()
                .permitAll()
                .and().csrf().disable(); //allowing unrestricted access to all endpoints
    }

    @Autowired
    DataSource dataSource;
    @Override
    protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
    /*   auth.jdbcAuthentication().dataSource(dataSource)
               .usersByUsernameQuery("select * from user where username = ? ");*/

    /*    auth.inMemoryAuthentication()
                .withUser("username1").password(("username1")).roles("USER")
                .and()
                .withUser("username2").password("username2").roles("USER")
                .and()
                .withUser("admin").password("admin").roles("ADMIN");

    }*/

//*******************************

    //security for all API
   @Override
    protected void configure(final HttpSecurity http) throws Exception {
        // http builder configurations for authorize requests and form login (see below)
    http.csrf().disable();
  /*  http.authorizeRequests().anyRequest().fullyAuthenticated().and()
            .formLogin().and()
            .logout().permitAll();*/
         //  .deleteCookies("JSESSIONID");
       //    .logoutSuccessHandler(logoutSuccessHandler())()
    http.authorizeRequests().antMatchers(HttpMethod.OPTIONS).permitAll().and().httpBasic()
            .and()
               .logout()
               // .logoutUrl("/perform_logout")
               .deleteCookies("JSESSIONID");
    }


/*
    //security based on URL
    @Override
    protected void configure(final HttpSecurity http) throws Exception {
        // http builder configurations for authorize requests and form login (see below)
        http.csrf().disable(); //TODO: csrf
        http.authorizeRequests()/*.antMatchers("/api/*").hasRole("USER")
                .antMatchers("/admin").hasRole("ADMIN")*/
/*                .anyRequest().fullyAuthenticated()
                .and()
                        .formLogin()
                .and()
                .logout()
               // .logoutUrl("/perform_logout")
                .deleteCookies("JSESSIONID");
            //    .logoutSuccessHandler(logoutSuccessHandler())
    }
*/



   // @Qualifier("UserDetailsServiceImpl")
    @Autowired
    private UserDetailsService userDetailsService;

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager customAuthenticationManager() throws Exception {
        return authenticationManager();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }
}