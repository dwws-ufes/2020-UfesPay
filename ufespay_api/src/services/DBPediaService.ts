import axios from 'axios';

const dbpedia = axios.create({ baseURL: 'http://dbpedia.org/' });

export const getByQuery = async (country: string) => {
  const params = {
    query: `
      PREFIX xsd: <http://dbpedia.org/class/yago/WikicatMemberStatesOfTheUnitedNations>
      PREFIX ctr: <http://dbpedia.org/resource/${country}>

      SELECT ?Language ?Currency ?Country
      
      WHERE {
        ?Country rdf:type xsd: ;
        dbo:currencyCode ?Currency ;
        dbp:languages ?Language .
        FILTER(?Country = ctr:)
      }
    `,
    format: 'json'
  }

  return dbpedia.get('/sparql', { params })
    .then(resp => resp.data.results.bindings[0]);
};