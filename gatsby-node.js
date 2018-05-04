const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const slash = require(`slash`)

// ==== PAGES (WORDPRESS NATIVE) ====
const createPagePages = async ({ graphql, createPage }) => {
	const result = await graphql(
		`
			{
				allWordpressPage {
					edges {
						node {
							id
							slug
						}
					}
				}
			}
		`
	)

	if (result.errors) {
		console.log('PAGES errors', result.errors)
		throw Error(result.errors)
	}

	result.data.allWordpressPage.edges.forEach(edge => {
		createPage({
			path: `/${edge.node.slug}`,
			component: slash(path.resolve(`./src/templates/page.js`)),
			context: {
				id: edge.node.id,
			},
		})
	})
}

const createPostPages = async ({ graphql, createPage }) => {
	const result = await graphql(
		`
			{
				allWordpressPost {
					edges {
						node {
							id
							slug
							status
							template
							format
						}
					}
				}
			}
		`
	)

	if (result.errors) {
		console.log('POSTS errors', result.errors)
		throw Error(result.errors)
	}

	result.data.allWordpressPost.edges.forEach(edge => {
		createPage({
			path: `/posts/${edge.node.slug}`,
			component: slash(path.resolve(`./src/templates/post.js`)),
			context: {
				id: edge.node.id,
			},
		})
	})
}

const createCollectionPages = async ({ graphql, createPage }) => {
	const result = await graphql(
		`
			{
				allMarkdownRemark {
					edges {
						node {
							frontmatter {
								collection
							}
						}
					}
				}
			}
		`
	)
	if (result.errors) {
		console.log('COLLECTIONS errors', result.errors)
		throw Error(result.errors)
	}

	result.data.allMarkdownRemark.edges.forEach(edge => {
		createPage({
			path: `/collections/${edge.node.frontmatter.collection}`,
			component: slash(path.resolve(`./src/templates/collection.js`)),
			context: {
				id: edge.node.frontmatter.collection,
			},
		})
	})
}

const createPoemPages = async ({ graphql, createPage }) => {
	const result = await graphql(
		`
			{
				allMarkdownRemark {
					edges {
						node {
							id
							frontmatter {
								title
								collection
							}
						}
					}
				}
			}
		`
	)
	if (result.errors) {
		console.log('POEMS errors', result.errors)
		throw Error(result.errors)
	}

	result.data.allMarkdownRemark.edges.forEach(edge => {
		createPage({
			path: `/collections/${edge.node.frontmatter.collection}/poems/${
				edge.node.frontmatter.title
			}`,
			component: slash(path.resolve(`./src/templates/poem.js`)),
			context: {
				id: edge.node.id,
			},
		})
	})
}

exports.createPages = async ({ graphql, boundActionCreators }) => {
	const { createPage } = boundActionCreators
	try {
		await Promise.all([
			createPagePages({ graphql, createPage }),
			createPostPages({ graphql, createPage }),
			createCollectionPages({ graphql, createPage }),
			createPoemPages({ graphql, createPage }),
		])
	} catch (e) {
		Promise.reject(e)
	}
}
