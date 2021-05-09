package br.ufes.dwws.ufespay.core.util;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.faces.application.FacesMessage;
import javax.faces.application.FacesMessage.Severity;
import javax.faces.context.FacesContext;

import org.omnifaces.util.Faces;

import br.ufes.dwws.ufespay.core.persistence.UserDAOJPA;
import br.ufes.inf.nemo.jbutler.TextUtils;

public class Utils {
	
	/** The logger. */
	private static final Logger logger = Logger.getLogger(UserDAOJPA.class.getCanonicalName());
	
	public static boolean checkStringIsNUllEmpty(String str) {
		return (str != null && !str.trim().isEmpty());
	}
	public static boolean validatePassword (String inputPassword, String retriedvedPassword) {
		boolean result = false;
		if (!Utils.checkStringIsNUllEmpty(inputPassword))
			return false;
		else {
			try {
				result = (TextUtils.produceBase64EncodedMd5Hash(inputPassword)).equals(retriedvedPassword);
			}catch( NoSuchAlgorithmException | UnsupportedEncodingException e) {
				logger.log(Level.SEVERE, "Error trying to parse password \"{0}\"...", inputPassword);
			}		
		}
		return result;
	}
	
	public static void redirectsToUrl(String urlTarget) throws IOException{
		Faces.getExternalContext().getFlash().setKeepMessages(true);
		Faces.redirect(urlTarget);
	}

	public static void showMessageRedirec(String msgHeader, String msgBody, String urlTarget,Severity severity)
			throws IOException {
		Faces.getExternalContext().getFlash().setKeepMessages(true);
		FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(severity, msgHeader, msgBody));
		Faces.redirect(urlTarget);
	}
}
