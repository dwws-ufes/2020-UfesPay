package br.ufes.dwws.ufespay.core.controller;

import java.io.IOException;

import javax.ejb.EJB;
import javax.enterprise.inject.Model;

import org.omnifaces.util.Faces;

import br.ufes.dwws.ufespay.core.application.UserService;
import br.ufes.dwws.ufespay.core.domain.User;
import br.ufes.inf.nemo.jbutler.ejb.controller.JSFController;

/** TODO: generated by FrameWeb. Should be documented. */
@Model
public class UserController extends JSFController {
	/** Serialization id (using default value, change if necessary). */
	private static final long serialVersionUID = 1L;

	/** TODO: generated by FrameWeb. Should be documented. */
	@EJB
	private UserService userService;

	/** TODO: generated by FrameWeb. Should be documented. */
	private User user;

	/** TODO: generated by FrameWeb. Should be documented. */
	private String repeatPassword;
	
	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	private String userName = "jhon doeh";

	/** TODO: generated by FrameWeb. Should be documented. */
	public void createUser() throws IOException {
		userService.createUser();
		Faces.redirect("/ufespay/src/main/webapp/index.xhtml");
	}

	/** Getter for user. */
	public User getUser() {
		return user;
	}

	/** Setter for user. */
	public void setUser(User user) {
		this.user = user;
	}

	/** Getter for repeatPassword. */
	public String getRepeatPassword() {
		return repeatPassword;
	}

	/** Setter for repeatPassword. */
	public void setRepeatPassword(String repeatPassword) {
		this.repeatPassword = repeatPassword;
	}

}