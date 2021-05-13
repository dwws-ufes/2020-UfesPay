package br.ufes.dwws.ufespay.core.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.enterprise.context.SessionScoped;
import javax.inject.Named;

import org.apache.commons.lang3.StringUtils;
import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.QueryExecutionFactory;
import org.apache.jena.query.QuerySolution;
import org.apache.jena.query.ResultSet;

import br.ufes.dwws.ufespay.core.application.LinkedDataService;
import br.ufes.dwws.ufespay.core.application.TransactionService;
import br.ufes.dwws.ufespay.core.linkeddata.Country;
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
	

	@PostConstruct
	public void retriedAllCountries() {
		this.availableCountries = linkedataService.retriedAllCountries();
		this.selelectedCountry = this.availableCountries.get(0);
	}
	
	public void onCountryChange() throws IOException {
		if (this.selelectedCountry != null) {
			this.retrivedCountry = this.linkedataService.retrieveCountryInfo(this.selelectedCountry.getName());
		}
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
