package br.ufes.dwws.ufespay.core.persistence;

import java.util.Collection;
import java.util.List;

import javax.ejb.Local;

import br.ufes.dwws.ufespay.core.domain.User;
import br.ufes.inf.nemo.jbutler.ejb.persistence.BaseDAO;

/** TODO: generated by FrameWeb. Should be documented. */
@Local
public interface UserDAO extends BaseDAO<User> {

	/** TODO: generated by FrameWeb. Should be documented. */
	public User getByEmail(String email);

	/** TODO: generated by FrameWeb. Should be documented. */
	public User update(User user);
	
	public List<User> getOthers(Long Id);

}