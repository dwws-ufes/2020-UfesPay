package br.ufes.informatica.ufespay.core.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import br.ufes.inf.nemo.jbutler.ejb.persistence.PersistentObjectSupport;

/** TODO: generated by FrameWeb. Should be documented. */
@Entity
public class User extends PersistentObjectSupport implements Comparable<User> {
	/** Serialization id. */
	private static final long serialVersionUID = 1L;

	/** TODO: generated by FrameWeb. Should be documented. false */
	@NotNull
	private String name;

	/** TODO: generated by FrameWeb. Should be documented. false */
	@NotNull
	private String email;

	/** TODO: generated by FrameWeb. Should be documented. false */
	@NotNull
	private String password;

	/** TODO: generated by FrameWeb. Should be documented. true */
	@NotNull
	@Temporal(TemporalType.TIMESTAMP)
	public Date created_at;

	/** TODO: generated by FrameWeb. Should be documented. true */
	@Temporal(TemporalType.TIMESTAMP)
	public Date updated_at;

	/** TODO: generated by FrameWeb. Should be documented. true */
	@NotNull
	@Temporal(TemporalType.TIMESTAMP)
	public Date deleted_at;

	/** TODO: generated by FrameWeb. Should be documented. false */
	@NotNull
	public int id;

	/** TODO: generated by FrameWeb. Should be documented. */
	@OneToOne
	private Wallet Target;

	/** Getter for name. */
	public String getName() {
		return name;
	}

	/** Setter for name. */
	public void setName(String name) {
		this.name = name;
	}

	/** Getter for email. */
	public String getEmail() {
		return email;
	}

	/** Setter for email. */
	public void setEmail(String email) {
		this.email = email;
	}

	/** Getter for password. */
	public String getPassword() {
		return password;
	}

	/** Setter for password. */
	public void setPassword(String password) {
		this.password = password;
	}

	/** Getter for created_at. */
	public Date getCreated_at() {
		return created_at;
	}

	/** Setter for created_at. */
	public void setCreated_at(Date created_at) {
		this.created_at = created_at;
	}

	/** Getter for updated_at. */
	public Date getUpdated_at() {
		return updated_at;
	}

	/** Setter for updated_at. */
	public void setUpdated_at(Date updated_at) {
		this.updated_at = updated_at;
	}

	/** Getter for deleted_at. */
	public Date getDeleted_at() {
		return deleted_at;
	}

	/** Setter for deleted_at. */
	public void setDeleted_at(Date deleted_at) {
		this.deleted_at = deleted_at;
	}

	/** Getter for id. */
	public int getId() {
		return id;
	}

	/** Setter for id. */
	public void setId(int id) {
		this.id = id;
	}

	/** Getter for Target. */
	public Wallet getTarget() {
		return Target;
	}

	/** Setter for Target. */
	public void setTarget(Wallet Target) {
		this.Target = Target;
	}

	/** @see java.lang.Comparable#compareTo(java.lang.Object) */
	@Override
	public int compareTo(User o) {
		// FIXME: auto-generated method stub
		return super.compareTo(o);
	}
}