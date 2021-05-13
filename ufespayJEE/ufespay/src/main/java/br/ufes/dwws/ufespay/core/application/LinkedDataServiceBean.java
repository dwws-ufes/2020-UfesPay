package br.ufes.dwws.ufespay.core.application;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.ejb.Stateless;

import org.apache.commons.lang3.StringUtils;
import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.QueryExecutionFactory;
import org.apache.jena.query.QuerySolution;
import org.apache.jena.query.ResultSet;
import org.apache.jena.rdf.model.RDFNode;

import br.ufes.dwws.ufespay.core.linkeddata.Country;

@Stateless
public class LinkedDataServiceBean implements LinkedDataService {
	
	private Map<String, String> generateCountryCodes() {
		Map<String, String> countries = new HashMap<>();
		for (String iso : Locale.getISOCountries()) {
			// Locale l = new Locale("en", iso);
			// countries.put(l.getDisplayCountry(), iso);
			// countries.put(new Locale("en", iso).getDisplayCountry(new Locale("en", iso)),
			// new Locale(Locale.getDefault().getLanguage(), iso).getDisplayCountry());
			countries.put(iso, new Locale("en", iso).getDisplayCountry(new Locale("en", iso)));
			// English/ portuguese
		}
		return countries;
	}

	private void evaluateResult(RDFNode result) {
		if (result.isLiteral()) {
			System.out.println("isLiteral");
		} else if (result.isAnon()) {
			System.out.println("isAnon");
		} else if (result.isStmtResource()) {
			System.out.println("isStmtResource");
		} else if (result.isURIResource()) {
			System.out.println("isURIResource");
		}
	}

	public List<Country> retriedAllCountries() {
		List<Country> availableCountries = new ArrayList<Country>();
		String sparql = "PREFIX  rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\r\n"
				+ "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\r\n" + "SELECT ?countryUri ?countryName\r\n"
				+ "WHERE {   \r\n"
				+ "   ?countryUri rdf:type  <http://dbpedia.org/class/yago/WikicatMemberStatesOfTheUnitedNations> .\r\n"
				+ "    ?countryUri  rdfs:label ?countryName .\r\n"
				+ "FILTER (langMatches(lang(?countryName), 'EN'))\r\n" + "}\r\n" + "ORDER BY ?countryName";

		QueryExecution queryExecution = QueryExecutionFactory.sparqlService("https://dbpedia.org/sparql", sparql);
		ResultSet results = queryExecution.execSelect();
		int i = 0;
		while (results.hasNext()) {
			QuerySolution querySolution = results.next();

			Country newCountry = new Country();
			newCountry.setId(Long.valueOf(i));
			i++;
			newCountry.setUri(querySolution.get("countryUri").asResource().getURI());
			newCountry.setName(StringUtils.substringBefore(querySolution.getLiteral("countryName").toString(), "@"));

			availableCountries.add(newCountry);
		}
		return availableCountries;

	}

	public Country retrieveCountryInfo(String country) {
		Country retrivedCountry = new Country();
		String sparql = "PREFIX  rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\r\n"
				+ "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\r\n"
				+ "PREFIX  dbo: <http://dbpedia.org/ontology/>\r\n" + "PREFIX  dbp: <http://dbpedia.org/property/>\r\n"
				+ "SELECT ?countryUri ?countryName ?countryCurrencyUri ?currencyLabel ?symbol \r\n" + "WHERE {\r\n"
				+ "  ?countryUri rdf:type  <http://dbpedia.org/class/yago/WikicatMemberStatesOfTheUnitedNations> .\r\n"
				+ "   ?countryUri dbo:currency   ?countryCurrencyUri . \r\n"
				+ "  ?countryCurrencyUri rdfs:label ?currencyLabel .\r\n"
				+ "  ?countryUri  dbo:currencyCode ?currencyCode .\r\n"
				+ "   ?countryCurrencyUri dbp:symbol ?symbol.\r\n" + "  ?countryUri  rdfs:label ?countryName.\r\n"
				+ "FILTER ( LANG ( ?countryName ) = 'en' )\r\n" + "FILTER ( LANG ( ?currencyLabel  ) = 'en' )\r\n"
				+ "FILTER CONTAINS ( ?countryName, '" + country + "') \r\n" + "}";
		QueryExecution queryExecution = QueryExecutionFactory.sparqlService("https://dbpedia.org/sparql", sparql);
		ResultSet results = queryExecution.execSelect();
		if (results.hasNext()) {
			QuerySolution querySolution = results.next();
			retrivedCountry
					.setName(StringUtils.substringBefore(querySolution.getLiteral("countryName").toString(), "@"));
			retrivedCountry.setUri(querySolution.get("countryUri").asResource().getURI());
			retrivedCountry.setCurrencyUri(querySolution.get("countryCurrencyUri").asResource().getURI());
			retrivedCountry.setCurrencyLabel(
					StringUtils.substringBefore(querySolution.getLiteral("currencyLabel").toString(), "@"));
			retrivedCountry
					.setCurrencySymbol(StringUtils.substringBefore(querySolution.getLiteral("symbol").toString(), "@"));
		}
		return retrivedCountry;
	}
}
