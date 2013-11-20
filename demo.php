<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
 <head>
  <meta http-equiv="content-type" content="text/html; charset=utf-8">
  <title> AD Loader </title>
  <style type="text/css">
  .banner1{margin:10px; border:1px solid #CCCCCC; width:728px; height:90px;}
  .banner2{margin:10px; border:1px solid #CCCCCC; width:300px; height:250px;}
  </style>
  <script type="text/javascript" src="jquery-1.6.2.min.js"></script>
 </head>

 <body>
  <div class="banner1" id="ad_728x90"></div>
  <div class="banner2" id="ad_300x250"></div>
  <div class="banner2" id="ad_l2_300x250"></div>
   
  <?php
    function showAD($channel='', $step='', $async=''){
      include('ADLoader.class.php');
      $ad_config = include('ADConfig.php');
      ADLoader::setConfig($ad_config, 'ADLoader.js');
      return ADLoader::load($channel, $step, $async);
    }

    echo showAD('case_openx'); // 异步加载
    //echo showAD('case_url');   // url方式异步加载
    //echo showAD('case_sync_openx', 300, false); // 同步加载
  ?>

 </body>
</html>