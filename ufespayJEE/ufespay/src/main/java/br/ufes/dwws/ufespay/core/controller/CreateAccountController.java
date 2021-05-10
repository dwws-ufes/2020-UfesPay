package br.ufes.dwws.ufespay.core.controller;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.security.NoSuchAlgorithmException;

import javax.enterprise.inject.Model;
import javax.faces.application.FacesMessage;
import javax.faces.application.FacesMessage.Severity;
import javax.faces.context.FacesContext;
import javax.inject.Inject;

import org.omnifaces.util.Faces;

import br.ufes.dwws.ufespay.core.application.UserService;
import br.ufes.dwws.ufespay.core.domain.User;
import br.ufes.dwws.ufespay.core.util.Utils;
import br.ufes.inf.nemo.jbutler.TextUtils;
import br.ufes.inf.nemo.jbutler.ejb.controller.JSFController;

@Model
public class CreateAccountController extends JSFController {
	/** Serialization id (using default value, change if necessary). */
	private static final long serialVersionUID = 1L;

	private String name;
	private String email;
	private String password;
	private String repeatPassword;

	@Inject
	private UserService userService;

	@Inject
	private LoginUserController loginUserController;

	public void createUser() throws IOException {
		User currentUser = userService.getByEmail(email);

		if (currentUser == null) {
			if (validatePassword(repeatPassword, password)) {
				try {
					String newUserPassword = TextUtils.produceBase64EncodedMd5Hash(password);
					currentUser = userService.createUser(name, email, newUserPassword, BigDecimal.valueOf(0, 0));
					loginUserController.setCurrentUser(currentUser);
					Faces.getExternalContext().getFlash().setKeepMessages(true);
					Faces.redirect("/ufespay/core/loginUser/index.xhtml");
					// loginUserController.login
				} catch (NoSuchAlgorithmException e) {
					Utils.showMessageRedirec("error encripting user password", "error encripting user password",
							"/ufespay/core/createAccount/index.xhtml", FacesMessage.SEVERITY_ERROR);
				}
			} else {
				Utils.showMessageRedirec("password does not macth", "password does not macth",
						"/ufespay/core/createAccount/index.xhtml", FacesMessage.SEVERITY_WARN);
			}
		} else {
			Utils.showMessageRedirec("email already registred",  "email already registred",
					"/ufespay/core/createAccount/index.xhtml", FacesMessage.SEVERITY_WARN);
		}

	}

	private boolean validatePassword(String pass1, String pass2) {
		return (Utils.checkStringIsNUllEmpty(pass1)) && (Utils.checkStringIsNUllEmpty(pass2)) && (pass1.equals(pass2));
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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
