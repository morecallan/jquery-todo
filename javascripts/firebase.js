var FbAPI =  (() => {
	let todos = [];

	return {
		todoGetter : () => {
			return todos;
		}
	};
})();