import React from 'react'
import Link from 'gatsby-link'

export default function Template({
	data, // this prop will be injected by the GraphQL query below.
}) {
	const { allMarkdownRemark } = data // data.markdownRemark holds our post data
	const { edges } = allMarkdownRemark
	return (
		<div>
			<h1>{edges[0].node.frontmatter.collection}</h1>
			<ul>
				{edges.map(({ node }) => (
					<li>
						<Link
							to={`/collections/${
								node.frontmatter.collection
							}/poems/${node.frontmatter.title}`}
						>
							{node.frontmatter.title}
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}

export const pageQuery = graphql`
	query PoemsByCollection($id: String!) {
		allMarkdownRemark(
			filter: { frontmatter: { collection: { eq: $id } } }
		) {
			edges {
				node {
					id
					html
					frontmatter {
						title
						collection
					}
				}
			}
		}
	}
`
