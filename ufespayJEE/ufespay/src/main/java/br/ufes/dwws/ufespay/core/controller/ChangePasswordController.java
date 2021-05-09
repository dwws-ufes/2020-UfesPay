package br.ufes.dwws.ufespay.core.controller;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;

import javax.enterprise.inject.Model;
import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;
import javax.inject.Inject;

import org.omnifaces.util.Faces;

import br.ufes.dwws.ufespay.core.application.UserService;
import br.ufes.dwws.ufespay.core.domain.User;
import br.ufes.dwws.ufespay.core.util.Utils;
import br.ufes.inf.nemo.jbutler.TextUtils;
import br.ufes.inf.nemo.jbutler.ejb.controller.JSFController;

@Model
public class ChangePasswordController extends JSFController{
	/** Serialization id (using default value, change if necessary). */
	private static final long serialVersionUID = 1L;
	
	@Inject
	private UserService userService;

	private String email;

	private String password;
	
	private String repeatPassword;
	
	public void updatePassword() throws IOException {
		try {
			User currentUser = userService.getByEmail(email);
			if ((!password.equals(repeatPassword)) || Utils.checkStringIsNUllEmpty(password)) {
				this.password = null;
				this.repeatPassword = null;
				//this.retrieveLoggedUser();
	
				FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(FacesMessage.SEVERITY_WARN,
						"new password does not match", "new password does not match"));
				Faces.getExternalContext().getFlash().setKeepMessages(true);
				Faces.redirect("/ufespay/core/changePassword/index.xhtml");
			}
			currentUser.setPassword(TextUtils.produceBase64EncodedMd5Hash(password));
			this.userService.updateUser(currentUser);
			Faces.getExternalContext().getFlash().setKeepMessages(true);
			Faces.redirect("/ufespay/core/index.xhtml");
		}catch (NoSuchAlgorithmException e) {
			Faces.getExternalContext().getFlash().setKeepMessages(true);
			FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, "Coud not find Algorithm to encrypt password", "Coud not find Algorithm to encrypt password"));
			Faces.redirect("/ufespay/core/loginUser/index.xhtml");
		}
	}
}

