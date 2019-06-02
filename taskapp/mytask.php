<?php


  include("../connection/connect.php");
if (!$conn) {
  echo("Connection failed ");
}

 
else
{
    
    $taskid=$_POST["taskid"];
      $empid=$_POST["empid"];
      
       
?>
<html lang="en">
<head>
  <title>Sri Venkatachalapathy & Co.</title>
  
    <link rel="icon" href="./assets/images/logo.png" type="image/gif" sizes="16x16">
    <script src="./assets/js/index.js"></script>
     <link rel="stylesheet" href="./assets/css/style.css">
     
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
  
    
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
   <link href="https://fonts.googleapis.com/css?family=Muli|Roboto+Condensed:400,700" rel="stylesheet">
   
    
</head>
<!--<body class="hidden-lg">-->
<body>
<nav class="navbar navbar-default navbar-fixed-top" style="background-color:#1717FF;">
      <div class="container1">
    <div class="navbar-header">
      
      <a class="navbar-brand" id="logo" href="#"><span><img class="logi" src="./assets/images/logo.png"> Sri Venkatachalapathy & Co</span></a>
          <span style="float:right;margin-top:5px;padding:5px;font-size:22px;color:orange;"><i class="fa fa-power-off"></i></span>
    </div>
       
    </div>
</nav>
    <section class="bodyer topper">
        <div class="container1">
            
                        <?php
            
            $query="SELECT * from taskdata WHERE taskid='$taskid'";            
                     
    $result_card= mysqli_query($conn,$query);
      while ($row_card= mysqli_fetch_array($result_card,MYSQLI_ASSOC))
     {
        
    ?>
                    
    <div class="desc">
        <h3>Task #<?php echo($row_card["taskid"]); ?></h3>
        <p><?php echo($row_card["tdescription"]); ?></p>
        <form method="post" action="upload.php" enctype="multipart/form-data">
            <select class="selectit controls"  name="status">
                                                <option value="completed">Completed</option>
                                                <option value="issue">Issue</option>
                                                <option value="cancelled">Cancelled</option>

                                            </select>
            <input type="hidden" value="Completed">
              <input type="hidden" name="taskid" value="<?php echo($taskid); ?>">
               <input type="hidden" name="empid" value="<?php echo($empid); ?>">
               <textarea class="controls textarea" type="text" placeholder="Enter short Description.." name="drop" required></textarea>
             
                    <input type="file" name="file" class="controls file" capture="camera">  
                    
        <button class="buttonthree">Submit Task</button>
        
        </form>
        
        </div>
  <?php
  
     }
  
  ?>
            <br><br><br>
    </div>
    </section>
  
 <div class="footy">
     <ul>
     <li class="active"><i class="fa fa-envelope-o"></i> <br>Task</li>
         <li><i class="fa fa-camera-retro"></i> <br>Camera</li>
         <li><i class="fa fa-commenting-o"></i><br>Chat</li>
     <li><i class="fa fa-gear"></i> <br>Settings</li>
     </ul>
     
</div> 
<style>
     .topper
{
    margin-top:80px;
}
.topper h3
{
    font-size:18px;
    font-weight:600;
    font-family: 'Muli', sans-serif; 
     letter-spacing: 0.5px;
}
.topper p
{
     font-size:14px;
     font-family: 'Muli', sans-serif; 
     letter-spacing: 0.5px; 
}
input[type="file"] {
    width: 100%;
    padding: 12px 20px;
    padding-left: 20px;
    min-height: 45px;
    margin: 8px 0;
    color: #000000;
    box-sizing: border-box;
    background-color: #E2E2E2;
    font-family: 'Poppins', sans-serif;
}
    .buttonthree {
  background-color: #444141; 
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size:15px;
    font-family: 'Muli', sans-serif; 
    padding: 4px 20px;
  cursor: pointer;
}
.selectit {
    width: 100%;
    min-height: 45px;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
    background-color: #E2E2E2;
}
.textarea {
    width: 100%;
    padding: 12px 20px;
    min-height: 45px;
    margin: 8px 0;
    min-height: 100px;
    color: #000000;
    box-sizing: border-box;
    background-color: #E2E2E2;
    font-family: 'Open Sans', sans-serif;
}
    @media screen and (max-width: 458px){
    .navbar-brand {
    font-size: 18px;
    position: absolute;
    left:0%; 
        }
        .topper
{
    margin-top:80px;
}
.topper h3
{
    font-size:18px;
    font-weight:600;
    font-family: 'Muli', sans-serif; 
     letter-spacing: 0.5px;
}
        .card
        {
            padding:10px;
        }
.topper p
{
     font-size:14px;
     font-family: 'Muli', sans-serif; 
     letter-spacing: 0.5px; 
}
    .buttonthree {
  background-color: #444141; 
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size:15px;
    font-family: 'Muli', sans-serif; 
    padding: 4px 20px;
  cursor: pointer;
}

    
    }</style>
</body>
</html>
<?php
}
?>
