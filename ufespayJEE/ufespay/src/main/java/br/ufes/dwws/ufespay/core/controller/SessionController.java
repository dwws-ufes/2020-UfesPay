package br.ufes.dwws.ufespay.core.controller;

import java.io.IOException;
import java.io.Serializable;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.security.Principal;

import javax.annotation.PostConstruct;
import javax.enterprise.context.SessionScoped;
import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;
import javax.inject.Inject;
import javax.inject.Named;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.omnifaces.util.Faces;

import br.ufes.dwws.ufespay.core.application.UserService;
import br.ufes.dwws.ufespay.core.domain.User;
import br.ufes.dwws.ufespay.core.util.Utils;
import br.ufes.inf.nemo.jbutler.TextUtils;
import br.ufes.inf.nemo.jbutler.ejb.controller.JSFController;

//extends JSFController

@Named
@SessionScoped
public class SessionController implements Serializable {
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
	private String repeatPassword;

	private class MyJSFController extends JSFController {
		private static final long serialVersionUID = 1L;

		void addMessage(String bundleName, FacesMessage.Severity severity, String summaryKey, String detailKey) {
			addGlobalI18nMessage(bundleName, severity, summaryKey, detailKey);
		}

		void addMessage(String bundleName, FacesMessage.Severity severity, String summaryKey, Object[] summaryParams,
				String detailKey, Object[] detailParams) {
			addGlobalI18nMessage(bundleName, severity, summaryKey, summaryParams, detailKey, detailParams);
		}
	};

	@PostConstruct
	private void setupLoggedUser() {
		this.retrieveLoggedUser();
	}

	private static boolean validatePassword (String inputPassword, String retriedvedPassword) throws NoSuchAlgorithmException,UnsupportedEncodingException {
		if (Utils.checkStringIsNUllEmpty(inputPassword))
			return false;
		else {
				return (TextUtils.produceBase64EncodedMd5Hash(inputPassword)).equals(retriedvedPassword);
		}
	}

	public void login() throws IOException {
		try {
			this.currentUser = userService.getByEmail(email);
			if ((this.currentUser != null) && (validatePassword(this.password, this.currentUser.getPassword()))) {
				this.currentUser.setPassword(TextUtils.produceBase64EncodedMd5Hash(password));
				this.userService.updateUser(currentUser);
				HttpServletRequest request = (HttpServletRequest) FacesContext.getCurrentInstance().getExternalContext()
						.getRequest();
				request.logout();
				request.login(email, password);
				Faces.getExternalContext().getFlash().setKeepMessages(true);
				Faces.redirect("/ufespay/index.xhtml");
			} else {
				Faces.getExternalContext().getFlash().setKeepMessages(true);
				FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(FacesMessage.SEVERITY_WARN,
						"User not found or password invalid", "User not found or password invalid"));
				Faces.redirect("/ufespay/login.xhtml");
			}

		} catch (ServletException | NoSuchAlgorithmException | UnsupportedEncodingException e) {
			Faces.getExternalContext().getFlash().setKeepMessages(true);
			FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(FacesMessage.SEVERITY_WARN,
					"email or password invalid", "email or password invalid"));
			Faces.redirect("/ufespay/login.xhtml");
		}
	}

	private void retrieveLoggedUser() {
		Principal principal = request.getUserPrincipal();
		if (principal != null) {
			this.currentUser = userService.getByEmail(principal.getName());
		}
	}

	public void logout() throws IOException {
		((HttpSession) FacesContext.getCurrentInstance().getExternalContext().getSession(false)).invalidate();
		Faces.getExternalContext().getFlash().setKeepMessages(true);
		Faces.redirect("/ufespay/login.xhtml");
	}

	public void updatePassword() throws IOException {
		try {
			if ((!password.equals(repeatPassword)) || Utils.checkStringIsNUllEmpty(password)) {
				this.password = null;
				this.repeatPassword = null;
				this.retrieveLoggedUser();
	
				FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(FacesMessage.SEVERITY_WARN,
						"new password does not match", "new password does not match"));
				Faces.getExternalContext().getFlash().setKeepMessages(true);
				Faces.redirect("/ufespay/users/changePassword/index.xhtml");
			}
			this.currentUser.setPassword(TextUtils.produceBase64EncodedMd5Hash(password));
			this.userService.updateUser(currentUser);
			Faces.getExternalContext().getFlash().setKeepMessages(true);
			Faces.redirect("/ufespay/index.xhtml");
		}catch (NoSuchAlgorithmException e) {
			Faces.getExternalContext().getFlash().setKeepMessages(true);
			FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, "Coud not find Algorithm to encrypt password", "Coud not find Algorithm to encrypt password"));
			Faces.redirect("/ufespay/login.xhtml");
		}
	}
	
	public String redirectLoggin() throws IOException {
		//Faces.getExternalContext().getFlash().setKeepMessages(true);
		//Faces.redirect("/ufespay/login.xhtml");
		return "/login.xhtml?faces-redirect=true";
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

	public String getRepeatPassword() {
		return repeatPassword;
	}

	public void setRepeatPassword(String repeatPassword) {
		this.repeatPassword = repeatPassword;
	}

}
