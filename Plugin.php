<?php 

/*
 * Plugin Name: Cohesion SVG
 * Description: Provides an SVG block and activates SVG file uploads to media.
 * Plugin URI: https://cohesionwp.com/plugins/cohesion-svg
 * Author: Qualux
 * Author URI: https://qualux.io
 * Version: 0.0.1
 */

namespace Cohesion_SVG;

define( 'COHESION_SVG_URL', plugin_dir_url( __FILE__ ) . '/' ); 
define( 'COHESION_SVG_PATH', plugin_dir_path( __FILE__ ) );
define( 'COHESION_SVG_VERSION', '0.0.1' );

class Plugin {

    public function __construct() {

        
        add_action( 'init', [ $this, 'register_block' ] );

        add_action('admin_enqueue_scripts', function() {
            wp_localize_script(
                'wp-editor',
                'cohesionSVG_Settings',
                array(
                    'pluginUrl' => COHESION_SVG_URL
                )
            );
        });        

    }

    function register_block() {

        $result = register_block_type(
            COHESION_SVG_PATH . 'build/blocks/svg'
        );

    }

}

new Plugin();