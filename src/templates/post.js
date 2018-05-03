import React from 'react'

const Post = ({ data }) => (
	<p dangerouslySetInnerHTML={{ __html: data.wordpressPost.content }} />
)

export default Post

export const pageQuery = graphql`
	query currentPostQuery($id: String!) {
		wordpressPost(id: { eq: $id }) {
			title
			content
		}
		site {
			siteMetadata {
				title
			}
		}
	}
`
