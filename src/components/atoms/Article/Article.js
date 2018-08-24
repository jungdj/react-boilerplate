import styled from "styled-components"

const Article = styled.article`
	display: flex;
	flex-direction: column;
	${props =>
		props.center &&
		`
		align-items: center;
		text-align: center;
	`};

	h2 {
		margin: 1.5em 0;
	}
`

Article.propTypes = {}

Article.defaultProps = {}

export default Article
