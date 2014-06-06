package org.sbangular.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/user")
public class UserCtrl {

    @RequestMapping(value = "/authenticated/retrieve", method = RequestMethod.GET, produces = "application/json")
    public UserDetails authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication == null || !(authentication.getPrincipal() instanceof UserDetails)) {
            return null;
        }

        return (UserDetails)authentication.getPrincipal();
    }

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST, produces = "application/json")
    public void authenticate() {
        // endpoint for the basic authentication request to pass
    }
}
