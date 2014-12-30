/**
* Calculator Module
*
* Description
*/
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