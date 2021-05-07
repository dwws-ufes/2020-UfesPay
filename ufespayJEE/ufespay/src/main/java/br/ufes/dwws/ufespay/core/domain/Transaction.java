package br.ufes.dwws.ufespay.core.domain;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import br.ufes.inf.nemo.jbutler.ejb.persistence.PersistentObjectSupport;

/** TODO: generated by FrameWeb. Should be documented. */
@Entity
public class Transaction extends PersistentObjectSupport implements Comparable<Transaction> {
	/** Serialization id. */
	private static final long serialVersionUID = 1L;

	/** TODO: generated by FrameWeb. Should be documented. false */
	@NotNull
	private String message;

	/** TODO: generated by FrameWeb. Should be documented. false */
	@NotNull
	private BigDecimal value;

	/** TODO: generated by FrameWeb. Should be documented. true */
	@NotNull
	@Temporal(TemporalType.TIMESTAMP)
	private Date created_at;

	/** TODO: generated by FrameWeb. Should be documented. false */
	@ManyToMany
	@JoinTable(name = "transaction_likes_user", joinColumns = {
				@JoinColumn(name = "transactionId", referencedColumnName = "id") },
					inverseJoinColumns = {
				@JoinColumn(name = "userId", referencedColumnName = "id") })
	//private List<User> likes = new ArrayList<User>();
	private Set<User> likes  = new HashSet<User>();

	/** TODO: generated by FrameWeb. Should be documented. */
	@ManyToOne
	private Wallet wallet;

	/** TODO: generated by FrameWeb. Should be documented. */
	@OneToOne(
			fetch = FetchType.EAGER)
	@JoinColumn(name = "emitterId", referencedColumnName = "id")
	private User emitter;

	/** TODO: generated by FrameWeb. Should be documented. */
	@OneToOne(
			fetch = FetchType.EAGER)
	@JoinColumn(name = "receiverId", referencedColumnName = "id")
	private User receiver;

	@OneToMany(mappedBy = "transaction", cascade = CascadeType.ALL)
	//private List<Comment> comments = new ArrayList<Comment>();
	private Set<Comment> comments = new HashSet<Comment>();


	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public BigDecimal getValue() {
		return value;
	}

	public void setValue(BigDecimal value) {
		this.value = value;
	}

	public Set<User> getLikes() {
		return likes;
	}

	public void setLikes(Set<User> likes) {
		this.likes = likes;
	}

	public Wallet getWallet() {
		return wallet;
	}

	public void setWallet(Wallet wallet) {
		this.wallet = wallet;
	}

	public User getEmitter() {
		return emitter;
	}

	public void setEmitter(User emitter) {
		this.emitter = emitter;
	}

	public User getReceiver() {
		return receiver;
	}

	public void setReceiver(User receiver) {
		this.receiver = receiver;
	}
	
    @PrePersist
    public void setCreatedDate() {
    	this.setCreated_at( new Timestamp((new Date()).getTime()));
    }

	public Set<Comment> getComments() {
		return comments;
	}

	public void setComments(Set<Comment> comments) {
		this.comments = comments;
	}

	/** Getter for created_at. */
	public Date getCreated_at() {
		return created_at;
	}

	/** Setter for created_at. */
	public void setCreated_at(Date created_at) {
		this.created_at = created_at;
	}

	/** @see java.lang.Comparable#compareTo(java.lang.Object) */
	@Override
	public int compareTo(Transaction o) {
		// FIXME: auto-generated method stub
		return super.compareTo(o);
	}
	
	public boolean isLikedByUser(User user) {
		if (this.likes == null) {
			return false;
		}
		else {
			return this.likes.contains(user);
		}
	}
	
	public boolean equals​(Object obj) {
		if((obj instanceof Transaction)&&(obj!=null)){
			return ((Transaction)obj).getUuid().equals(this.getUuid());
		}else {
			return false;
		}		
	}

}