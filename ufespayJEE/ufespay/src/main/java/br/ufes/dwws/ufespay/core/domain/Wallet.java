package br.ufes.dwws.ufespay.core.domain;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import br.ufes.inf.nemo.jbutler.ejb.persistence.PersistentObjectSupport;

/** TODO: generated by FrameWeb. Should be documented. */
@Entity
public class Wallet extends PersistentObjectSupport implements Comparable<Wallet> {
	/** Serialization id. */
	private static final long serialVersionUID = 1L;

	/** TODO: generated by FrameWeb. Should be documented. false */
	@NotNull
	private BigDecimal balance;

	/** TODO: generated by FrameWeb. Should be documented. true */
	@NotNull
	@Temporal(TemporalType.TIMESTAMP)
	private Date created_at;

	@OneToMany(mappedBy = "wallet", cascade = CascadeType.ALL)
	//private List <Transaction>transactions = new ArrayList<Transaction>();
	private Set <Transaction>transactions = new HashSet<Transaction>();
	
	private User owner;
	
	public User getOwner() {
		return owner;
	}

	public void setOwner(User owner) {
		this.owner = owner;
	}

	
	/*
	public Set<Transaction> getTransactions() {
		return transactions;
	}

	public void setTransactions(Set<Transaction> transactions) {
		this.transactions = transactions;
	}*/

	public Set<Transaction> getTransactions() {
		return transactions;
	}

	public void setTransactions(Set<Transaction> transactions) {
		this.transactions = transactions;
	}

	/** Getter for balance. */
	public BigDecimal getBalance() {
		return balance;
	}

	/** Setter for balance. */
	public void setBalance(BigDecimal balance) {
		this.balance = balance;
	}

	/** Getter for created_at. */
	public Date getCreated_at() {
		return created_at;
	}

	/** Setter for created_at. */
	public void setCreated_at(Date created_at) {
		this.created_at = created_at;
	}
	
    @PrePersist
    public void setCreatedDate() {
    	this.setCreated_at( new Timestamp((new Date()).getTime()));
    }

	/** @see java.lang.Comparable#compareTo(java.lang.Object) */
	@Override
	public int compareTo(Wallet o) {
		// FIXME: auto-generated method stub
		return super.compareTo(o);
	}
}