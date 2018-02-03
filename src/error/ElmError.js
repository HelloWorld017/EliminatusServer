class ElmError extends Error{
	constructor(message, tag) {
		super(message);
		this.elmtag = tag;
	}
}

module.exports = ElmError;
