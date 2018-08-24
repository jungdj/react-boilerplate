import styled from "styled-components"
import { media } from "lib/utils"

const FooterWrapper = styled.footer`
	background-color: #f7f8f9;
	padding: 24px 12px;
	color: #aaaaaa;
	${media.tablet`padding: 48px 36px;`};
	p {
		font-size: 12px;
		line-height: 1.6;
		color: #999999;
		@media (min-width: 768px) {
			font-size: 14px;
		}
	}

	.container {
		height: 100%;
		display: flex;
		align-items: center;
		${media.tablet`padding: 0 1em`};
	}

	.footer-grid {
		width: 100%;
		display: flex;
		flex-flow: row wrap;
	}

	section {
		width: 100%;
		${media.tablet`flex: 1`};
	}
`

export default FooterWrapper
