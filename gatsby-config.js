require('dotenv').config()

module.exports = {
	siteMetadata: {
		title: process.env.SITE_TITLE,
	},
	plugins: [
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-netlify-cms',
		{
			resolve: `gatsby-source-wordpress`,
			options: {
				baseUrl: process.env.WPCOM_BASEURL,
				protocol: 'https',
				hostingWPCOM: true,
				useACF: false,
				auth: {
					// If hostingWPCOM is true then you will need to communicate with wordpress.com API
					// in order to do that you need to create an app (of type Web) at https://developer.wordpress.com/apps/
					// then add your clientId, clientSecret, username, and password here
					wpcom_app_clientSecret: process.env.WPCOM_CLIENT_SECRET,
					wpcom_app_clientId: process.env.WPCOM_CLIENTID,
					wpcom_user: process.env.WPCOM_USER,
					wpcom_pass: process.env.WPCOM_PW,
				},
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/poem`,
				name: 'poem',
			},
		},
		`gatsby-transformer-remark`,
	],
}
