/*! extr-workflow-automation - v1.0.0 - 2014-12-30
* https://github.com/rohit87/extr-workflow-automation
* Copyright (c) 2014 Rohit Garg; Licensed  */
var Calculator = Calculator || {};

Calculator.add = function(){
	return Array.prototype.slice.call(arguments).reduce(function(a,b,c){
		a = parseInt(a) + parseInt(b);
		return a;
	});
};
var ngCalculatorApp = angular.module('calculator', [
	'ngRoute'
]);

ngCalculatorApp.config(function($routeProvider){
	$routeProvider
		.when('/', {
		  templateUrl: 'app/views/calculator.html',
		  controller: 'CalculatorController'
		})
	;
});
ngCalculatorApp.controller('CalculatorController', function($scope){
	$scope.Calculator = Calculator;
});
var Calculator = Calculator || {};

Calculator.subtract = function(a, b){
	return this.add(a, -b);
};