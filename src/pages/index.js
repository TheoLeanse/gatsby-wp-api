import React from 'react'
import Link from 'gatsby-link'

const IndexPage = ({ data }) => (
	<div>
		<ul>
			{data.allWordpressPage.edges.map(edge => (
				<li>
					<Link to={`/${edge.node.slug}`}>{edge.node.title}</Link>
				</li>
			))}
		</ul>
		<ul>
			{data.allWordpressPost.edges.map(edge => (
				<li>
					<Link to={`/posts/${edge.node.slug}`}>
						{edge.node.title}
					</Link>
				</li>
			))}
		</ul>
	</div>
)

export default IndexPage

export const pageQuery = graphql`
	query Index {
		allWordpressPost {
			edges {
				node {
					id
					slug
					title
				}
			}
		}
		allWordpressPage {
			edges {
				node {
					id
					slug
					title
				}
			}
		}
	}
`
