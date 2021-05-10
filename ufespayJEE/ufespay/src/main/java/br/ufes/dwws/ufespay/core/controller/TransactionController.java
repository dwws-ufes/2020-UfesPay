package br.ufes.dwws.ufespay.core.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.enterprise.context.SessionScoped;
import javax.faces.application.FacesMessage;
import javax.inject.Inject;
import javax.inject.Named;

import br.ufes.dwws.ufespay.core.application.CommentService;
import br.ufes.dwws.ufespay.core.application.TransactionService;
import br.ufes.dwws.ufespay.core.application.UserService;
import br.ufes.dwws.ufespay.core.domain.Comment;
import br.ufes.dwws.ufespay.core.domain.Transaction;
import br.ufes.dwws.ufespay.core.domain.User;
import br.ufes.dwws.ufespay.core.util.Utils;
import br.ufes.inf.nemo.jbutler.ejb.controller.JSFController;

/** TODO: generated by FrameWeb. Should be documented. */
//@Model
@SessionScoped
@Named
public class TransactionController extends JSFController {
	/** Serialization id (using default value, change if necessary). */
	private static final long serialVersionUID = 1L;

	/** TODO: generated by FrameWeb. Should be documented. */
	@EJB
	private TransactionService transactionService;

	@EJB
	private UserService userService;

	@Inject
	private LoginUserController loginUserController;

	@EJB
	private CommentService commentService;

	private Transaction selectedTransaction = new Transaction();

	private List<Transaction> transactions;

	private List<User> availabeReceivers;

	private User selectedEmiter;

	private Comment newComment;

	@PostConstruct
	public void retriedAllTransactions() {
		this.transactions = transactionService.readAllTranscations();
	}

	public void toggleLike() throws IOException {
		User currentUser = this.loginUserController.getCurrentUser();
		if (this.selectedTransaction.isLikedByUser(currentUser)) {
			this.selectedTransaction = this.transactionService.disLikeTransaction(currentUser, selectedTransaction);
		} else {
			this.selectedTransaction = this.transactionService.likeTransaction(currentUser, selectedTransaction);
		}
		Utils.redirectsToUrl("/ufespay/core/transactionManage/index.xhtml");
	}

	public void openNewTransaction() throws IOException {
		this.selectedTransaction = new Transaction();
		this.selectedTransaction.setMessage("Write something to receiver");
		this.selectedTransaction.setValue(BigDecimal.valueOf(0, 0));
		this.selectedTransaction.setEmitter(loginUserController.getCurrentUser());
		this.selectedTransaction.setWallet(loginUserController.getCurrentUser().getWallet());
		this.availabeReceivers = this.userService.getOthers(this.selectedTransaction.getEmitter().getId());
		Utils.redirectsToUrl("/ufespay/core/transactionCreate/index.xhtml");
	}

	public void prepareUpdateTransac() throws IOException {
		this.newComment = new Comment();
		this.newComment.setAuthor(loginUserController.getCurrentUser());
		this.newComment.setTransaction(selectedTransaction);
		this.newComment.setText("Write a new comment");
		this.selectedTransaction.getComments().clear();
		this.selectedTransaction.getComments()
				.addAll(this.transactionService.retrieveAllComments(this.selectedTransaction.getId()));
		Utils.redirectsToUrl("/ufespay/core/transactionManage/index.xhtml");
	}

	public void addCommentTransac() throws IOException {

		this.newComment = this.commentService.createComment(this.selectedTransaction, this.newComment.getAuthor(),
				this.newComment.getText());

		if (this.newComment != null) {
			Utils.showMessage("Comment added", "Comment added successfully", FacesMessage.SEVERITY_INFO);
			this.prepareUpdateTransac();

		} else {
			Utils.showMessage("unknown error", "could not create comment", FacesMessage.SEVERITY_ERROR);
			this.prepareUpdateTransac();
		}
	}

	/** TODO: generated by FrameWeb. Should be documented. */
	public void createTransaction() throws IOException {
		// add new newTransaction

		User emitterUser = this.userService.getUserById(loginUserController.getCurrentUser().getId());
		User receiverUser = this.userService.getUserById(this.selectedEmiter.getId());

		if ((emitterUser == null) || (receiverUser == null)) {
			Utils.showMessageRedirec("User not found", "Emitter or Receiver users not found",
					"/ufespay/core/transactionCreate/index.xhtml", FacesMessage.SEVERITY_ERROR);
		} else {
			BigDecimal emitterBalance = emitterUser.getWallet().getBalance();

			if (emitterBalance.compareTo(this.selectedTransaction.getValue()) < 0) {
				Utils.showMessageRedirec("insufficient wallet balance", "Emitter does not have enough balance",
						"/ufespay/core/transactionCreate/index.xhtml", FacesMessage.SEVERITY_WARN);
			} else {
				Transaction newTransac = transactionService.createTranscation(emitterUser, receiverUser,
						this.selectedTransaction.getValue(), this.selectedTransaction.getMessage());
				if (newTransac == null) {
					Utils.showMessageRedirec("unknown error", "could not create transaction",
							"/ufespay/core/transactionCreate/index.xhtml", FacesMessage.SEVERITY_ERROR);
				} else {
					Utils.showMessageRedirec("Transaction created successfully", "Transaction created successfully",
							"/ufespay/core/index.xhtml", FacesMessage.SEVERITY_INFO);
				}
			}
		}
	}

	public void redirectsHome() throws IOException {
		Utils.redirectsToUrl("/ufespay/core/index.xhtml");
	}

	public Transaction getSelectedTransaction() {
		return selectedTransaction;
	}

	public void setSelectedTransaction(Transaction selectedTransaction) {
		this.selectedTransaction = selectedTransaction;
	}

	public List<Transaction> getTransactions() {
		return transactions;
	}

	public void setTransactions(List<Transaction> transactions) {
		this.transactions = transactions;
	}

	public List<User> getAvailabeReceivers() {
		return availabeReceivers;
	}

	public void setAvailabeReceivers(List<User> availabeReceivers) {
		this.availabeReceivers = availabeReceivers;
	}

	public User getSelectedEmiter() {
		return selectedEmiter;
	}

	public void setSelectedEmiter(User selectedEmiter) {
		this.selectedEmiter = selectedEmiter;
	}

	public Comment getNewComment() {
		return newComment;
	}

	public void setNewComment(Comment newComment) {
		this.newComment = newComment;
	}

}