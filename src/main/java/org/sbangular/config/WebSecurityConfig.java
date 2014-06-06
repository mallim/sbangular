package org.sbangular.config;

import org.sbangular.security.UnauthorisedEntryPoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.servlet.configuration.EnableWebMvcSecurity;

/**
 * @EnableGlobalMethodSecurity is for
 * <global-method-security pre-post-annotations="enabled" />
 */
@Configuration
@EnableWebMvcSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private SecurityProperties security;

    @Autowired
    @Qualifier("unauthorisedEntryPoint")
    private UnauthorisedEntryPoint unauthorisedEntryPoint;

    @Override
    /**
     * @see org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter#configure(WebSecurity)
     */
    public void configure(WebSecurity web) throws Exception {

        /**
         * <http pattern="/js/**" security="none" />
         * <http pattern="/css/**" security="none" />
         * <http pattern="/fonts/**" security="none" />
         */
        web.ignoring()
          .antMatchers("/css/**")
          .antMatchers("/js/**")
          .antMatchers("/fonts/**");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        /**
         * <http-basic entry-point-ref="unauthorisedEntryPoint"/>
         * <intercept-url pattern="/**" access="permitAll" />
         */
        http.httpBasic()
            .authenticationEntryPoint(unauthorisedEntryPoint)
            .and()
            .authorizeRequests()
            .antMatchers("/**")
            .permitAll();

        /**
         * <logout invalidate-session="true" delete-cookies="JSESSIONID" />
         */
        http.logout()
            .logoutUrl("/j_spring_security_logout")
            .logoutSuccessUrl("/")
            .invalidateHttpSession( true )
            .deleteCookies("JSESSIONID");

        /**
         * <session-management session-fixation-protection="newSession"/>
         */
        http.sessionManagement()
            .sessionFixation()
            .newSession();

        http.csrf().disable();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
            .withUser("user").password("password").roles("USER")
            .and()
            .withUser("admin").password("admin").roles("ADMIN");
    }
}
