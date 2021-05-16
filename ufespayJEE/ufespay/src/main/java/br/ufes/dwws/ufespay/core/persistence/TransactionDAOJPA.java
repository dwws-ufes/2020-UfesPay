package br.ufes.dwws.ufespay.core.persistence;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import br.ufes.dwws.ufespay.core.domain.Comment;
import br.ufes.dwws.ufespay.core.domain.Transaction;
import br.ufes.dwws.ufespay.core.domain.User;
import br.ufes.inf.nemo.jbutler.ejb.persistence.BaseJPADAO;

/** TODO: generated by FrameWeb. Should be documented. */
@Stateless
public class TransactionDAOJPA extends BaseJPADAO<Transaction> implements TransactionDAO {
	/** Serialization id (using default value, change if necessary). */
	private static final long serialVersionUID = 1L;

	/** TODO: generated by FrameWeb. Should be documented. */
	@PersistenceContext
	private EntityManager entityManager;

	/** TODO: generated by FrameWeb. Should be documented. */
	@Override
	protected EntityManager getEntityManager() {
		return entityManager;
	}

	/** TODO: generated by FrameWeb. Should be documented. */
	@Override
	public Transaction update(Transaction transac) {
		Transaction transacUpdated = null;

		// entityManager.getTransaction().begin();
		transacUpdated = entityManager.merge(transac);
		// entityManager.getTransaction().commit();
		return transacUpdated;
	}

	public List<Comment> retrieveAllComments(Long transacId) {
		List<Comment> result = null;

		String query = "SELECT c from Comment c where c.transaction.id = :id";
		result = ((entityManager.createQuery(query, Comment.class)).setParameter("id", transacId)).getResultList();

		return result;
	}

	public List<Transaction> retrieveAllTransactions(String userEmail, boolean asEmitter) {
		List<Transaction> result = null;

		String query;

		if (asEmitter)
			query = "SELECT t from Transaction t where t.emitter.email = :userEmail";
		else
			query = "SELECT t from Transaction t where t.receiver.email = :userEmail";

		result = ((entityManager.createQuery(query, Transaction.class)).setParameter("userEmail", userEmail))
				.getResultList();

		return result;
	}
}