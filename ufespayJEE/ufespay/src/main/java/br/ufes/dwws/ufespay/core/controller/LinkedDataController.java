package br.ufes.dwws.ufespay.core.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.ejb.EJB;
import javax.ejb.EJBException;
import javax.enterprise.context.SessionScoped;
import javax.faces.application.FacesMessage;
import javax.inject.Named;

import org.apache.jena.query.QueryException;

import br.ufes.dwws.ufespay.core.application.LinkedDataService;
import br.ufes.dwws.ufespay.core.linkeddata.Country;
import br.ufes.dwws.ufespay.core.util.Utils;
import br.ufes.inf.nemo.jbutler.ejb.controller.JSFController;

@SessionScoped
@Named
public class LinkedDataController extends JSFController {

	@EJB
	private LinkedDataService linkedataService;

	private static final long serialVersionUID = 1L;

	private List<Country> availableCountries = new ArrayList<Country>();

	private Country selelectedCountry;

	private Country retrivedCountry;

	//@PostConstruct
	public void retriedAllCountries() throws IOException{
		try {
			this.availableCountries = linkedataService.retriedAllCountries();
			this.selelectedCountry = this.availableCountries.get(0);
		} catch (EJBException | QueryException e) {
			System.out.println(e.getMessage());
			 Utils.showMessageRedirec("Unknown error", "Unable to execute SPARQL",
					"/ufespay/core/linkeddata/index.xhtml", FacesMessage.SEVERITY_ERROR);
		}
	}

	public void onCountryChange() throws IOException {
		if (this.selelectedCountry != null) {
			try {
				this.retrivedCountry = this.linkedataService.retrieveCountryInfo(this.selelectedCountry.getName());
			} catch (EJBException | QueryException e) { // QueryExceptionHTTP QueryException
				Utils.showMessageRedirec("Unknown error", "Unable to execute SPARQL",
						"/ufespay/core/linkeddata/index.xhtml", FacesMessage.SEVERITY_ERROR);
			}
		}
	}
	
	public void redirectsHome() throws IOException {
		Utils.redirectsToUrl("/ufespay/core/index.xhtml");
	}

	public List<Country> getAvailableCountries() {
		return availableCountries;
	}

	public void setAvailableCountries(List<Country> availableCountries) {
		this.availableCountries = availableCountries;
	}

	public Country getSelelectedCountry() {
		return selelectedCountry;
	}

	public void setSelelectedCountry(Country selelectedCountry) {
		this.selelectedCountry = selelectedCountry;
	}

	public Country getRetrivedCountry() {
		return retrivedCountry;
	}

	public void setRetrivedCountry(Country retrivedCountry) {
		this.retrivedCountry = retrivedCountry;
	}

}
