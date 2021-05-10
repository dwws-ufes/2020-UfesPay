package br.ufes.dwws.ufespay.core.persistence;

import java.util.List;

import javax.ejb.Local;

import br.ufes.dwws.ufespay.core.domain.Comment;
import br.ufes.dwws.ufespay.core.domain.Transaction;
import br.ufes.inf.nemo.jbutler.ejb.persistence.BaseDAO;

/** TODO: generated by FrameWeb. Should be documented. */
@Local
public interface TransactionDAO extends BaseDAO<Transaction> {

	public Transaction update(Transaction transac);
	
	public List<Comment> retrieveAllComments(Long transacId);

}