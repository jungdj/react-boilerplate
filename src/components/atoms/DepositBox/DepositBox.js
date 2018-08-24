import styled from "styled-components"

import Image from "atoms/Image"
import Line from "atoms/Line"

import { colors } from "lib/theme"
import { media } from "lib/utils"

const DepositBox = styled.div`
	text-align: center;
	font-size: 32px;
	border-radius: 3px;
	border: solid 1px ${colors.border};
	padding: 16px 12px;
	${media.tablet`padding: 24px`};
	${Image} {
		margin-bottom: 12px;
	}

	${Line} {
		margin: 16px 0;
		${media.tablet`margin: 24px 0`};
	}

	p {
		margin-bottom: 8px;
	}
	h3 {
		margin-bottom: 16px;
		${media.tablet`margin-bottom: 24px`};
	}
	h1 {
		color: ${colors.deepBlue};
	}
`

DepositBox.propTypes = {}

DepositBox.defaultProps = {}

export default DepositBox
