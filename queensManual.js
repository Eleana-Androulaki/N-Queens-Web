var foundSolution = false;
var queensComb=[];
var queensCombObj={};
var queensCheck = true;
var queensSol = [];
var counter = 0;
var noThreatens = [];
var chessboard = [];


document.getElementById("boardSize").value=4;

var size = document.getElementById("boardSize").value;
var items = [];
for(var i =0; i<size; i ++)
{
	items.push([]);
	for ( var j =0; j<size; j++)
	{
		items[i].push({hasQueen : false});
	}
}
var initrow = [];
var counter = 0;
var initchessboard = [];
var solutions  = [];

var field = new Vue({
	el: '#chessboardDiv',
	data: {
		board : items,
		message: "",
		size : "4x4",
		sizeValue:4,
		queensNo : "3",
		solutionsUl : [],
		rightPlace : true,
		message : "",
	},
	methods: {
		updateSize: function(event){
			for(var i =0; i<this.sizeValue; i ++)
			{
				for ( var j =0; j<this.sizeValue; j++)
				{
					document.getElementById(i.toString()+j.toString()).classList.remove("queen");
				}
			}
			this.sizeValue = document.getElementById("boardSize").value;

			this.board = [];
			for(var i =0; i<this.sizeValue; i ++)
			{
				this.board.push([]);
				for ( var j =0; j<this.sizeValue; j++)
				{
					this.board[i].push({hasQueen : false});
				}
			}

			if(document.getElementById("Queens").value<(Math.floor(document.getElementById("boardSize").value/2)+1))
			{
				this.message="This combination has no solutions.";
				queensCheck = false;
			}
			else if(document.getElementById("Queens").value>document.getElementById("boardSize").value)
			{
				this.message="Number of queens must be less than or equal to the chessboard size.";
				queensCheck = false;
			}
			else
			{
				this.message="";
				queensCheck = true;
			}
			// this.board = items;
			foundSolution = false;
			queensComb=[];
			queensCombObj={};
			queensSol = [];
			counter = 0;
			noThreatens = [];
			chessboard = [];
			this.$forceUpdate();
		},
		checkValidity: function(event){
			if(document.getElementById("Queens").value<(Math.floor(document.getElementById("boardSize").value/2)+1))
			{
				this.message="This combination has no solutions.";
				queensCheck = false;
			}
			else if(document.getElementById("Queens").value>document.getElementById("boardSize").value)
			{
				this.message="Number of queens must be less than or equal to the chessboard size.";
				queensCheck = false;
			}
			else
			{
				this.message="";
				queensCheck = true;
			}
		},
		clickOpt: function(event){
			for(var f=4;f<9;f++)
			{
				document.getElementById("bs"+f).removeAttribute('selected');
			}

			document.getElementById(event.currentTarget.getAttribute("NAME")).setAttribute('selected', true);
			field.updateSize();
			field.checkValidity();
			this.size = document.getElementById(event.currentTarget.getAttribute("NAME")).text;
			document.getElementById("boardSizeBtn").click();

		},
		clickOptQueens: function(event){
			for(var f=3;f<9;f++)
			{
				document.getElementById("qs"+f).removeAttribute('selected');
			}

			document.getElementById(event.currentTarget.getAttribute("NAME")).setAttribute('selected', true);
			field.updateSize();
			field.checkValidity();
			this.queensNo = document.getElementById(event.currentTarget.getAttribute("NAME")).text;
			document.getElementById("QueensBtn").click();

		},
		placeQueen: function(r,c){

	    if(queensCheck){

	      let box = document.getElementById(r.toString()+c.toString());
	      let columnToPut = parseInt(c);
	      let rowToPut = parseInt(r);
	      let gab = -parseInt(this.queensNo);
	      this.rightPlace=true;

	      if(queensSol.length==0)
	      {
	        for(var i=0;i<this.sizeValue;i++)
	        {
	          queensSol.push(gab);
	        }
	      }
	      for(var t=0;t<this.sizeValue;t++)
	      {
	        for(var f=0;f<this.sizeValue;f++){
	          document.getElementById(t.toString()+f.toString()).children[0].classList.remove("bullet");
	        }
	      }
	      noThreatens=[];

	      if(box.classList.contains("queen"))
	      {
	          queensSol[rowToPut]=gab;
	          box.classList.remove("queen");
	          counter--;

	      }
	      else
	      {
	          if(counter < parseInt(this.queensNo))
	          {

	            for (var i = 0 ; i <queensSol.length  ; i++)
	            {
	              if(queensSol[i]>=0)
	              {
	                if ( columnToPut == queensSol[i] ||
	                     columnToPut-rowToPut == queensSol[i]-i ||
	                     columnToPut+rowToPut == queensSol[i]+i||
	                     rowToPut == i)
	                  {
	                     this.rightPlace=false;
	                     break;
	                  }
	              }
	            }
	            if(this.rightPlace)
	            {
	              queensSol[rowToPut]=columnToPut;
	              box.classList.add("queen");
	              this.message="";

	              counter++;
	            }
	            // else
	            // {
	            //   this.message="Invalid queen position.";
							//
	            // }

	          }

	      }
	    }
	  },
		checkAnswer: function(){

	    for(var r=0;r<parseInt(this.sizeValue);r++)
	    {
	      chessboard.push([]);
	      for(var co=0;co<parseInt(this.sizeValue);co++)
	      {
	           chessboard[r][co]=0;
	      }
	    }
	    if(counter<parseInt(this.queensNo))
	    {
	      this.message="Please place all queens.";
	    }
	    else
	    {
	      for(var i=0;i<queensSol.length;i++)
	      {
	        if(queensSol[i]>=0)
	        {
	          for(var r=0;r<parseInt(this.sizeValue);r++)
	          {
	            for(var co=0;co<parseInt(this.sizeValue);co++)
	            {
	              if ( co == queensSol[i] || co-r == queensSol[i]-i || co+r == queensSol[i]+i || r == i)
	                   chessboard[r][co]=1;
	            }
	          }
	        }

	      }

	      for(var r=0;r<parseInt(this.sizeValue);r++)
	      {
	        for(var co=0;co<parseInt(this.sizeValue);co++)
	        {

	          if ( chessboard[r][co]==0)
	          {
	            noThreatens.push(r.toString()+co.toString());
	          }
	        }
	      }
	      if(noThreatens.length!=0)
	      {
	        this.message="Some tiles aren't threatened";
	        this.colorSpans();
	      }
	      else
	      {
	        for(var i=0;i<this.sizeValue;i++)
	        {
	          for(var j=0;j<this.sizeValue;j++)
	          {
	            document.getElementById(i.toString()+j.toString()).classList.remove("queen");
	            document.getElementById(i.toString()+j.toString()).children[0].classList.remove("queen");

	          }
	        }
	        queensCheck = true;
	        queensSol = [];
	        counter = 0;
	        noThreatens = [];
	        chessboard = [];
	        this.message="Correct Answer!!!";
	      }

	    }
	  },
	  colorSpans: function(){
	    var pos = 0;
	    var steps = setInterval(function(){
	      if(noThreatens.length<=pos)
	      {
	        clearInterval(steps);
	      }
	      else
	      {
	        document.getElementById(noThreatens[pos]).children[0].classList.add("bullet");
	        document.getElementById(noThreatens[pos]).children[0].style.backgroundColor="red";
	        pos++
	      }
	    },1000)
	  }

	}
})
