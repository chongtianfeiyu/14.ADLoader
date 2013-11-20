<?php
/** 广告配置文件 **/

return array(

    'case_openx' => array(
        array(
            'type' => 'openx',
            'domId' => 'ad_728x90',
            'zoneId' => 452
        ),
        array(
            'type' => 'openx',
            'domId' => 'ad_300x250',
            'zoneId' => 449
        ),
        array(
            'type' => 'openx',
            'domId' => 'ad_l2_300x250',
            'zoneId' => 394
        ),
    ),

    'case_url' => array(
        array(
            'type' => 'url',
            'domId' => 'ad_728x90',
            'url' => 'adurl.php?zoneid=452'
        ),
        array(
            'type' => 'url',
            'domId' => 'ad_300x250',
            'url' => 'adurl.php?zoneid=449'
        ),
        array(
            'type' => 'url',
            'domId' => 'ad_l2_300x250',
            'url' => 'adurl.php?zoneid=394'
        )
    ),

    'case_sync_openx' => array(
        array(
            'type' => 'openx',
            'domId' => 'ad_728x90',
            'zoneId' => 452
        ),
        array(
            'type' => 'openx',
            'domId' => 'ad_300x250',
            'zoneId' => 449
        ),
        array(
            'type' => 'openx',
            'domId' => 'ad_l2_300x250',
            'zoneId' => 394
        ),
    ),

    'default' => array(
        array(
            'type' => 'openx',
            'domId' => 'ad_728x90',
            'zoneId' => 452
        ),
        array(
            'type' => 'openx',
            'domId' => 'ad_300x250',
            'zoneId' => 449
        ),
        array(
            'type' => 'openx',
            'domId' => 'ad_l2_300x250',
            'zoneId' => 394
        ),
    ),

);

?>