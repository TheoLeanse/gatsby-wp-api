import React from 'react'

const Page = ({ data }) => (
	<p dangerouslySetInnerHTML={{ __html: data.wordpressPage.content }} />
)

export default Page

export const pageQuery = graphql`
	query currentPageQuery($id: String!) {
		wordpressPage(id: { eq: $id }) {
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
