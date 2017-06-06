(function(){

	angular.module("blog",[])
		.controller('mainControl', ['$http', function($http){
			
			var self = this;

			self.tab = 1;
			self.posts = {};
			self.users = {};
			self.curUser = "";

			self.setTab = function(sel_tab){
				self.tab = sel_tab;
			}
			
			self.isActive = function(cur_tab){
				if(cur_tab==self.tab){
					return true;
				}
			}

			self.setAllPosts = function(){
				self.setTab(1);
				self.showName = false;
				$http.get("https://jsonplaceholder.typicode.com/posts").then(
				function(response){
					self.posts = response.data;
				});
			}

			self.setAllUsers = function(){
				self.setTab(2);
				$http.get("https://jsonplaceholder.typicode.com/users").then(
					function(response){
						self.users = response.data;
					});
			}

			self.setAllUsers();
			self.setAllPosts();

			self.userShow = function(id){
				$http.get("https://jsonplaceholder.typicode.com/users?id=" + id).then(
					function(response){
						self.users = response.data;
					});
				self.setTab(2);
			}

			self.userPosts = function(u_id){
				self.tab = 1;
				self.showName = true;

				$http.get("https://jsonplaceholder.typicode.com/users?id=" + u_id).then(
					function(response){
						var cur_user = response.data;
						self.curUser = cur_user[0].name;
					});
			
				$http.get("https://jsonplaceholder.typicode.com/posts?userId=" + u_id).then(
					function(response){
						self.posts = response.data;
				});
			}


		}])
		.controller('userControl',['$http', function($http){

			var self = this;
			self.showMore = false;

			self.more = function(){
				self.showMore = true;
			}

			self.hide = function(){
				self.showMore = false;
			}

		}])
		.controller('postControl',['$http', function($http){

			var self = this;

			self.showComments = false;
			self.postComments = function(id){
					console.log("clicked");

					self.showComments = true;

					$http.get("https://jsonplaceholder.typicode.com/comments?postId=" + id).then(
					function(response){
						self.comments = response.data;
					});
				}

			self.hideComments = function(){
				self.showComments = false;
			}
		
		}]);

}) ();