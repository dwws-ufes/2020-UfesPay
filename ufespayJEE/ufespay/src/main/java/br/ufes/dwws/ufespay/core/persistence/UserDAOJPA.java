package br.ufes.dwws.ufespay.core.persistence;

import java.util.Collection;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;

import br.ufes.dwws.ufespay.core.domain.User;
import br.ufes.inf.nemo.jbutler.ejb.persistence.BaseJPADAO;

/** TODO: generated by FrameWeb. Should be documented. */
@Stateless
public class UserDAOJPA extends BaseJPADAO<User> implements UserDAO {
	/** Serialization id (using default value, change if necessary). */
	private static final long serialVersionUID = 1L;

	/** The logger. */
	private static final Logger logger = Logger.getLogger(UserDAOJPA.class.getCanonicalName());

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
	public User getByEmail(String email) {
		User result = null;
		try {
			logger.log(Level.INFO, "retrieving user with e-mail  \"{0}\"...", email);
			String query = "SELECT u from User u where u.email = :email";
			result = ((entityManager.createQuery(query, User.class)).setParameter("email", email)).getSingleResult();

		} catch (NoResultException e) {
			// if no entity found
			logger.log(Level.WARNING, "no user with e-mail found \"{0}\"...", email);
			return null;
		}

		return result;
	}

	public List<User> getOthers(Long Id) {
		List<User> result = null;
			
		logger.log(Level.INFO, "retrieving all users ID diffeent   \"{0}\"...", Id);
		String query = "SELECT u from User u where u.id != :id";
		result = ((entityManager.createQuery(query, User.class)).setParameter("id", Id)).getResultList();

		return result;
	}

	/** TODO: generated by FrameWeb. Should be documented. */
	@Override
	public User update(User user) {
		User userUpdated = null;

		// entityManager.getTransaction().begin();
		userUpdated = entityManager.merge(user);
		// entityManager.getTransaction().commit();
		return userUpdated;
	}

}