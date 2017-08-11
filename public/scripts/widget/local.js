

var local = {};

var storage;

var doc = document;

function serialize(value) {
	return JSON.stringify(value);
}

function deserialize(value) {

	if (typeof value != 'string') return undefined;

	return JSON.parse(value);
}

if ('localStorage' in window && window.localStorage) {

	storage = window.localStorage;

	local.set = function(key, val) {
		storage[key] = serialize(val);
	}
	local.get = function(key) {
		return deserialize(
			storage[key]);
	}
	local.remove = function(key) {
		delete storage[key];
	}
	local.clear = function() {
		storage.clear();
	}

} else {


	local.set = function(key, val) {

		if (window.name) {

			storage = deserialize(window.name);

		} else {

			storage = {};

		}

		storage[key] = val;

		window.name = serialize(storage);

	}
	local.get = function(key) {

		return deserialize(window.name)[key];

	}
	local.remove = function(key) {

		storage = deserialize(window.name);

		delete storage[key];

		window.name = serialize(storage);

	}
	local.clear = function() {

		window.name = '';

	}
}

module.exports = local;


