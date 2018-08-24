import styled from "styled-components"

import { get, media } from "lib/utils"

const PageTemplateWrapper = styled.div``

export const Main = styled.main`
	background: white;
	margin: 60px auto 0 auto;
	max-width: ${get("maxWidth")};
	${media.mobile`
		min-height: calc(100vh - 240px);
	`};
`

export default PageTemplateWrapper
