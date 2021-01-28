package com.ccproject.example.controller;

import com.ccproject.example.authentication.service.UserService;
import com.ccproject.example.errorhandling.NotFoundException;
import com.ccproject.example.model.Book;
import com.ccproject.example.model.User;
import com.ccproject.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {
    Iterable<User> users=new ArrayList<User>();
    @Autowired
    UserRepository userRepository;

  //  @RolesAllowed({"USER","ADMIN"})
    @GetMapping("/{id}/books")
    public Set<Book> getAllReadBooks(@PathVariable String id){
        Optional<User> user=userRepository.findById(Long.parseLong(id));
        Set<Book> readBooks=null;
        if(user!=null)
            readBooks = user.get().getReadBooks();
        //if readBooks!==null
        return readBooks;
    }
//todo: put
  //  @RolesAllowed({"ADMIN"})
    @GetMapping("/{id}")
    public  User getById(@PathVariable String id){
        //Optional<User> user=userRepository.findById(Long.parseLong(id));
        Long idLong=Long.parseLong(id);
        return userRepository.findById(idLong)
                .orElseThrow(() -> new NotFoundException());
    }

   // @RolesAllowed({"USER","ADMIN"})
    @GetMapping("/")
    public Iterable<User> getAll(){
        users=userRepository.findAll();
        //if(users!==null)
        return users;
    }

  //  @RolesAllowed({"ADMIN"})
    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public User addUser(@RequestBody User user){
        User savedUser=userRepository.save(user);
        return savedUser;
    }

  //  @RolesAllowed({"ADMIN"})
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        userRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        userRepository.deleteById(id);
    }



    ////////////////////////////////

    @Autowired
    private UserService userService;

//    @Autowired
//    private SecurityService securityService;
//
//    @Autowired
//    private UserValidator userValidator;

    /*
    @GetMapping("/registration")
    public String registration(Model model) {
        model.addAttribute("userForm", new User());

        return "registration";
    }

    @PostMapping("/registration")
    public String registration(@ModelAttribute("userForm") User userForm, BindingResult bindingResult) {
//        userValidator.validate(userForm, bindingResult);

        if (bindingResult.hasErrors()) {
            return "registration";
        }

        userService.save(userForm);

//        securityService.autoLogin(userForm.getUsername(), userForm.getPasswordConfirm());

        return "redirect:/welcome";
    }

    @GetMapping("/login")
    public String login(Model model, String error, String logout) {
        if (error != null)
            model.addAttribute("error", "Your username and password is invalid.");

        if (logout != null)
            model.addAttribute("message", "You have been logged out successfully.");

        return "login";
    }

    @GetMapping({"/", "/welcome"})
    public String welcome(Model model) {
        return "welcome";
    }*/
}
