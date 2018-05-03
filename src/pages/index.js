import React from 'react'
import Link from 'gatsby-link'

const IndexPage = props => (
  <ul>
    {props.data.allWordpressPost.edges.map(edge => <li>{edge.node.title}</li>)}
  </ul>
)

export default IndexPage

export const pageQuery = graphql`
  query Posts {
    allWordpressPost {
      edges {
        node {
          id
          content
          title
        }
      }
    }
  }
`
