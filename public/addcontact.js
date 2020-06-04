
  $(document).ready(function(){

    $("#addContact").click(function(){
      var name= document.getElementById("name").value;
      var date=document.getElementById("date").value;
      var numbers=document.getElementsByName("numberBox");
      var emails=document.getElementsByName("emailBox");
    var email=emails[0].value;
    var number=numbers[0].value;
      for(var i=1;i<emails.length;i++)
        email=email+":"+emails[i].value;
      
      for(var i=1;i<numbers.length;i++)
        number=number+":"+numbers[i].value;
      
        
      
      
      console.log(email+number);
      
      $.post("http://localhost/",
      {
        name: name,
        dob: date,
        email : email,
        number : number
      },
      function(data, status){
        alert("Data Added Successfully");
      });
    });
    
    });
    function addEmailField(){
      console.log('email add');
      $('#emailDiv').append(`<input type="email" name="emailBox"  style="width: 400px; height: 30px; font-size: 20px; margin: 5px;" id="email" required>`);
    }
    
    function addNumberField(){
      console.log('number add');
      $('#numbersDiv').append(`<input type="number" name="numberBox"  style="width: 400px; height: 30px; font-size: 20px; margin: 5px;" id="email" required>`);
    }
  
