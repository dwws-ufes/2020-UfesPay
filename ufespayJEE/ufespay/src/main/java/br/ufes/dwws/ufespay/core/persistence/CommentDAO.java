package br.ufes.dwws.ufespay.core.persistence;

import javax.ejb.Local;

import br.ufes.dwws.ufespay.core.domain.Comment;
import br.ufes.inf.nemo.jbutler.ejb.persistence.BaseDAO;

/** TODO: generated by FrameWeb. Should be documented. */
@Local
public interface CommentDAO extends BaseDAO<Comment> {

	/** TODO: generated by FrameWeb. Should be documented. */
	public Comment getById(Long id);

	/** TODO: generated by FrameWeb. Should be documented. */
	public void delete(Long id);


}