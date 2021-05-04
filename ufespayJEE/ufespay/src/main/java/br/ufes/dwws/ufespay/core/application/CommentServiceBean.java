package br.ufes.dwws.ufespay.core.application;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import br.ufes.dwws.ufespay.core.domain.Comment;
import br.ufes.dwws.ufespay.core.persistence.CommentDAO;

/** TODO: generated by FrameWeb. Should be documented. */
@Stateless
public class CommentServiceBean implements CommentService {
	/** Serialization id (using default value, change if necessary). */
	private static final long serialVersionUID = 1L;

	/** TODO: generated by FrameWeb. Should be documented. */
	@EJB
	private CommentDAO commentDAO;

	public void createComment(Comment newComment) {
		this.commentDAO.save(newComment);
	}

	public void getCommentById(Long id) {
		this.commentDAO.getById(id);
	}

	@Override
	public void deleteComment(Long id) {
		this.commentDAO.delete(id);
	}

}