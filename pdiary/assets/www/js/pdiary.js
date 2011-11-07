(function(){

  // Diary
  window.Diary = Backbone.Model.extend({
//	 initialize: function() {
//	   this.set({date: new Date()});
//	 },
//    comment:"test comment dayo."
  });

  // Diary List
  window.DiaryList = Backbone.Collection.extend({
  
    model: Diary,
    localStorage: new Store("diaries-new")
   
  });

  window.Diaries = new DiaryList();
  
  window.DiarylistPage = Backbone.View.extend({
  
    el: "#plist",
    events: {
        "click #new-picture" : "takePicture",
        "click li" : "showDetailpage"
      },
      template: function(diary) {
          return "<li>"+diary.get("comment")+"</li>";
      },
    initialize: function() {
        _.bindAll(this, 'render','addOne');

        Diaries.bind('all',this.render);
        Diaries.fetch();
    //    this.collection = Diaries;
        //this.render();
    //    this.collection.bind("add", this.render, this); // collectionにaddされたらrenderを実行
    },
    addOne: function(diary) {
    	//$("#plistview").append(this.template(diary));
    	diary.fetch();
    	$("#plistview").append('<li id="' + diary.get("id") + '"><a>' + diary.get("comment") + "</a></li>");
    	//$("#plistview").append("<li>test</li>");
    },
    render: function() {    	 
        //alert("get 9.");
        Diaries.each(this.addOne);
        //$("#plistview").listview("refresh");
    },
    takePicture: function() {
       //alert("get 9.")
    	//var diaryCommentpage = new DiarycommentPage();
    	//$.mobile.changePage("#set-comment");
    	capturePhoto();
    },
    showDetailpage: function(event) {
    	var id = event.currentTarget.id;
    	var Detailpage = new DiarydetailPage();
    	Detailpage.render(Diaries.get(id));
    	$.mobile.changePage("#show-detail");
    }
      
  });

  window.DiarycommentPage = Backbone.View.extend({
	  
	    el: "#set-comment",	  	  
	    events: {
	      "click button" : "savePicture"
	    },
	    
	    initialize: function() {
	    	this.input = this.$("#diary-comment"); 
	    },
	    render: function(imageURI) {
	    	alert(imageURI);
	    	$("#token-picture").append("<img src='" + imageURI + "'>");
	    },
	    savePicture: function() {
		       var diary = new Diary({comment: this.input.val()});
		       Diaries.create(diary);
	    }  

  });

  window.DiarydetailPage = Backbone.View.extend({
	   el: "#show-detail",
      render: function(post) {
          this.model = post;
          $("#detail-data").text(this.model.get("comment"));
          return this;
      }
  });  
  
  window.App = new DiarylistPage;
  
}());
