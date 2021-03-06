package br.ufes.informatica.ufespay.core.domain;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import br.ufes.inf.nemo.jbutler.ejb.persistence.PersistentObjectSupport;

/** TODO: generated by FrameWeb. Should be documented. */
@Entity
public class Transactions extends PersistentObjectSupport implements Comparable<Transactions> {
	/** Serialization id. */
	private static final long serialVersionUID = 1L;

	/** TODO: generated by FrameWeb. Should be documented. false */
	@NotNull
	private User emitter;

	/** TODO: generated by FrameWeb. Should be documented. false */
	@NotNull
	private User receiver;

	/** TODO: generated by FrameWeb. Should be documented. false */

	private String message;

	/** TODO: generated by FrameWeb. Should be documented. false */

	private User likes;

	/** TODO: generated by FrameWeb. Should be documented. false */
	@NotNull
	public int id;

	/** TODO: generated by FrameWeb. Should be documented. */
	@ManyToOne
	private Wallet Source;

	/** TODO: generated by FrameWeb. Should be documented. */
	@OneToMany(mappedBy = "Source")
	private Set<Comment> Target;

	/** Getter for emitter. */
	public User getEmitter() {
		return emitter;
	}

	/** Setter for emitter. */
	public void setEmitter(User emitter) {
		this.emitter = emitter;
	}

	/** Getter for receiver. */
	public User getReceiver() {
		return receiver;
	}

	/** Setter for receiver. */
	public void setReceiver(User receiver) {
		this.receiver = receiver;
	}

	/** Getter for message. */
	public String getMessage() {
		return message;
	}

	/** Setter for message. */
	public void setMessage(String message) {
		this.message = message;
	}

	/** Getter for likes. */
	public User getLikes() {
		return likes;
	}

	/** Setter for likes. */
	public void setLikes(User likes) {
		this.likes = likes;
	}

	/** Getter for id. */
	public int getId() {
		return id;
	}

	/** Setter for id. */
	public void setId(int id) {
		this.id = id;
	}

	/** Getter for Source. */
	public Wallet getSource() {
		return Source;
	}

	/** Setter for Source. */
	public void setSource(Wallet Source) {
		this.Source = Source;
	}

	/** Getter for Target. */
	public Set<Comment> getTarget() {
		return Target;
	}

	/** Setter for Target. */
	public void setTarget(Set<Comment> Target) {
		this.Target = Target;
	}

	/** @see java.lang.Comparable#compareTo(java.lang.Object) */
	@Override
	public int compareTo(Transactions o) {
		// FIXME: auto-generated method stub
		return super.compareTo(o);
	}
}