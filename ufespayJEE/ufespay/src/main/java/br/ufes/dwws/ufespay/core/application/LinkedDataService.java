package br.ufes.dwws.ufespay.core.application;

import java.io.Serializable;
import java.util.List;

import javax.ejb.Local;

import br.ufes.dwws.ufespay.core.linkeddata.Country;

@Local
public interface LinkedDataService extends Serializable{
	public List<Country> retriedAllCountries();
	public Country retrieveCountryInfo(String country);
}
