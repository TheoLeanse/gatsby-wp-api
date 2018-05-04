import React from 'react'
import Link from 'gatsby-link'

const IndexPage = ({ data }) => (
	<div>
		<ul>
			{data.allMarkdownRemark.edges
				.map(
					({
						node: {
							frontmatter: { collection },
						},
					}) => collection
				)
				.filter((el, i, a) => el !== a[i - 1])
				.map(collection => (
					<li>
						<Link to={`/collections/${collection}`}>
							{collection}
						</Link>
					</li>
				))}
		</ul>
	</div>
)

export default IndexPage

export const pageQuery = graphql`
	query Index {
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
