package br.ufes.dwws.ufespay.core.application;

import java.math.BigDecimal;
import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.transaction.Transactional;

import br.ufes.dwws.ufespay.core.domain.Transaction;
import br.ufes.dwws.ufespay.core.domain.User;
import br.ufes.dwws.ufespay.core.persistence.TransactionDAO;
import br.ufes.dwws.ufespay.core.persistence.WalletDAO;

/** TODO: generated by FrameWeb. Should be documented. */
@Stateless
public class TransactionServiceBean implements TransactionService {
	/** Serialization id (using default value, change if necessary). */
	private static final long serialVersionUID = 1L;

	/** TODO: generated by FrameWeb. Should be documented. */
	@EJB
	private TransactionDAO transactionDAO;
	
	@EJB
	private WalletDAO walletDAO;
	
	public List<Transaction> readAllTranscations(){
		return this.transactionDAO.retrieveAll();
	}
	

	@Override
	@Transactional
	public Transaction createTranscation(User emitter, User receiver, BigDecimal value, String message) {
		BigDecimal emitterBalance = emitter.getWallet().getBalance();
		BigDecimal receiverBalance = receiver.getWallet().getBalance();

		if (emitterBalance.compareTo(value) < 0) {
			return null;
		} else {
			Transaction newTransaction = new Transaction();
			newTransaction.setValue(value);
			newTransaction.setEmitter(emitter);
			newTransaction.setReceiver(receiver);
			newTransaction.setWallet(emitter.getWallet());
			newTransaction.setMessage(message);

			emitterBalance = emitterBalance.subtract(value);
			emitter.getWallet().setBalance(emitterBalance);
			emitter.getWallet().getTransactions().add(newTransaction);

			receiverBalance = receiverBalance.add(value);
			receiver.getWallet().setBalance(receiverBalance);
			receiver.getWallet().getTransactions().add(newTransaction);

			//this.walletDAO.save(emitter.getWallet());
			//this.walletDAO.save(receiver.getWallet());
			this.transactionDAO.save(newTransaction);

			return newTransaction;
		}
	}

	public void createTranscation(Transaction transac) {
		transactionDAO.save(transac);
	}
	@Override
	public Transaction updateTranscation(Transaction transac) {
		return transactionDAO.update(transac);
	}

}