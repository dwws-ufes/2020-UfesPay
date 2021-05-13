package br.ufes.dwws.ufespay.core.controller;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.Principal;
import java.util.Locale;

import javax.enterprise.context.SessionScoped;
import javax.enterprise.inject.Model;
import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;
import javax.inject.Inject;
import javax.inject.Named;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.omnifaces.util.Faces;

import br.ufes.dwws.ufespay.core.application.UserService;
import br.ufes.dwws.ufespay.core.domain.User;
import br.ufes.dwws.ufespay.core.util.Utils;
import br.ufes.inf.nemo.jbutler.ejb.controller.JSFController;

@Named
@Model
@SessionScoped
public class LoginUserController extends JSFController {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Inject
	private HttpServletRequest request;

	@Inject
	private UserService userService;

	private User currentUser;

	private String email;

	private String password;
	
	private Locale userLocale;

	/*@PostConstruct
	private void setupLoggedUser() {
		this.retrieveLoggedUser();
	}*/
	


	public void login() throws IOException {
		try {
			this.currentUser = userService.getByEmail(email);
			this.userLocale = FacesContext.getCurrentInstance().getExternalContext().getRequestLocale();
			//
			if ((this.currentUser != null)&& (Utils.validatePassword(this.password, this.currentUser.getPassword()))) {
				/*HttpServletRequest request = (HttpServletRequest) FacesContext.getCurrentInstance().getExternalContext()
						.getRequest();
				request.logout();
				request.login(email, password);*/
				Faces.getExternalContext().getFlash().setKeepMessages(true);
				Faces.redirect("/ufespay/core/index.xhtml");
			} else {
				Utils.showMessageRedirec("Could not login","User not found or password invalid", "/ufespay/core/loginUser/index.xhtml",FacesMessage.SEVERITY_WARN );
			}

		} catch ( UnsupportedEncodingException e) {
			//ServletException
			Utils.showMessageRedirec("Unkown Error","UnsupportedEncodingException", "/ufespay/core/loginUser/index.xhtml",FacesMessage.SEVERITY_ERROR );
		}
	}

	public void retrieveLoggedUser() {
		Principal principal = request.getUserPrincipal();
		if (principal != null) {
			this.currentUser = userService.getByEmail(principal.getName());
		}
	}

	public void logout() throws IOException {
		//((HttpSession) FacesContext.getCurrentInstance().getExternalContext().getSession(false)).invalidate();
		Faces.getExternalContext().getFlash().setKeepMessages(true);
		Faces.redirect("/ufespay/core/loginUser/index.xhtml");
	}

	public boolean isLoggedIn() {

		return currentUser != null;
	}

	public boolean checkLogin() {
		if (!isLoggedIn()) {
			return false;
		}
		return true;
	}
	
	public User getCurrentUser() {
		return currentUser;
	}

	public void setCurrentUser(User currentUser) {
		this.currentUser = currentUser;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Locale getUserLocale() {
		return userLocale;
	}

	public void setUserLocale(Locale userLocale) {
		this.userLocale = userLocale;
	}
	
	
}
