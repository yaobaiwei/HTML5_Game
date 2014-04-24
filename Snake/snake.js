$(document).ready(function(){

  var SnakebodyNode=function(x,y,w,h){
     this.x=x;
     this.y=y;
     this.w=w;
     this.h=h;
     this.equals=function(node){
        if(this.x==node.x&&this.y==node.y)
            return true;
        else return false;     	
     	}	
  	};
  	function Snake(x,y,speed,initNodes,farm){
  		var self=this;
  		this.perform=null;
  		this.speed=speed;
  		this.point=0;
  		this.num=0;
  		this.speedParam=speed*initNodes;
  		this.nodeSize=10;
  		this.nodes=[];
  		this.stones=[];
  		this.stonesnum=5;
  		this.initNodes=initNodes;
  		this.farm=farm;
  		this.x=x;
  		this.y=y;
  		this.direction=10;
  		this.left=-10;this.right=10;
  		this.down=1;this.up=-1;
  		document.onkeypress=function(event){
  			event=event||window.event;
  			var code=event.keyCode||event.charCode();
  			switch(code){
  			      case 37: //按了键盘的左键
  			        if(self.direction+self.left){
                       self.direction=self.left; 			        	
  			        	}
  			        break;  	
  			      case 38: //按了键盘的上键
  			        if(self.direction+self.up){
                       self.direction=self.up; 			        	
  			        	}
  			        break; 
  			      case 39: //按了键盘的右键
  			        if(self.direction+self.right){
                       self.direction=self.right; 			        	
  			        	}
  			        break; 
  			      case 40: //按了键盘的下键
  			        if(self.direction+self.down){
                       self.direction=self.down; 			        	
  			        	}
  			        break; 
  			      case 13:
  			        self.num+=1;
  			        if(self.num%2==1)
  			            self.pause();
  			        else
  			            self.continueRun();
  			        break;
  			        			
  				}	
  		}
  	};
  	  Snake.prototype={
  		   init:function(){
  		   	  var self=this;
  		   	  var farm=this.farm;
  		   	  var x=this.x;
  		   	  var y=this.y;
  		   	  this.nodes=[];
  		   	  this.stones=[];
  		   	  for(var i=0;i<this.initNodes;i++){
                  this.nodes[i]=new SnakebodyNode(this.x-i*10,this.y,this.nodeSize,this.nodeSize);  		   	  	
  		   	  	}
  		   	  for(var i=0;i<this.stonesnum;i++){
  		   	  	   this.stones[i]=this.farm.newStones(this);
  		   	  	}
  		   	  	this.farm.food=this.farm.newFood(this);
  		   	  	this.farm.repaint(this);
  		   	},
  		   	drawNodes:function(context){
  		   		 var self=this;
  		   		 context.fillStyle="#000000";
  		   		 context.strokeStyle="#ffffff";
  		   		 for(var i=0;i<this.nodes.length;i++){
                      context.fillRect(this.nodes[i].x,this.nodes[i].y,this.nodeSize,this.nodeSize);  		   		 	
  	                   context.strokeRect(this.nodes[i].x,this.nodes[i].y,this.nodeSize,this.nodeSize);	   		 	
  		   		 	}
  		   		},
  		   	drawStones:function(context){
  		   		 var self=this;
  		   		 context.fillStyle="#000000";
  		   		 context.strokeStyle="#ffffff";
  		   		 for(var i=0;i<this.stonesnum;i++){
                      context.fillRect(this.stones[i].x,this.stones[i].y,this.nodeSize,this.nodeSize);  		   		 	
  	                   context.strokeRect(this.stones[i].x,this.stones[i].y,this.nodeSize,this.nodeSize);	   		 	
  		   		 	}
  		   		},
  		   	eatFood:function(){
  		   		  var self=this;
  		   		  self.nodes.unshift(self.farm.food);
  		   		  self.point++;
  		   		  self.farm.food=self.farm.newFood(self);
  		   		  self.refreshSpeed();
  		   		},
  		   	start:function(){
  		   		  var self=this;
  		   		  self.init();
  		   		  if(!self.perform)
  		   		     self.perform=setInterval(self.go,self.speed,this);
  		   		},
  		   	continueRun:function(){
  		   		 var self=this;
  		   		  if(!self.perform)
  		   		     self.perform=setInterval(self.go,self.speed,this); 		   		 
  		   		},
  		   	stop:function(){
  		   		var self=this;
  		   		  if(!!self.perform)
  		   		     clearInterval(self.perform);
  		   		  self.perform=null;
  		   		  self.farm.clear();  		   		  
  		   		},
  		   	pause:function(){
  		   		var self=this;
  		   		  if(!!self.perform)
  		   		     clearInterval(self.perform);
  		   		  self.perform=null;                		   		
  		   		},
  		   	go:function(param){
                  var self=param;
                    switch(self.direction){  
                        case -1:    //上  
                            if(self.nodes[0].equals(self.farm.food)) {//吃到食物，少走一步  
                                self.farm.food.y -= self.nodeSize  
                                self.eatFood();  
                                self.farm.repaint(self);  
                                return;  
                            }  
                            var varluable = self.nodes[0].y - self.nodeSize;  
                            if(varluable < 0)  
                                varluable = self.farm.farmElem.height - self.nodeSize  
                            self.nodes.unshift(new SnakebodyNode(self.nodes[0].x, varluable, self.nodeSize, self.nodeSize));  
                            self.nodes.pop();  
                            break;  
                        case 1:     //下  
                            if(self.nodes[0].equals(self.farm.food)) {//吃到食物，少走一步  
                                self.farm.food.y += self.nodeSize  
                                self.eatFood();  
                                self.farm.repaint(self);  
                                return;  
                            }  
                            var varluable = self.nodes[0].y + self.nodeSize;  
                            if(varluable > self.farm.farmElem.height - self.nodeSize)  
                                varluable = 0;  
                            self.nodes.unshift(new SnakebodyNode(self.nodes[0].x, varluable, self.nodeSize, self.nodeSize));  
                            self.nodes.pop();  
                            break;  
                        case -10:   //左  
                            if(self.nodes[0].equals(self.farm.food)) {//吃到食物，少走一步  
                                self.farm.food.x -= self.nodeSize  
                                self.eatFood();  
                                self.farm.repaint(self);  
                                return;  
                            }  
                            var varluable = self.nodes[0].x - self.nodeSize;  
                            if(varluable < 0)  
                                varluable = self.farm.farmElem.width - self.nodeSize;  
                            self.nodes.unshift(new SnakebodyNode(varluable, self.nodes[0].y, self.nodeSize, self.nodeSize));  
                            self.nodes.pop();  
                            break;  
                        case 10:    //右  
                            if(self.nodes[0].equals(self.farm.food)) {//吃到食物，少走一步  
                                self.farm.food.x += self.nodeSize  
                                self.eatFood();  
                                self.farm.repaint(self);  
                                return;  
                            }  
                            var varluable = self.nodes[0].x + self.nodeSize;  
                            if(varluable > self.farm.farmElem.width - self.nodeSize)  
                                varluable = 0;  
                            self.nodes.unshift(new SnakebodyNode(varluable, self.nodes[0].y, self.nodeSize, self.nodeSize));  
                            self.nodes.pop();  
                            break;  
                    }
                    self.farm.repaint(self);  
                    for(var i = 1; i < self.nodes.length; i ++) {  
                        if(self.nodes[0].equals(self.nodes[i])) {//吃到身体，死亡  
                            self.die();  
                            break;  
                        }  
                    } 
                    for(var i = 1; i < self.stonesnum; i ++) {  
                        if(self.nodes[0].equals(self.stones[i])) {//吃到墙砖，死亡  
                            self.die();  
                            break;  
                        }  
                    } 		   		
  		   		},
  		   		refreshSpeed:function(){
  		   		    var self=this;
  		   		    this.speed=Math.round(this.speedParam/this.nodes.length);
  		   		    self.stop();
  		   		    self.continueRun();	
  		   		},
  		   		die:function(){
  		   		    var self=this;
  		   		    var context=this.farm.context;
  		   		    self.pause();
  		   		    self.farm.clear();
  		   		    $(".gameScore").text(this.point);
  		   		    $("#gameComplete").css("display","block"); 
  		   		}
  		};
  		var Farm=function(farmId){
  			this.farmElem=document.getElementById(farmId);
  			this.context=this.farmElem.getContext("2d");
  			this.food=null;
  			this.init();
  		};
  		Farm.prototype={
  			init:function(){
  				var self=this;
  				var farm=this.farmElem;
  				var context=this.context;
  				var w=farm.width;
  				var h=farm.height;
  				context.fillStyle="#FFFFFF";
  				context.strokeStyle="#000000";
  				context.fillRect(0,0,w,h);
  				context.strokeRect(0,0,w,h);
  				
  			},
  			clear:function(){
             var self = this, farm = this.farmElem, context = this.context;  
             var w = farm.width,h = farm.height;  
             context.fillStyle = "#FFFFFF";  
             context.strokeStyle = "#000000";  
             context.fillRect(0, 0, w, h);  
             context.strokeRect(0, 0, w, h)  			
  			},
         repaint: function(snake) {  //重绘农场  
              var self = this;  
               self.clear();  
               self.drowFood(snake);  
               snake.drawStones(snake.farm.context);
               snake.drawNodes(snake.farm.context);  
         }, 
         newStones:function(snake){
         	var x,y;
         	  var flag1=true;
         	  m:
         	  while(flag1){
         		  x=Math.round(Math.random()*(this.farmElem.width-10)/10)*10;
         		  y=Math.round(Math.random()*(this.farmElem.height-10)/10)*10; 
         		  for(var i=0;i<snake.nodes.length;i++){
         			  if(snake.nodes[i].x===x&& snake.nodes[i].y===y){
         				  break m;
         			  }
         		  }
         		  flag1=false;        		
         	  }
         	  return new SnakebodyNode(x,y,snake.nodeSize,snake.nodeSize);
         },
         newFood:function(snake){
         	var x,y;
         	var flag=true;
         	k:
         	while(flag){
         		x=Math.round(Math.random()*(this.farmElem.width-10)/10)*10;
         		y=Math.round(Math.random()*(this.farmElem.height-10)/10)*10; 
         		for(var i=0;i<snake.nodes.length;i++){
         			if(snake.nodes[i].x===x&& snake.nodes[i].y===y){
         				break k;
         			}
         		}
         		for(var i=0;i<snake.stonesnum;i++){
         			if(snake.stones[i].x===x&& snake.stones[i].y===y){
         				break k;
         			}
         		}
         		flag=false;        		
         	}
         	return new SnakebodyNode(x,y,snake.nodeSize,snake.nodeSize);
         },	 
         drowFood:function(){
         	this.context.fillStyle="#FEF045";
         	this.context.strokeStyle="ffffff";
         	this.context.fillRect(this.food.x,this.food.y,this.food.w,this.food.h);
         	this.context.strokeRect(this.food.x,this.food.y,this.food.w,this.food.h);         	
         }
  		}
            var Game = function(){          
                this.snake = new Snake(200, 200, 200, 5,new Farm("canvas"));  
            };  
            Game.prototype = {  
                start: function(){  
                    this.snake.start();  
                },  
                stop: function() {  
                    this.snake.stop();  
                },  
                pause: function() {  
                    this.snake.pause();  
                },  
                continueRun: function() {  
                    this.snake.continueRun();  
                }  
            }  
            
  var game=new Game();    
  $("#gamePlay").click(function(){
     $("#gameIntro").css("display","none"); 
     game.start(); 
   });
  $("#gameReset").click(function(){
     $("#gameComplete").css("display","none"); 
     game=new Game();
     game.start();   	  
  	});
});