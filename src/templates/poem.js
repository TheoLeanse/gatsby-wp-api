import React from 'react'
import Link from 'gatsby-link'

export default function Template({
	data, // this prop will be injected by the GraphQL query below.
}) {
	const { markdownRemark } = data // data.markdownRemark holds our post data
	const { frontmatter, html } = markdownRemark
	return (
		<div className="blog-post-container">
			<div className="blog-post">
				<h1>{frontmatter.title}</h1>
				<div
					className="blog-post-content"
					style={{ whiteSpace: 'pre' }}
					dangerouslySetInnerHTML={{ __html: html }}
				/>
			</div>
			<h2>
				Taken from{' '}
				<Link to={`/collections/${frontmatter.collection}`}>
					{frontmatter.collection}
				</Link>
			</h2>
		</div>
	)
}

export const pageQuery = graphql`
	query PoemById($id: String!) {
		markdownRemark(id: { eq: $id }) {
			html
			id
			frontmatter {
				title
				collection
			}
		}
	}
`
