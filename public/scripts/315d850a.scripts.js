"use strict";var app=angular.module("uiApp",["ngResource","ngMessages","ngCookies","ui.router","mgcrea.ngStrap","satellizer"]);app.run(["$rootScope",function(a){a.user={}}]),app.config(["$urlRouterProvider","$stateProvider","$httpProvider","$authProvider",function(a,b,c,d){a.otherwise("/home"),b.state("home",{url:"/home",templateUrl:"/views/home.html",resolve:{authenticated:["$q","$location","$auth",function(a,b,c){var d=a.defer();return c.isAuthenticated()?d.resolve():b.path("/signIn"),d.promise}]}}).state("signUp",{url:"/signUp",templateUrl:"/views/signUp.html"}).state("signIn",{url:"/signIn",templateUrl:"/views/signIn.html"}).state("signOut",{url:"/signOut",template:null,controller:"SignOutCtrl"}),c.interceptors.push(["$q","$injector",function(a,b){return{request:function(a){var c=b.get("$auth");c.isAuthenticated()&&(a.headers["X-Auth-Token"]=c.getToken());var d=b.get("$cookies"),e=d.get("PLAY_CSRF_TOKEN");return e&&(a.headers["Csrf-Token"]=e),a},responseError:function(c){if(401===c.status){var d=b.get("$auth");d.logout(),b.get("$state").go("signIn")}return a.reject(c)}}}]),d.httpInterceptor=!0,d.loginOnSignup=!0,d.loginRedirect="/home",d.logoutRedirect="/",d.signupRedirect="/home",d.loginUrl="/signIn",d.signupUrl="/signUp",d.loginRoute="/signIn",d.signupRoute="/signUp",d.tokenName="token",d.tokenPrefix="satellizer",d.authHeader="X-Auth-Token",d.platform="browser",d.storage="localStorage",d.facebook({clientId:"1503078423241610",url:"/authenticate/facebook",scope:"email",scopeDelimiter:",",requiredUrlParams:["display","scope"],display:"popup",type:"2.0",popupOptions:{width:481,height:269}}),d.google({clientId:"59871119325-klhe2p9b6h3451bc1fv1ie0lamdvot2m.apps.googleusercontent.com",url:"/authenticate/google",scope:["profile","email"],scopePrefix:"openid",scopeDelimiter:" ",requiredUrlParams:["scope"],optionalUrlParams:["display"],display:"popup",type:"2.0",popupOptions:{width:580,height:400}}),d.oauth2({clientId:"4782746",url:"/authenticate/vk",authorizationEndpoint:"http://oauth.vk.com/authorize",redirectUri:window.location.origin||window.location.protocol+"//"+window.location.host,name:"vk",scope:"email",scopeDelimiter:" ",requiredUrlParams:["display","scope"],display:"popup",popupOptions:{width:495,height:400}}),d.twitter({url:"/authenticate/twitter",type:"1.0",popupOptions:{width:495,height:645}}),d.oauth1({url:"/authenticate/xing",name:"xing",popupOptions:{width:495,height:500}})}]),app.controller("HomeCtrl",["$rootScope","$scope","$alert","UserFactory",function(a,b,c,d){b.init=function(){d.get().success(function(b){a.user=b}).error(function(a){c({content:a.message,animation:"fadeZoomFadeDown",type:"material",duration:3})})}}]),app.controller("SignUpCtrl",["$scope","$alert","$auth",function(a,b,c){a.submit=function(){c.signup({firstName:a.firstName,lastName:a.lastName,email:a.email,password:a.password}).then(function(){b({content:"You have successfully signed up",animation:"fadeZoomFadeDown",type:"material",duration:3})})["catch"](function(a){b({content:a.data.message,animation:"fadeZoomFadeDown",type:"material",duration:3})})}}]),app.controller("SignInCtrl",["$scope","$alert","$auth",function(a,b,c){a.submit=function(){c.setStorage(a.rememberMe?"localStorage":"sessionStorage"),c.login({email:a.email,password:a.password,rememberMe:a.rememberMe}).then(function(){b({content:"You have successfully signed in",animation:"fadeZoomFadeDown",type:"material",duration:3})})["catch"](function(a){console.log(a),b({content:a.data.message,animation:"fadeZoomFadeDown",type:"material",duration:3})})},a.authenticate=function(a){c.authenticate(a).then(function(){b({content:"You have successfully signed in",animation:"fadeZoomFadeDown",type:"material",duration:3})})["catch"](function(a){b({content:a.data.message,animation:"fadeZoomFadeDown",type:"material",duration:3})})}}]),app.controller("SignOutCtrl",["$auth","$alert",function(a,b){a.isAuthenticated()&&a.logout().then(function(){b({content:"You have been logged out",animation:"fadeZoomFadeDown",type:"material",duration:3})})}]),app.controller("NavigationCtrl",["$scope","$auth",function(a,b){a.isAuthenticated=function(){return b.isAuthenticated()}}]),app.factory("UserFactory",["$http",function(a){return{get:function(){return a.get("/user")}}}]);