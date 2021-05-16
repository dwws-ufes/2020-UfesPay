const addContext = (json: object) => ({
  "@context": {
    Person: "http://xmlns.com/foaf/0.1/Person",
    name: "http://xmlns.com/foaf/0.1/name",
    email: "http://xmlns.com/foaf/0.1/OnlineChatAccount",
    country: "http://xmlns.com/foaf/0.1/based_near",
    knows: "http://xmlns.com/foaf/0.1/knows",
  },
  ...json,
}); 

export default addContext;