<?php
/**
 * Enqueue scripts and styles.
 */
function cmc_react_scripts() {

	wp_enqueue_script( 'cmc-scripts', get_template_directory_uri() . '/public/js/app.js', array(), '1.0.3', true );

	// Enqueue styles.
	wp_enqueue_style( 'cmc-style', get_stylesheet_directory_uri() . '/style.min.css', array(), null );
}
add_action( 'wp_enqueue_scripts', 'cmc_react_scripts' );

/**
 * Removes the WP Emoji styles and scripts.
 *
 * @author Corey Collins
 *
 * @since NEXT
 */
function cmc_react_remove_wp_emoji() {

	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );

	remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
	remove_action( 'admin_print_styles', 'print_emoji_styles' );
}
add_action( 'init', 'cmc_react_remove_wp_emoji' );
