<?php
/** 广告加载管理类
*   Date:   2013-08-04
*   Author: fdipzone
*   Ver:    1.0
*
*   Func:
*   public  load         加载广告集合
*   public  setConfig    广告配置
*   private getAds       根据channel创建广告集合
*   private genZoneId    zoneid base64_encode 处理
*   private genHtml      生成广告html
*   private checkBrowser 检查是否需要同步加载的浏览器
*/

class ADLoader{ // class start

    private static $_ads = array();     // 广告集合
    private static $_step = 300;        // 广告加载间隔
    private static $_async = true;      // 是否异步加载
    private static $_config = array();  // 广告设置文件
    private static $_jsclass = null;    // 广告JS class


    /** 加载广告集合
    * @param String  $channel 栏目,对应config文件
    * @param int     $step    广告加载间隔
    * @param boolean $async   是否异步加载
    */
    public static function load($channel='', $step='', $async=''){
        if(isset($step) && is_numeric($step) && $step>0){
            self::$_step = $step;
        }

        if(isset($async) && is_bool($async)){
            self::$_async = $async;
        }

        // 判断浏览器,如IE强制使用同步加载
        if(!self::checkBrowser()){
            self::$_async = false;
        }

        self::getAds($channel);
        self::genZoneId();

        return self::genHtml();
    }


    /** 设置config
    * @param String $config  广告配置
    * @param String $jsclass js class文件路径
    */
    public static function setConfig($config=array(), $jsclass=''){
        self::$_config = $config;
        self::$_jsclass = $jsclass;
    }


    /** 根据channel创建广告集合
    * @param String $channel 栏目
    */
    private static function getAds($channel=''){
        $AD_Config = self::$_config;
        if($AD_Config!=null){
            self::$_ads = isset($AD_Config[$channel])? $AD_Config[$channel] : $AD_Config['default'];
        }
    }


    /** zoneid base64_encode 处理 */
    private static function genZoneId(){

        // 同步加载广告不需要处理zoneid
        if(!self::$_async){
            return ;
        }

        $ads = self::$_ads;
        for($i=0,$len=count($ads); $i<$len; $i++){
            if(isset($ads[$i]['zoneId'])){
                $ads[$i]['zoneId'] = base64_encode('var zoneid='.$ads[$i]['zoneId'].';');
            }
        }
        self::$_ads = $ads;
    }


    /** 生成广告html */
    private static function genHtml(){
        $ads = self::$_ads;
        $html = array();
        if(self::$_jsclass!=null && $ads){
            array_push($html, '<script type="text/javascript" src="'.self::$_jsclass.'"></script>');

            // 同步需要预先加载
            if(!self::$_async){
                foreach($ads as $ad){
                    array_push($html, '<div id="'.$ad['domId'].'_container" style="display:none">');
                    array_push($html, '<script type="text/javascript">');
                    array_push($html, 'ADLoader.preload('.json_encode($ad).');');
                    array_push($html, '</script>');
                    array_push($html, '</div>');
                }
            }

            array_push($html, '<script type="text/javascript">');
            array_push($html, 'var ads='.json_encode($ads).';');
            array_push($html, '$(document).ready(function(){ ADLoader.load(ads, '.self::$_step.', '.intval(self::$_async).'); });');
            array_push($html, '</script>');
        }
        return implode("\r\n", $html);
    }


    /** 判断是否需要强制同步加载的浏览器 */
    private static function checkBrowser(){
        $user_agent = $_SERVER['HTTP_USER_AGENT'];
        if(strstr($user_agent,'MSIE')!=''){
            return false;
        }
        return true;
    }

} // class end

?>