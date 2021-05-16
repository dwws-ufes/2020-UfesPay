package br.ufes.dwws.ufespay.core.linkeddata;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.List;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.jena.datatypes.xsd.XSDDatatype;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.rdf.model.Property;
import org.apache.jena.rdf.model.Resource;
import org.apache.jena.rdf.model.ResourceFactory;
import org.apache.jena.vocabulary.RDF;
import org.apache.jena.vocabulary.RDFS;

import com.github.jsonldjava.shaded.com.google.common.base.Strings;

import br.ufes.dwws.ufespay.core.application.TransactionService;
import br.ufes.dwws.ufespay.core.domain.Transaction;

/**
 * Servlet implementation class ListTransactionServlet
 */
@WebServlet("/data/transactions")
public class ListTransactionServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private static final DateFormat df = new SimpleDateFormat("yyyy-MMdd'T'HH:mm:ss");

	@EJB
	private TransactionService transactionService;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public ListTransactionServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	private Model reatrieveAlltransactionsSimple(List<Transaction> allTransactions) {
		Model model = ModelFactory.createDefaultModel();
		String myNS = "http://localhost:8080/ufespay/vocab/transactionsSimple.owl#";

		model.setNsPrefix("transac", myNS);

		Resource myTransacResourse = ResourceFactory.createResource(myNS + "Transaction");

		Property myTransacEmitterEmail = ResourceFactory.createProperty(myNS + "emitterEmail");
		Property myTransacReceiverEmail = ResourceFactory.createProperty(myNS + "receiverEmail");
		Property myTransacMessage = ResourceFactory.createProperty(myNS + "message");
		Property myTransacValue = ResourceFactory.createProperty(myNS + "value");
		Property myTransaCreated = ResourceFactory.createProperty(myNS + "created_at");

		/*
		 * emitterEmail receiverEmail created_at message value
		 */
		for (Transaction transac : allTransactions) {
			model.createResource(myNS + transac.getId()).addProperty(RDF.type, myTransacResourse)
					.addLiteral(myTransacValue, transac.getValue().floatValue())
					.addLiteral(myTransacEmitterEmail, transac.getEmitter().getEmail())
					.addLiteral(myTransacReceiverEmail, transac.getReceiver().getEmail())
					.addLiteral(myTransacMessage, transac.getMessage()).addLiteral(myTransaCreated, ResourceFactory
							.createTypedLiteral(df.format(transac.getCreated_at()), XSDDatatype.XSDdateTime));
		}

		return model;
	}

	private Model reatrieveAlltransactionsFOAF(List<Transaction> allTransactions) {
		Model model = ModelFactory.createDefaultModel();
		String myNS = "http://localhost:8080/ufespay/vocab/transactions/";
		String foafNS = "http://xmlns.com/foaf/0.1/";

		model.setNsPrefix("transac", myNS);

		Resource myFOAfPersonResourse = ResourceFactory.createResource(foafNS + "Person");
		Resource myTransacResourseRoot = ResourceFactory.createResource(myNS + "Transaction");

		Property myTransacMessage = ResourceFactory.createProperty(myNS + "message");
		Property myTransacValue = ResourceFactory.createProperty(myNS + "value");
		Property myTransaCreated = ResourceFactory.createProperty(myNS + "created_at");

		for (Transaction transac : allTransactions) {

			Property foafEmailProp = ResourceFactory.createProperty(foafNS + "mbox");
			Property foafNameProp = ResourceFactory.createProperty(foafNS + "name");

			Property myTransacEmitterEmail = ResourceFactory
					.createProperty(myNS + transac.getEmitter().getId().toString());
			// Property myTransacReceiverEmail = ResourceFactory.createProperty(myNS +
			// transac.getReceiver().getId().toString());
			Resource root = model.createResource(myNS + transac.getId());
			root.addProperty(RDF.type, myTransacResourseRoot);
			root.addLiteral(myTransacValue, transac.getValue().floatValue());
			root.addLiteral(myTransacMessage, transac.getMessage());
			root.addLiteral(myTransacMessage, transac.getMessage());
			root.addLiteral(myTransaCreated,
					ResourceFactory.createTypedLiteral(df.format(transac.getCreated_at()), XSDDatatype.XSDdateTime));

		}

		return model;
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/xml");
		List<Transaction> allTransactions;
		Model model = null;

		String emitterEmail = request.getParameter("emitterEmail");
		String receiverEmail = request.getParameter("receiverEmail");

		if ((Strings.isNullOrEmpty(emitterEmail)) && (Strings.isNullOrEmpty(receiverEmail))) {
			allTransactions = this.transactionService.readAllTranscations();
			model = reatrieveAlltransactionsSimple(allTransactions);
		} else if ((Strings.isNullOrEmpty(emitterEmail))&&(!Strings.isNullOrEmpty(receiverEmail))) {
			//retrieve all transactions with receiverEmail
			allTransactions = this.transactionService.retrieveAllTransactions(receiverEmail, false);
			model = reatrieveAlltransactionsSimple(allTransactions);
		}else if (!(Strings.isNullOrEmpty(emitterEmail))&&(Strings.isNullOrEmpty(receiverEmail))) {
			//retrieve all transactions with emitterEmail
			allTransactions = this.transactionService.retrieveAllTransactions(emitterEmail, true);
			model = reatrieveAlltransactionsSimple(allTransactions);
		}else {
			throw new ServletException("Invalid parameters");
		}

		try (PrintWriter out = response.getWriter()) {
			if (model!=null)
				model.write(out, "RDF/XML");
		} catch (Exception e) {
			System.out.print(e.getMessage());
			e.printStackTrace();
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
