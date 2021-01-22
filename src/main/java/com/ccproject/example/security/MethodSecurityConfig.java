package com.ccproject.example.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.GlobalMethodSecurityConfiguration;

@Configuration
@EnableGlobalMethodSecurity(
        //prePostEnabled = true,
       // securedEnabled = true,
        jsr250Enabled = true)  //property allows us to use the @RoleAllowed annotation
public class MethodSecurityConfig extends GlobalMethodSecurityConfiguration {
}