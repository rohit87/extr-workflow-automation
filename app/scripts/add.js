var Calculator = Calculator || {};

Calculator.add = function(){
	return Array.prototype.slice.call(arguments).reduce(function(a,b,c){
		a = parseInt(a) + parseInt(b);
		return a;
	});
};